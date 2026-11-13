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
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showSearchModal, setShowSearchModal] = useState(false);
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

  // Week navigation
  const handlePrevWeek = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 7);
    setSelectedDate(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 7);
    setSelectedDate(next);
  };

  const currentWeek = getWeekRange(selectedDate);

  // Filter tasks based on search query, selected date, and viewAll mode
  const filteredTasks = tasks.filter((t) => {
    // Search query filter (header search bar)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = t.title && t.title.toLowerCase().includes(q);
      const inDesc = t.description && t.description.toLowerCase().includes(q);
      if (!inTitle && !inDesc) return false;
    }

    if (viewAll) return true;

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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased">
      {/* Top Navbar */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenSearchModal={() => setShowSearchModal(true)}
        onOpenCreateModal={handleOpenCreate}
      />

      {/* Main Responsive Grid Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Week Day Strip & Tasks List */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* Week Calendar Day Strip */}
            <WeekStrip
              selectedDate={selectedDate}
              currentWeekLabel={currentWeek.weekLabel}
              onSelectDate={(d) => {
                setSelectedDate(d);
                setViewAll(false);
              }}
              onPrevWeek={handlePrevWeek}
              onNextWeek={handleNextWeek}
            />

            {/* Task List Section */}
            <TaskList
              tasks={filteredTasks}
              title={
                searchQuery
                  ? `Search Results ("${searchQuery}")`
                  : viewAll
                  ? "All Scheduled Tasks"
                  : `Tasks for ${selectedDate.toLocaleDateString("default", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}`
              }
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              showViewAll={!viewAll}
              onViewAll={() => setViewAll(true)}
              onToggleStatus={handleToggleStatus}
              onEditTask={handleOpenEdit}
              onDeleteTask={handleDeleteTask}
            />
          </div>

          {/* Right Column: Weekly Metrics, Progress, and Monday-to-Sunday Accordion */}
          <div className="lg:col-span-5 xl:col-span-4">
            <WeeklyCards
              weeklyOverview={weeklyOverview}
              activeWeekIndex={activeWeekIndex}
              onSelectWeek={(idx) => setActiveWeekIndex(idx)}
            />
          </div>
        </div>
      </main>

      {/* Floating Action Button (Convenient on all screens) */}
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

      {/* Dedicated Search Overlay for Mobile */}
      {showSearchModal && (
        <SearchView
          tasks={tasks}
          onClose={() => setShowSearchModal(false)}
          onToggleStatus={handleToggleStatus}
          onEditTask={handleOpenEdit}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
}
