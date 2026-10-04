import { NavLink } from "react-router-dom";

function Navbar() {
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

                    <NavLink to="/login" className="login-nav-button">
                        Login
                    </NavLink>

                </div>

            </nav>
        </header>
    );
}

export default Navbar;