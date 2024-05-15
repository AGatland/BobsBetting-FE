import { useContext } from "react";
import { AuthContext } from "../../App";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";


function Header() {
  const { user, logout } = useContext(AuthContext)

  const navigate = useNavigate();

    return (
      <div className="header-container">
        <Link to={{pathname: "/"}}><h2>Bobs Betting</h2></Link>
        <div className="header-container-middle">
          <Link to={{pathname: "/Lobby"}} >Lobbies</Link>
        </div>
        <div className="header-container-right">
        { user &&
        <>
        <h2>{user.username} ${user.chips}</h2>
        <button onClick={() => logout()}>Logout</button>
        </>
        || 
        <button onClick={() => navigate("/login")}>Login</button> 
        }
        </div>
      </div>
    )
  }
  
  export default Header