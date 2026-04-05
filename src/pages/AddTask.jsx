import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AddTask = () => {
const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [tagsList, setTagsList] = useState([]);

  const [taskData, setTaskData] = useState({
    projectId: "",
    taskName: "",
    team: "",
    owners: [],
    tags: [],
    dueDate: "",
    estimatedTime: "",
    status: "To Do"
  });

  // Fetch all required data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRes = await axios.get("https://workasana-backend-kohl.vercel.app/projects");
        const userRes = await axios.get("https://workasana-backend-kohl.vercel.app/users");
        const teamRes = await axios.get("https://workasana-backend-kohl.vercel.app/teams");

        // optional tags API (if exists)
        let tagsRes = { data: [] };
        try {
          tagsRes = await axios.get("https://workasana-backend-kohl.vercel.app/tags");
        } catch {
          tagsRes.data = ["urgent", "bug", "feature", "improvement"];
        }

        setProjects(projectRes.data);
        setUsers(userRes.data);
        setTeams(teamRes.data);
        setTagsList(tagsRes.data);

      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskData({
      ...taskData,
      [name]: value
    });
  };

  // Handle checkbox
  const handleCheckbox = (e) => {
    const { name, value, checked } = e.target;

    setTaskData((prev) => {
      if (checked) {
        return {
          ...prev,
          [name]: [...prev[name], value]
        };
      } else {
        return {
          ...prev,
          [name]: prev[name].filter((item) => item !== value)
        };
      }
    });
  };

  // Submit
  const handleSubmit = async (e) => {
  e.preventDefault();
if (taskData.owners.length === 0) {
  toast.error("Select at least one owner");
  return;
}
  try {
    const payload = {
      name: taskData.taskName,                         // ✅ matches schema
      project: taskData.projectId,                     // ✅ ObjectId
      team: taskData.team,                             // ✅ ObjectId
      owners: taskData.owners,                         // ✅ ObjectId[]
      tags: taskData.tags,                             // ✅ string[]
      timeToComplete: Number(taskData.estimatedTime),  // ✅ number
      dueDate: taskData.dueDate,
      status: taskData.status                       // ✅ date (YYYY-MM-DD works)
    };

    console.log("Sending:", payload);

    await axios.post("https://workasana-backend-kohl.vercel.app/tasks", payload);

    // ✅ success feedback
     navigate("/dashboard");
    // toast.success(`Task created successfully!`);
    // alert("Task created successfully!");

    // ✅ optional: reset form
    setTaskData({
      projectId: "",
      taskName: "",
      team: "",
      owners: [],
      tags: [],
      dueDate: "",
      estimatedTime: ""
    });

  } catch (error) {
    console.log("Error creating task:", error.response?.data);
  }
};

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">

        <h3 className="text-center mb-4">Create Task</h3>

        <form onSubmit={handleSubmit}>

          {/* Project */}
          <div className="mb-3">
            <label className="form-label">Project</label>
            <select
              className="form-select"
              name="projectId"
              value={taskData.projectId}
              onChange={handleChange}
              required
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Task Name */}
          <div className="mb-3">
            <label className="form-label">Task Name</label>
            <input
              type="text"
              className="form-control"
              name="taskName"
              value={taskData.taskName}
              onChange={handleChange}
              placeholder="Enter task name"
              required
            />
          </div>

          {/* Team */}
          <div className="mb-3">
            <label className="form-label">Team</label>
            <select
              className="form-select"
              name="team"
              value={taskData.team}
              onChange={handleChange}
              required
            >
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {/* Owners */}
          <div className="mb-3 d-flex gap-3">
            <label className="form-label">Owners</label>
            {users.map((user) => (
              <div className="form-check" key={user._id}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="owners"
                  value={user._id}
                  checked={taskData.owners.includes(user._id)}
                  onChange={handleCheckbox}
                />
                <label className="form-check-label">
                  {user.name}
                </label>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="mb-3 row d-flex">
         
            <label className="form-label">Tags</label>
            {tagsList.map((tag, index) => {
              const tagValue = tag.name || tag; // handles both API or static
              return (
                 <div className="col-md-3 col-lg-2" key={index}>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="tags"
                    value={tagValue}
                    checked={taskData.tags.includes(tagValue)}
                    onChange={handleCheckbox}
                  />
                  <label className="form-check-label">
                    {tagValue}
                  </label>
                </div>
                </div>
              );
            })}
          </div>
         

          {/* Due Date */}
          <div className="mb-3">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Estimated Time */}
          <div className="mb-3">
            <label className="form-label">Estimated Time (Days)</label>
            <input
              type="number"
              className="form-control"
              name="estimatedTime"
              value={taskData.estimatedTime}
              onChange={handleChange}
              placeholder="Enter days"
              required
            />
          </div>

          <div className="mb-3">
  <label className="form-label">Status</label>
  <select
    className="form-select"
    value={taskData.status}
    onChange={(e) =>
      setTaskData({ ...taskData, status: e.target.value })
    }
  >
    <option value="To Do">To Do</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
    {/* <option value="Blocked">Blocked</option> */}
  </select>
</div>

          <button type="submit" className="btn btn-primary w-100">
            Create Task
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddTask;