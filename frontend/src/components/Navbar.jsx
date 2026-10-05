import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/navbar-auth.css";

function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="site-header">
            <nav className="navbar">

                <NavLink to="/" className="logo">
                    Migrant <span>Hub</span>
                </NavLink>

                <div className="nav-links">

                    <NavLink to="/" end>
                        Home
                    </NavLink>

                    <NavLink to="/blog">
                        Blog
                    </NavLink>

                    <NavLink to="/write-post">
                        Write a Post
                    </NavLink>

                    <NavLink to="/must-do">
                        Must Do
                    </NavLink>

                    <NavLink to="/community">
                        Community
                    </NavLink>

                    <NavLink to="/search">
                        Search
                    </NavLink>

                    {isAuthenticated ? (
                        <>
                            <span className="nav-user">
                                Hi, {user?.name || user?.email}
                            </span>
                            <button
                                type="button"
                                className="login-nav-button"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/register">
                                Sign up
                            </NavLink>
                            <NavLink to="/login" className="login-nav-button">
                                Login
                            </NavLink>
                        </>
                    )}

                </div>

            </nav>
        </header>
    );
}

export default Navbar;