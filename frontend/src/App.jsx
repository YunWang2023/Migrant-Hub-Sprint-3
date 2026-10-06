import { Routes, Route, Link } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import WritePost from "./pages/WritePost";
import Search from "./pages/Search";
import MustDoPage from "./pages/MustDoPage";
import MustDoDetail from "./pages/MustDoDetail";
import CommunityPage from "./pages/CommunityPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function NotFound() {
    return (
        <main className="page">

            <h1 className="page-title">
                Page not found
            </h1>

            <p className="page-description">
                The page you were looking for does not exist.
            </p>

            <Link to="/" className="back-home">
                ← Back home
            </Link>

        </main>
    );
}

function App() {
    return (
        <Routes>

            {/* Every page shares one Navbar and one Footer. */}
            <Route element={<Layout />}>

                <Route path="/" element={<Home />} />

                <Route path="/blog" element={<Blog />} />

                <Route path="/blog/:id" element={<BlogDetails />} />

                <Route
                    path="/write-post"
                    element={
                        <ProtectedRoute>
                            <WritePost />
                        </ProtectedRoute>
                    }
                />

                <Route path="/search" element={<Search />} />

                <Route path="/must-do" element={<MustDoPage />} />

                <Route path="/must-do/:slug" element={<MustDoDetail />} />

                <Route path="/community" element={<CommunityPage />} />

                <Route path="/login" element={<LoginPage />} />

                <Route path="/register" element={<RegisterPage />} />

                <Route path="*" element={<NotFound />} />

            </Route>

        </Routes>
    );
}

export default App;
