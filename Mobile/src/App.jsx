import React, { useState, useEffect } from "react";
import Onboarding from "./components/Onboarding";
import Header from "./components/Header";
import WeekStrip from "./components/WeekStrip";
import WeeklyCards from "./components/WeeklyCards";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import SearchView from "./components/SearchView";
import FloatingButton from "./components/FloatingButton";
import { api, getWeekRange } from "./services/api";

export default function App() {
  const [screen, setScreen] = useState(() => {
    return localStorage.getItem("has_seen_onboarding") ? "dashboard" : "onboarding";
  });
  const [tasks, setTasks] = useState([]);
  const [weeklyOverview, setWeeklyOverview] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewAll, setViewAll] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load initial data
  const loadData = async () => {
    try {
      const [allTasks, overview] = await Promise.all([
        api.getTasks(),
        api.getWeeklyOverview(),
      ]);
      setTasks(allTasks || []);
      setWeeklyOverview(overview || []);
    } catch (err) {
      console.error("Data load failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleGetStarted = () => {
    localStorage.setItem("has_seen_onboarding", "true");
    setScreen("dashboard");
  };

  const handleCreateOrUpdateTask = async (taskData) => {
    if (editingTask) {
      await api.updateTask(editingTask._id, taskData);
    } else {
      await api.createTask(taskData);
    }
    setModalOpen(false);
    setEditingTask(null);
    await loadData();
  };

  const handleToggleStatus = async (taskId) => {
    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) =>
        t._id === taskId
          ? { ...t, status: t.status === "Completed" ? "In Progress" : "Completed" }
          : t
      )
    );
    await api.toggleTaskStatus(taskId);
    await loadData();
  };

  const handleDeleteTask = async (taskId) => {
    // Optimistic UI update
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
    await api.deleteTask(taskId);
    await loadData();
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  // Filter tasks based on viewAll mode and selected date
  const filteredTasks = viewAll
    ? tasks
    : tasks.filter((t) => {
        if (!t.date) return false;
        const taskD = new Date(t.date);
        return (
          taskD.getFullYear() === selectedDate.getFullYear() &&
          taskD.getMonth() === selectedDate.getMonth() &&
          taskD.getDate() === selectedDate.getDate()
        );
      });

  if (screen === "onboarding") {
    return <Onboarding onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col relative select-none">
      {/* Top Header */}
      <Header onOpenSearch={() => setShowSearch(true)} />

      {/* Week Calendar Day Strip */}
      <WeekStrip
        selectedDate={selectedDate}
        onSelectDate={(d) => {
          setSelectedDate(d);
          setViewAll(false);
        }}
      />

      {/* Weekly Metric Summary Cards & Progress */}
      <WeeklyCards
        weeklyOverview={weeklyOverview}
        activeWeekIndex={activeWeekIndex}
        onSelectWeek={(idx) => setActiveWeekIndex(idx)}
      />

      {/* Task List Section */}
      <TaskList
        tasks={filteredTasks}
        title={viewAll ? "All Scheduled Tasks" : "Tasks Today"}
        showViewAll={!viewAll}
        onViewAll={() => setViewAll(true)}
        onToggleStatus={handleToggleStatus}
        onEditTask={handleOpenEdit}
        onDeleteTask={handleDeleteTask}
      />

      {/* Floating Action Button */}
      <FloatingButton onClick={handleOpenCreate} />

      {/* Add / Edit Task Modal */}
      <TaskModal
        isOpen={modalOpen}
        initialDate={selectedDate}
        editingTask={editingTask}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleCreateOrUpdateTask}
      />

      {/* Search Overlay */}
      {showSearch && (
        <SearchView
          tasks={tasks}
          onClose={() => setShowSearch(false)}
          onToggleStatus={handleToggleStatus}
          onEditTask={handleOpenEdit}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
}

