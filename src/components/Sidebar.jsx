import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
<NavLink to="/dashboard">
          <h2 className="logo">Workasana</h2>
        </NavLink>
      <nav>
        <NavLink to="/dashboard" end className="link">
          Dashboard
        </NavLink>

        <NavLink to="/projects" className="link">
          Projects
        </NavLink>

        <NavLink to="/teams" className="link">
          Teams
        </NavLink>

         <NavLink to="/reports" className="link">
          Reports
        </NavLink>

        <NavLink to="/settings" className="link">Settings</NavLink>
      </nav>
        {/* <nav className="nav flex-column">
  <a className="nav-link active" aria-current="page" href="#">Active</a>
  <a className="nav-link" href="#">Link</a>
  <a className="nav-link" href="#">Link</a>
  <a className="nav-link disabled" aria-disabled="true">Disabled</a>
</nav> */}
         </div>
  )
}

export default Sidebar