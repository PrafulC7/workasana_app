import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login"
import Dashboard from './pages/Dashboard';
import ProtectedRoute from "./components/ProtectedRoute";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
import Sidebar from "./components/Sidebar";
import ProjectDetails from "./pages/ProjectDetails";
import AddTask from "./pages/AddTask";
import TaskDetails from "./pages/TaskDetails";
import AddTeam from "./pages/AddTeam";
import AddProject from "./pages/AddProject";


function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Layout */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="app-layout">
                <Sidebar />
                <div className="main-content">
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="projects/new" element={<AddProject />} />
                    <Route path="projects/:id" element={<ProjectDetails />} />
                    <Route path="tasks/new" element={<AddTask />} />
                    <Route path="tasks/:id" element={<TaskDetails />} />
                    <Route path="teams" element={<Teams />} />
                    <Route path="teams/new" element={<AddTeam />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="settings" element={<Settings />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
