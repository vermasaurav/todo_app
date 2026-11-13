import { Task } from "../models/Task.js";
import { getWeekRange } from "../utils/dateUtils.js";

// @desc    Create a new task
// @route   POST /api/tasks
export const createTask = async (req, res) => {
  try {
    const { title, description, date, startTime, endTime, priority, status } = req.body;

    if (!title || !date) {
      return res.status(400).json({ success: false, message: "Title and date are mandatory." });
    }

    const { weekStart, weekEnd } = getWeekRange(date);

    const task = await Task.create({
      title,
      description,
      date,
      startTime: startTime || "",
      endTime: endTime || "",
      priority: priority || "Medium",
      status: status || "In Progress",
      weekStart,
      weekEnd,
    });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get tasks with optional query (search, date, weekStart, status)
// @route   GET /api/tasks
export const getTasks = async (req, res) => {
  try {
    const { search, date, weekStart, status } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (date) {
      const targetDate = new Date(date);
      const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));
      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    if (weekStart) {
      const { weekStart: start, weekEnd: end } = getWeekRange(weekStart);
      query.date = { $gte: start, $lte: end };
    }

    if (status) {
      query.status = status;
    }

    const tasks = await Task.find(query).sort({ date: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get weekly grouped overview (Monday to Sunday)
// @route   GET /api/tasks/weekly-overview
export const getWeeklyOverview = async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ date: 1 });

    // Group tasks by weekStart timestamp
    const weeklyMap = new Map();

    tasks.forEach((task) => {
      const { weekStart, weekEnd, weekLabel } = getWeekRange(task.date);
      const key = weekStart.toISOString();

      if (!weeklyMap.has(key)) {
        weeklyMap.set(key, {
          weekStart,
          weekEnd,
          weekLabel,
          openTasks: 0,
          completedTasks: 0,
          totalTasks: 0,
          tasks: [],
        });
      }

      const weekGroup = weeklyMap.get(key);
      weekGroup.totalTasks += 1;
      if (task.status === "Completed") {
        weekGroup.completedTasks += 1;
      } else {
        weekGroup.openTasks += 1;
      }
      weekGroup.tasks.push(task);
    });

    // Ensure current week is always present even if empty
    const currentWeek = getWeekRange(new Date());
    const currentKey = currentWeek.weekStart.toISOString();
    if (!weeklyMap.has(currentKey)) {
      weeklyMap.set(currentKey, {
        weekStart: currentWeek.weekStart,
        weekEnd: currentWeek.weekEnd,
        weekLabel: currentWeek.weekLabel,
        openTasks: 0,
        completedTasks: 0,
        totalTasks: 0,
        tasks: [],
      });
    }

    const weeks = Array.from(weeklyMap.values()).sort(
      (a, b) => new Date(a.weekStart) - new Date(b.weekStart)
    );

    res.status(200).json({ success: true, data: weeks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update task details
// @route   PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  try {
    const { title, description, date, startTime, endTime, priority, status } = req.body;
    let updates = { title, description, date, startTime, endTime, priority, status };

    // Remove undefined fields
    Object.keys(updates).forEach((k) => updates[k] === undefined && delete updates[k]);

    if (date) {
      const { weekStart, weekEnd } = getWeekRange(date);
      updates.weekStart = weekStart;
      updates.weekEnd = weekEnd;
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle task status (In Progress <-> Completed)
// @route   PATCH /api/tasks/:id/toggle
export const toggleTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    task.status = task.status === "Completed" ? "In Progress" : "Completed";
    await task.save();

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

