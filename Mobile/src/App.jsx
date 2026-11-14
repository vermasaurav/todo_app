import React, { useState, useEffect } from "react";
import Onboarding from "./components/Onboarding";
import Header from "./components/Header";
import WeekStrip from "./components/WeekStrip";
import WeeklyCards from "./components/WeeklyCards";
import WeeklyBreakdown from "./components/WeeklyBreakdown";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import TaskDetailModal from "./components/TaskDetailModal";
import SearchView from "./components/SearchView";
import FloatingButton from "./components/FloatingButton";
import { api, getWeekRange } from "./services/api";

export default function App() {
  const [screen, setScreen] = useState("onboarding");
  const [tasks, setTasks] = useState([]);
  const [weeklyOverview, setWeeklyOverview] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
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
    setViewingTask((prev) =>
      prev && prev._id === taskId
        ? { ...prev, status: prev.status === "Completed" ? "In Progress" : "Completed" }
        : prev
    );
    await api.toggleTaskStatus(taskId);
    await loadData();
  };

  const handleDeleteTask = async (taskId) => {
    // Optimistic UI update
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
    if (viewingTask && viewingTask._id === taskId) {
      setViewingTask(null);
    }
    await api.deleteTask(taskId);
    await loadData();
  };

  const handleOpenEdit = (task) => {
    if (viewingTask) {
      setViewingTask(null);
    }
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
  const isSearching = searchQuery.trim().length > 0;

  // Filter tasks based on search query (strictly title & description), selected date, and viewAll mode
  const filteredTasks = tasks.filter((t) => {
    // Search query filter: ONLY title and description!
    if (isSearching) {
      const q = searchQuery.trim().toLowerCase();
      const inTitle = t.title ? t.title.toLowerCase().includes(q) : false;
      const inDesc = t.description ? t.description.toLowerCase().includes(q) : false;
      return inTitle || inDesc;
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
        onShowOnboarding={() => setScreen("onboarding")}
      />

      {/* Main Responsive Grid Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isSearching ? (
          /* ============================================================== */
          /* 🔍 SEARCH MODE: Replaces everything below header with results  */
          /* ============================================================== */
          <div className="max-w-3xl mx-auto space-y-4 pb-24">
            <TaskList
              tasks={filteredTasks}
              title={`Search Results for "${searchQuery}"`}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              isSearching={true}
              onClearSearch={() => setSearchQuery("")}
              showViewAll={false}
              onToggleStatus={handleToggleStatus}
              onViewTask={(task) => setViewingTask(task)}
              onEditTask={handleOpenEdit}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        ) : (
          /* ============================================================== */
          /* 🏠 NORMAL HOME DASHBOARD (Calendar, Cards, Tasks, Breakdown)   */
          /* ============================================================== */
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

              {/* Mobile View: Place Weekly Summary & Progress immediately after Calendar (Figma Screen 2) */}
              <div className="lg:hidden">
                <WeeklyCards
                  weeklyOverview={weeklyOverview}
                  activeWeekIndex={activeWeekIndex}
                  onSelectWeek={(idx) => setActiveWeekIndex(idx)}
                  showBreakdown={false}
                />
              </div>

              {/* Task List Section */}
              <TaskList
                tasks={filteredTasks}
                title={
                  viewAll
                    ? "All Scheduled Tasks"
                    : `Tasks for ${selectedDate.toLocaleDateString("default", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}`
                }
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                isSearching={false}
                onClearSearch={() => setSearchQuery("")}
                showViewAll={!viewAll}
                onViewAll={() => setViewAll(true)}
                onToggleStatus={handleToggleStatus}
                onViewTask={(task) => setViewingTask(task)}
                onEditTask={handleOpenEdit}
                onDeleteTask={handleDeleteTask}
              />

              {/* Mobile View: Place Weekly Breakdown at the very bottom */}
              <div className="lg:hidden pb-24">
                <WeeklyBreakdown
                  weeklyOverview={weeklyOverview}
                  activeWeekIndex={activeWeekIndex}
                  onSelectWeek={(idx) => setActiveWeekIndex(idx)}
                />
              </div>
            </div>

            {/* Right Column: Weekly Metrics, Progress, and Monday-to-Sunday Accordion (Desktop View) */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
              <WeeklyCards
                weeklyOverview={weeklyOverview}
                activeWeekIndex={activeWeekIndex}
                onSelectWeek={(idx) => setActiveWeekIndex(idx)}
                showBreakdown={true}
              />
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button (Convenient on all screens) */}
      <FloatingButton onClick={handleOpenCreate} />

      {/* Full Task Detail View Modal */}
      <TaskDetailModal
        isOpen={!!viewingTask}
        task={viewingTask}
        onClose={() => setViewingTask(null)}
        onEdit={handleOpenEdit}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDeleteTask}
      />

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
          initialKeyword={searchQuery}
          onKeywordChange={setSearchQuery}
          onClose={() => setShowSearchModal(false)}
          onToggleStatus={handleToggleStatus}
          onViewTask={(task) => setViewingTask(task)}
          onEditTask={handleOpenEdit}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
}
