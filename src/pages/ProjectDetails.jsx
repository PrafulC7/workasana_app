import { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

const ProjectDetails = () => {
   const [tasks, setTasks] = useState([]);
   const [projectsData, setProjectsData] = useState([]);
const [filteredTasks, setFilteredTasks] = useState([]);
const [statusFilter, setStatusFilter] = useState("All");
const [sortType, setSortType] = useState("");
        const [loading, setLoading] = useState(true);
        const { id } = useParams();

        const fetchTasks = async () => {
  const res = await axios.get(
    `https://workasana-backend-kohl.vercel.app/tasks/project/${id}`
  );
  setTasks(res.data);
  setFilteredTasks(res.data);
};
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`https://workasana-backend-kohl.vercel.app/projects/${id}`);
      setProjectsData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
  fetchProjects();
  fetchTasks();
}, [id]);

useEffect(() => {
  let updated = [...tasks];

  // filter by status
  if (statusFilter !== "All") {
    updated = updated.filter((task) => task.status === statusFilter);
  }

  // sorting
  if (sortType === "date") {
    updated.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  if (sortType === "name") {
    updated.sort((a, b) => a.name.localeCompare(b.name));
  }

  setFilteredTasks(updated);
}, [statusFilter, sortType, tasks]);
if (loading) return <h3>Loading...</h3>;

  return ( 
    <>
    <h4><strong>Project: </strong>{projectsData.name}</h4>

{filteredTasks.map((task) => (
  <div key={task._id} className="card p-2 mb-2">
    <h5><strong>Task: </strong>{task.name}</h5>
    <p>Status: {task.status}</p>
    <p>Team: {task.team?.name}</p>
    <p>
      Owners:{" "}
      {task.owners.map((o) => o.name).join(", ")}
    </p>
  </div>
))}

<div className="d-flex gap-3 mb-3">

  <select onChange={(e) => setStatusFilter(e.target.value)} className="form-select w-25">
    <option value="All">All</option>
    <option value="To Do">To Do</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
  </select>

  <select onChange={(e) => setSortType(e.target.value)} className="form-select w-25">
    <option value="">Sort By</option>
    <option value="date">Date</option>
    {/* <option value="name">Name</option> */}
  </select>

</div>
    </>
  )
}

export default ProjectDetails

// projectsData &&
//        <div className="col-12">
//     <div className="card p-3 mb-4">
//       <div className="card-body">
//                 <h3>{projectsData.name}</h3>
//                 <p>{projectsData.description}</p>
//             </div>
//           </div>
//       </div>