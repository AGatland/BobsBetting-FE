import "./styles.css";
import { AuthContext } from "../../App";
import { useContext } from "react";

function Dashboard() {
    const { user } = useContext(AuthContext)

    return (
      <div className="dashboard-container">
        <h1>Welcome to Bobs Badges, { user && user.username}</h1>
      </div>
    )
  }
  
export default Dashboard