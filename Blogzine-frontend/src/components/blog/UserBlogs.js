import BlogsRow from "./BlogsRow";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AiFillFileAdd } from "react-icons/ai"

const UserBlogs = () => {

    const params = useParams()
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')))
    const [blogs, setBlogs] = useState(null);
    // console.log(id)
    useEffect(() => {
        const blog = async () => {
            await axios.get(`/api/blogs/user/${params.id}`, {
                headers: {
                    token: 'Bearer ' + auth.token
                }
            }).then(function (res) {
                // console.log(res.data)
                setBlogs(res.data)
            })
        }
        blog()

    }, [params.id])

    return (
        <div className="container-xxl min-h-screen flex">
            <div className="flex-grow">

                <div className={`d-flex flex-row justify-content-between py-20`}>
                    <div className={`text-4xl tracking-wider uppercase font-bold text-center`}>Blogs List

                    </div>

                    <Link to={`/blogs/${params.id}/create`}>
                        <button className='btn btn-outline-dark uppercase rounded-none tracking-widest text-sm mx-4 flex items-center'>
                            <AiFillFileAdd className="text-xl me-2" />
                            <span>Add Blog</span>
                        </button>
                    </Link>
                </div>
                <table className="table table-responsive-md mt-3   table-hover " style={{ borderRadius: '3px' }}>
                    <thead className="table-dark " >
                        <tr>
                            <th className="py-3 text-sm uppercase tracking-widest">Post Name</th>
                            <th className="py-3 text-sm uppercase tracking-widest">Published Date</th>
                            <th className="py-3 text-sm uppercase tracking-widest">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            blogs && blogs.map((item, i) => {
                                return (<BlogsRow blog={item} key={i} />)
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default UserBlogs