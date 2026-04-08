import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Projects = () => {
  const [tasksData, setTasksData] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [sortType, setSortType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          "https://workasana-backend-kohl.vercel.app/tasks"
        );
        setTasksData(res.data);
        setFilteredTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // 🎯 Filter + Sort Logic
  useEffect(() => {
    let updated = [...tasksData];

    // Status filter
    if (statusFilter) {
      updated = updated.filter((task) => task.status === statusFilter);
    }

    // Tag filter
   if (tagFilter) {
  updated = updated.filter((task) =>
    task.tags?.some((tag) =>
      tag.toLowerCase().includes(tagFilter.toLowerCase())
    )
  );
}

    // Sort by due date
    if (sortType === "dueDate") {
      updated.sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      );
    }

    setFilteredTasks(updated);
  }, [statusFilter, tagFilter, sortType, tasksData]);

  if (loading) return <h3>Loading...</h3>;

  return (
    <div>
      {/* 🔥 Heading */}
      <h2 className="mb-3">📋 Tasks Overview</h2>

      {/* 🎛 Controls */}
      <div className="controls d-flex gap-3 mb-4">
        
        {/* Status Filter */}
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-select w-25"
        >
          <option value="">All Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Tag Filter */}
        <input
          type="text"
          placeholder="Filter by tag"
          className="form-control w-25"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        />

        {/* Sort */}
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="form-select w-25"
        >
          <option value="">Sort By</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>

      {/* 📋 Task List */}
      <div className="list">
        {filteredTasks.length===0?(
          <>
        <p className="no-data">
    No Task found for the selected status/tag
  </p>
        </>):(filteredTasks.map((task) => (
          <Link
  to={`/tasks/${task._id}`}
  key={task._id}
  className="task-card"
>
  {/* Task Name */}
  <h5 className="task-title">{task.name}</h5>

  {/* Owners */}
  <p className="task-row">
    <strong>Owner:</strong>{" "}
    {task.owners.map((o) => o.name).join(", ")}
  </p>

  {/* Tags */}
  <div className="task-tags"><strong>Tags: </strong>
    {task.tags?.slice(0, 3).map((tag, index) => (
      <span key={index} className="tag">
        {tag}
      </span>
    ))}
    {task.tags?.length > 3 && <span className="tag">+{task.tags.length - 3}</span>}
  </div>

  {/* Footer */}
  <div className="task-footer">
    <span><strong>Due Date: </strong>
      📅 {task.dueDate
        ? new Date(task.dueDate).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
})
        : "No date"}
    </span>
    <span className="status">{task.status}</span>
  </div>
</Link>
        )))}
      </div>
    </div>
  );
};

export default Projects;