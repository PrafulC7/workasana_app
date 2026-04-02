import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";
const TaskDetails = () => {
     const [taskData, setTaskData] = useState([]);
              const [loading, setLoading] = useState(true);
          const {id} = useParams()

          useEffect(() => {
  const fetchTask = async () => {
    try {
      const response = await axios.get(`https://workasana-backend-kohl.vercel.app/tasks/${id}`);
    //   console.log(response.data)
      setTaskData(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
    finally {
        setLoading(false);
      }
  };

  fetchTask();
}, []);

const markAsCompleted = async () => {
  try {
    const response = await axios.put(
      `https://workasana-backend-kohl.vercel.app/tasks/${taskData._id}/status`,
      { status: "Completed" }
    );

    setTaskData(response.data); // update UI

     toast.success(`Task marked as completed!`);

  } catch (error) {
    console.log("Error updating task:", error);
  }
};

  return (
    <div className="container">
  <h3 className="my-2">{taskData.name}</h3>

  <div className="col-12">
    <div className="card p-3 mb-4">
      <div className="card-body">

        <p><strong>Project:</strong> {taskData.project?.name}</p>

        <p><strong>Team:</strong> {taskData.team?.name}</p>

        <p>
          <strong>Owners:</strong>{" "}
          {taskData.owners?.map((owner) => owner.name).join(", ")}
        </p>

        <p>
          <strong>Tags:</strong>{" "}
          {taskData.tags?.join(", ")}
        </p>
        <p><strong>Due Date:</strong> {new Date(taskData.dueDate).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
})}</p>
        <p><strong>Time Remaining:</strong> {taskData.timeToComplete} Days</p>
        <p><strong>Status:</strong> {taskData.status}</p>
{taskData.status !== "Completed" && (
  <button
    className="btn btn-success"
    onClick={markAsCompleted}
  >
    Mark as Complete
  </button>
)}
      </div>
    </div>
  </div>
</div>
  )
}

export default TaskDetails
    {/* <p className="card-subtitle mb-2"><strong>Qualifications:</strong> {taskData.dueDate}</p> */}
