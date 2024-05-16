import Header from "./components/Header"
import Footer from "./components/Footer"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import { environment } from "./environments/environment";
import './App.css'
import { Route, Routes, useNavigate } from "react-router-dom"
import { createContext, useEffect, useState } from "react"
import Lobby from "./pages/Lobby";

const AuthContext = createContext();

const loadUserDataFromStorage = () => {
  const userVal = localStorage.getItem("authUser");
  if (userVal !== undefined || userVal !== null) return JSON.parse(userVal);
  return null;
};

function App() {
  const [user, setUser] = useState(loadUserDataFromStorage());

  const navigate = useNavigate();

    const updateUserData = () => {
      fetch(`${environment.apiUrl}user/${user.id}`, {
        method: "GET",
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            setUser(data)
            localStorage.setItem("authUser", JSON.stringify(data));
          });
        }})
    }

    // called when we successfully log in
    const login = (user) => {
      setUser(user);
      // update local storage
      localStorage.setItem("authUser", JSON.stringify(user));
      // redirect to home page after login
      navigate("/");
    };
  
    // called to logout: clear local storage + reset local state
    const logout = () => {
      // reset local user auth state
      setUser(null);
      // clear local storage
      localStorage.removeItem("authUser");
      // redirect to login page
      navigate("/login");
    };

    useEffect(() => {
      if (!user && window.location.pathname !== "/signup") navigate("/login")
    }, [navigate, user]);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, updateUserData }}>
          <div className="container">
              <Header />
                <div className="main-container">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Login />} />
                    <Route path="/lobby" element={<Lobby />} />
                  </Routes>
                </div>
              <Footer />
          </div>
    </AuthContext.Provider>
  )
}

export { App, AuthContext }