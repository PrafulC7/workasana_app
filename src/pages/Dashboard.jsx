import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

const Dashboard = () => {
  const [tasksData, setTasksData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
    const [loading, setLoading] = useState(true);

   useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [projectsRes, tasksRes] = await Promise.all([
        axios.get("https://workasana-backend-kohl.vercel.app/projects", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get("https://workasana-backend-kohl.vercel.app/tasks", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setProjectsData(projectsRes.data);
      setTasksData(tasksRes.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
    
if (loading) return <h3>Loading...</h3>;
  return (
     <div className="dashboard">
      <div className="dashboard-header d-flex justify-content-between">
        <div>
        <h1>Dashboard</h1>
        </div>
        <div>
        <Link to="/projects/new" className="add-btn mb-4">
  + Add New Project
</Link>
</div>
      </div>

      {/* Projects */}
      <div className="card-grid">
        {projectsData.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
      <div className="d-flex justify-content-between mt-2">
        <div>
        <h1>My Tasks</h1>
        </div>
        <div>
        <Link to="/tasks/new" className="add-btn">
  + Add New Task
</Link>
</div>
      </div>
        {/* <h1>My Tasks</h1> */}
<div className="card-grid">
  {tasksData
    .filter((task) => !statusFilter || task.status === statusFilter)
    .map((task) => (
        <Link to={`/tasks/${task._id}`} key={task._id} className="project-card">
        <strong>{task.name}</strong><br/>
        <span>
          Due on: {new Date(task.dueDate).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
})}
        </span>

        <span>
          {task.owners.map((own) => (
            <div key={own._id}>{own.name}</div>
          ))}
        </span>
      </Link>
    ))}
</div>
     {/* <div className="list">
  {tasksData
    .filter((task) => !statusFilter || task.status === statusFilter)
    .map((task) => (
        <Link to={`/tasks/${task._id}`} key={task._id} className="agent-list-item">
        <strong className="viewLeads-item">{task.name}</strong>
        <span className="viewLeads-item">
          {task.timeToComplete} days to complete
        </span>

        <span className="viewLeads-item gap">
          {task.owners.map((own) => (
            <div key={own._id}>{own.name}</div>
          ))}
        </span>
      </Link>
    ))}
</div> */}
      {/* <div>
              <Link to="/tasks/new" className="add-btn">
  + Add New Task
</Link>
</div> */}
<div className="controls">
<select onChange={(e) => setStatusFilter(e.target.value)} className="form-select w-25">
  <option value="">All Tasks</option>
  <option value="To Do">To Do</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>
      </div>
      </div>
  )
}

export default Dashboard