import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <header className="site-header">
            <nav className="navbar">
                <NavLink to="/" className="logo">
                    Migrant Hub
                </NavLink>

                <div className="nav-links">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/blog">Blog</NavLink>
                    <NavLink to="/must-do">Must Do</NavLink>
                    <NavLink to="/community">Community</NavLink>
                    <NavLink to="/search">Search</NavLink>
                    <NavLink to="/login">Login</NavLink>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;