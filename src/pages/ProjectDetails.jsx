import { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

const ProjectDetails = () => {
    const [projectsData, setProjectsData] = useState([]);
        const [loading, setLoading] = useState(true);
        const { id } = useParams();
        useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`https://workasana-backend-kohl.vercel.app/projects/${id}`);
      setProjectsData(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchProjects();
}, []);
if (loading) return <h3>Loading...</h3>;

  return ( projectsData &&
       <div className="col-12">
    <div className="card p-3 mb-4">
      <div className="card-body">
                <h3>{projectsData.name}</h3>
                <p>{projectsData.description}</p>
            </div>
          </div>
      </div>
    
  )
}

export default ProjectDetails