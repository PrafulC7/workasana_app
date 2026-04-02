import {useState} from 'react';
import axios from "axios";
import { toast } from "react-toastify";
const AddTeam = () => {
      const [name, setName] = useState("");
      const [description, setDescription] = useState("");

      const handleAddTeam = async () => {
    if (!name.trim()) {
      alert("Team name is required");
      return;
    }

    try {
      await axios.post("https://workasana-backend-kohl.vercel.app/teams", {
        name,
        description,
      });
 toast.success(`Team created successfully!`);
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
        placeholder="Enter team name"
        className='form-control mb-3'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
  type="text"
  placeholder="Enter team description"
  className='form-control mb-3'
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>
      <button onClick={handleAddTeam} className="btn btn-primary w-100">Add Team</button>
    </div>
  )
}

export default AddTeam