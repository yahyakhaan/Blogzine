import { Routes, Route } from "react-router-dom"
import EditBlog from "./components/blog/EditBlog";
import UserBlogs from "./components/blog/UserBlogs";
import ViewBlog from "./components/blog/ViewBlog";
import CreateBlog from "./components/blog/CreateBlog"
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import Register from "./components/register/Register"

const App = () => {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/view/:id" element={<ViewBlog />} />
        <Route path="/blogs/edit/:id" element={<EditBlog />} />
        <Route path="/blogs/:id" element={<UserBlogs />} />
        <Route path="/blogs/:id/create" element={<CreateBlog />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;