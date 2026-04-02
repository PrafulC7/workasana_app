import { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);



const Reports = () => {
  const [tasks, setTasks] = useState([]);
// backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"]
const fetchTasks = async () => {
  const res = await axios.get("https://workasana-backend-kohl.vercel.app/tasks");
  setTasks(res.data);
};

useEffect(() => {
  fetchTasks();
}, []);

const now = new Date();

const lastWeekTasks = tasks.filter((task) => {
  if (task.status !== "Completed" || !task.completedAt) return false;

  const completedDate = new Date(task.completedAt);
  const diffDays = (now - completedDate) / (1000 * 60 * 60 * 24);

  return diffDays <= 7;
});

const workDoneData = {
  labels: ["Completed Tasks"],
  datasets: [
    {
      label: "Last Week",
      data: [lastWeekTasks.length],
      backgroundColor: ["#36A2EB"],
    },
  ],
};

const pendingTasks = tasks.filter(t => t.status !== "Completed");

const totalPendingDays = pendingTasks.reduce(
  (acc, t) => acc + (t.timeToComplete || 0),
  0
);

const pendingData = {
  labels: ["Pending Work"],
  datasets: [
    {
      label: "Days",
      data: [totalPendingDays],
      backgroundColor: [
        "#FF6384",
      ],
    },
  ],
};

const tasksByTeam = {};

tasks.forEach((task) => {
  if (task.status === "Completed") {
    const teamName = task.team?.name; // 👈 FIX HERE

    if (teamName) {
      tasksByTeam[teamName] = (tasksByTeam[teamName] || 0) + 1;
    }
  }
});

const teamData = {
  labels: Object.keys(tasksByTeam),
  datasets: [
    {
      label: "Tasks Closed",
      data: Object.values(tasksByTeam),
      backgroundColor: [
        "#FFCE56",
        "#4BC0C0",
      ],
    },
  ],
};

const tasksByOwner = {};

tasks.forEach((task) => {
  if (task.status === "Completed") {
   task.owners.forEach((owner) => {
  const ownerName = owner.name; // or owner.username

  tasksByOwner[ownerName] = (tasksByOwner[ownerName] || 0) + 1;
});
  }
});

const ownerData = {
  labels: Object.keys(tasksByOwner),
  datasets: [
    {
      label: "Tasks Closed",
      data: Object.values(tasksByOwner),
      backgroundColor: [
        "#FFCE56",
        "#4BC0C0",
      ],
    },
  ],
};

  return (
    <div>
  <h2>Reports Dashboard</h2>
<div className="card-grid">

  <section className="report-card">
  <h3>Total Work Done Last Week</h3>
  <Bar data={workDoneData} />
</section>

<section className="report-card">
  <h3>Total Days of Work Pending</h3>
  <Bar data={pendingData} />
</section>

<section className="report-card">
  <h3>Tasks Closed by Team</h3>
  <Pie data={teamData} />
</section>

<section className="report-card">
  <h3>Tasks Closed by Owner</h3>
  <Bar data={ownerData} />
  </section>
</div>
</div>
  )
}

export default Reports