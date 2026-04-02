import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {

  return (
    <Link to={`/projects/${project._id}`} className="project-card" aria-label={`View details for ${project.name}`}>
  <h4>{project.name}</h4>
  <p>Description: {project.description}</p>

      {/* <span className={`badge ${project.status.toLowerCase()}`}>
        {project.priority}
      </span> */}
    </Link>
  );
};

export default ProjectCard;