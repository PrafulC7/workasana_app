import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Teams = () => {
  const [teams, setTeams] = useState([]);
  const fetchTeams = async () => {
    try {
      const res = await axios.get("https://workasana-backend-kohl.vercel.app/teams");
      setTeams(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);


  return (
    <div>
      <h2>Teams</h2>

      {/* Teams List */}
      <div className="list">
        {teams.map((team) => (
          <div key={team._id} className="teams-list-item">
           <span className="viewTeams-item">{team.name}</span> 
          </div>
        ))}
      </div>
<div>
              <Link to="/teams/new" className="add-btn">
  + Add New Team
</Link>
</div>
      
    </div>
  )
}

export default Teams