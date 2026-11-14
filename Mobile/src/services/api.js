const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://todo-app-tsm0.onrender.com/api/tasks"
    : "http://localhost:5000/api/tasks");

// Helper to calculate Monday-Sunday week bounds
export const getWeekRange = (dateInput = new Date()) => {
  const d = new Date(dateInput);
  const day = d.getDay(); // 0: Sun, 1: Mon, ..., 6: Sat
  const diffToMonday = day === 0 ? -6 : 1 - day;
  
  const monday = new Date(d);
  monday.setDate(d.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return {
    weekStart: monday,
    weekEnd: sunday,
    weekLabel: `${monday.toLocaleString("default", { month: "short", day: "numeric" })} - ${sunday.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" })}`
  };
};

// Initial sample tasks matching the Figma design mockup
const DEFAULT_TASKS = [
  {
    _id: "demo-1",
    title: "Finishing Wireframe",
    description: "Prepare wireframes for the mobile task management screen.",
    date: new Date().toISOString(),
    startTime: "09:00 AM",
    endTime: "11:00 AM",
    priority: "High",
    status: "In Progress",
  },
  {
    _id: "demo-2",
    title: "Meeting with team",
    description: "Weekly sync meeting to discuss sprint deliverables.",
    date: new Date().toISOString(),
    startTime: "01:30 PM",
    endTime: "02:30 PM",
    priority: "Medium",
    status: "In Progress",
  },
  {
    _id: "demo-3",
    title: "Buy a cat food",
    description: "Grab premium salmon mix from the local pet shop.",
    date: new Date().toISOString(),
    startTime: "04:00 PM",
    endTime: "04:30 PM",
    priority: "Low",
    status: "Completed",
  },
  {
    _id: "demo-4",
    title: "Finishing daily commission",
    description: "Complete design commissions and export vector assets.",
    date: new Date().toISOString(),
    startTime: "05:00 PM",
    endTime: "07:00 PM",
    priority: "Medium",
    status: "Completed",
  },
];

const getLocalTasks = () => {
  try {
    const raw = localStorage.getItem("todolist_tasks");
    if (!raw) {
      localStorage.setItem("todolist_tasks", JSON.stringify(DEFAULT_TASKS));
      return DEFAULT_TASKS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_TASKS;
  }
};

const saveLocalTasks = (tasks) => {
  try {
    localStorage.setItem("todolist_tasks", JSON.stringify(tasks));
  } catch (err) {
    console.error("Local storage error:", err);
  }
};

export const api = {
  // Fetch all tasks with optional search or filters
  async getTasks(params = {}) {
    try {
      const url = new URL(API_BASE_URL);
      Object.keys(params).forEach((key) => {
        if (params[key]) url.searchParams.append(key, params[key]);
      });

      const res = await fetch(url.toString(), {
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("API request failed");
      const json = await res.json();
      if (json.success) {
        saveLocalTasks(json.data);
        return json.data;
      }
    } catch {
      let tasks = getLocalTasks();
      if (params.search) {
        const q = params.search.toLowerCase();
        tasks = tasks.filter(
          (t) => t.title.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q))
        );
      }
      return tasks;
    }
  },

  // Fetch weekly overview
  async getWeeklyOverview() {
    try {
      const res = await fetch(`${API_BASE_URL}/weekly-overview`);
      if (!res.ok) throw new Error("API request failed");
      const json = await res.json();
      if (json.success) return json.data;
    } catch {
      const tasks = getLocalTasks();
      const map = new Map();

      tasks.forEach((task) => {
        const { weekStart, weekEnd, weekLabel } = getWeekRange(task.date);
        const key = weekStart.toISOString();
        if (!map.has(key)) {
          map.set(key, {
            weekStart,
            weekEnd,
            weekLabel,
            openTasks: 0,
            completedTasks: 0,
            totalTasks: 0,
            tasks: [],
          });
        }
        const g = map.get(key);
        g.totalTasks += 1;
        if (task.status === "Completed") g.completedTasks += 1;
        else g.openTasks += 1;
        g.tasks.push(task);
      });

      const currentWeek = getWeekRange(new Date());
      const curKey = currentWeek.weekStart.toISOString();
      if (!map.has(curKey)) {
        map.set(curKey, {
          weekStart: currentWeek.weekStart,
          weekEnd: currentWeek.weekEnd,
          weekLabel: currentWeek.weekLabel,
          openTasks: 0,
          completedTasks: 0,
          totalTasks: 0,
          tasks: [],
        });
      }

      return Array.from(map.values()).sort(
        (a, b) => new Date(a.weekStart) - new Date(b.weekStart)
      );
    }
  },

  // Create task
  async createTask(taskData) {
    try {
      const res = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      if (!res.ok) throw new Error("API request failed");
      const json = await res.json();
      if (json.success) {
        const current = getLocalTasks();
        saveLocalTasks([json.data, ...current]);
        return json.data;
      }
    } catch {
      const newTask = {
        _id: "local-" + Date.now(),
        ...taskData,
        status: taskData.status || "In Progress",
        priority: taskData.priority || "Medium",
        createdAt: new Date().toISOString(),
      };
      const current = getLocalTasks();
      saveLocalTasks([newTask, ...current]);
      return newTask;
    }
  },

  // Update task
  async updateTask(id, updates) {
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("API request failed");
      const json = await res.json();
      if (json.success) {
        const current = getLocalTasks().map((t) => (t._id === id ? json.data : t));
        saveLocalTasks(current);
        return json.data;
      }
    } catch {
      const current = getLocalTasks().map((t) => (t._id === id ? { ...t, ...updates } : t));
      saveLocalTasks(current);
      return current.find((t) => t._id === id);
    }
  },

  // Toggle status
  async toggleTaskStatus(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/${id}/toggle`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("API request failed");
      const json = await res.json();
      if (json.success) {
        const current = getLocalTasks().map((t) => (t._id === id ? json.data : t));
        saveLocalTasks(current);
        return json.data;
      }
    } catch {
      const current = getLocalTasks().map((t) => {
        if (t._id === id) {
          const nextStatus = t.status === "Completed" ? "In Progress" : "Completed";
          return { ...t, status: nextStatus };
        }
        return t;
      });
      saveLocalTasks(current);
      return current.find((t) => t._id === id);
    }
  },

  // Delete task
  async deleteTask(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("API request failed");
      const json = await res.json();
      const current = getLocalTasks().filter((t) => t._id !== id);
      saveLocalTasks(current);
      return json;
    } catch {
      const current = getLocalTasks().filter((t) => t._id !== id);
      saveLocalTasks(current);
      return { success: true };
    }
  },
};

