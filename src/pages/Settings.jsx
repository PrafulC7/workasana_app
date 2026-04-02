import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Logout from "../components/Logout";
const Settings = () => {
  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

    const fetchTeams = async () => {
    const res = await axios.get("https://workasana-backend-kohl.vercel.app/teams");
    setTeams(res.data);
  };

  const fetchTasks = async () => {
    const res = await axios.get("https://workasana-backend-kohl.vercel.app/tasks");
    setTasks(res.data);
  };

  const fetchProjects = async () => {
    const res = await axios.get("https://workasana-backend-kohl.vercel.app/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchTeams();
    fetchTasks();
    fetchProjects();
  }, []);


  const handleDelete = async (type, id) => {
  // const confirmDelete = window.confirm("Are you sure?");
  // if (!confirmDelete) return;

  try {
    await axios.delete(`https://workasana-backend-kohl.vercel.app/${type}/${id}`);
toast.success(`Deleted successfully!`);
    // refresh based on type
    if (type === "teams") fetchTeams();
    if (type === "tasks") fetchTasks();
    if (type === "projects") fetchProjects();

  } catch (err) {
    console.error(err);
  }
};
  return (
    <>
    <div className="d-flex justify-content-between mt-2">
    <div>
    <h2>Settings</h2>
    </div>
    <div>
<Logout/>
    </div>
    </div>
    <div className="settings-section">
      <h3>Teams</h3>
  {teams.map((team) => (
    <div key={team._id} className="settings-item">
      {team.name}
      <button onClick={() => handleDelete("teams", team._id)} className="danger-btn rounded">
        Delete
      </button>
    </div>
  ))}
</div>

<div className="settings-section">
<h3>Tasks</h3>
  {tasks.map((task) => (
    <div key={task._id} className="settings-item">
      {task.name}
      <button onClick={() => handleDelete("tasks", task._id)} className="danger-btn rounded">
        Delete
      </button>
    </div>
  ))}
</div>

<div className="settings-section">
<h3>Projects</h3>
  {projects.map((project) => (
    <div key={project._id} className="settings-item">
      {project.name}
      <button onClick={() => handleDelete("projects", project._id)} className="danger-btn rounded">
        Delete
      </button>
    </div>
  ))}
</div>
    </>
  )
}

export default Settings