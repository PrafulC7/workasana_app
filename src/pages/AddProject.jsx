import {useState} from 'react';
import axios from "axios";
import { toast } from "react-toastify";

const AddProject = () => {
      const [name, setName] = useState("");
      const [description, setDescription] = useState("");
         const handleAddProject = async () => {
    if (!name.trim()) {
      alert("Project name is required");
      return;
    }

    try {
      await axios.post("https://workasana-backend-kohl.vercel.app/projects", {
        name,
        description,
      });
 toast.success(`Project created successfully!`);
      setName("");
      setDescription("");
    //   fetchTeams(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
        {/* Add Team */}
      <input
        type="text"
        placeholder="Enter project name"
        className='form-control mb-3'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
  type="text"
  placeholder="Enter project description"
  className='form-control mb-3'
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>
      <button onClick={handleAddProject} className="btn btn-primary w-100">Add Project</button>
    </div>
  )
}

export default AddProject