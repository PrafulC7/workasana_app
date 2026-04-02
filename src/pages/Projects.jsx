import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Projects = () => {
  const [tasksData, setTasksData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
   useEffect(() => {
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tasks");
      setTasksData(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
    finally {
        setLoading(false);
      }
  };

  fetchTasks();
}, []);
if (loading) return <h3>Loading...</h3>;
  return (
    <div>
      <div className="list">
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
</div>
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

export default Projects