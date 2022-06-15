import { useState } from "react";
import { createBrowserHistory } from "history";
import { BiArrowFromRight } from "react-icons/bi";
import axios from "axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const history = createBrowserHistory({ window });
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')))

  const CreateRequest = async (res) => {
    await axios
      .post("/api/blogs/", {
        title: title,
        body: body,
        desc: description,
        author: res.data.user.name,
        uid: res.data.user._id,
      })
      .then(function (res) {
        console.log(res);
        history.back();
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await axios
    //   .get("/api/users/check/authentication")
    //   .then(function (res) {
    //     if (res.data.bool === true) {
    //       CreateRequest(res);
    //     }
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });
    await axios
      .post("/api/blogs/", {
        title: title,
        body: body,
        desc: description,
        author: auth.user.name,
        uid: auth.user._id,
      }, {
        headers: {
          token: 'Bearer ' + auth.token
        }
      })
      .then(function (res) {
        console.log(res);
        history.back();
      });
  };

  return (
    <div className="py-20 container-xxl ">
      <div className="hover:font-semibold flex items-center hover:underline hover:underline-offset-1 cursor-pointer">
        <BiArrowFromRight />
        <p
          className="uppercase rounded-none tracking-widest text-sm ms-1 mr-4 "
          onClick={history.back}
        >
          go back
        </p>
      </div>
      <div
        className={` px-4 my-5`}
        style={{ border: "1px solid #dfe0e5", borderRadius: "2px" }}
      >
        <p
          className={`text-4xl tracking-wider uppercase my-10 font-bold text-center`}
        >
          Create Post
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="PostName" className="form-label tracking-wide">
              Blog name
            </label>
            <input
              type="text"
              placeholder="post name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="PostDescription"
              className="form-label tracking-wide"
            >
              Short Description
            </label>
            <textarea
              style={{ height: "100px" }}
              placeholder="Add description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="PostText" className="form-label tracking-wide">
              Blog body
            </label>
            <textarea
              className="form-control"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={{ height: "300px", resize: "none" }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-dark uppercase rounded-none tracking-widest text-sm w-100"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateBlog;
