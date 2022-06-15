import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { BiArrowFromRight } from 'react-icons/bi'

const ViewBlog = () => {

    const params = useParams()
    const history = createBrowserHistory({ window });
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')))
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const blog = async () => {
            await axios.get(`/api/blogs/${params.id}`, {
                headers: {
                    token: 'Bearer ' + auth.token
                }
            }).then(function (res) {

                setBlog(res.data)
            })
        }
        blog()

    }, [params.id])

    return (
        <div className='py-14 container-xxl flex min-h-screen'>
            {
                blog &&
                <div className='flex-grow'>
                    <div className='hover:font-semibold flex items-center hover:underline hover:underline-offset-1 cursor-pointer'>
                        <BiArrowFromRight />
                        <p className='uppercase rounded-none tracking-widest text-sm ms-1 mr-4 ' onClick={history.back}>go back</p>
                    </div>
                    <div className={`h1 text-center tracking-wider`}>{blog.title}</div>
                    <blockquote className="blockquote">
                        <p className={`text-muted`}> {blog.desc}</p>
                        <p>{blog.body}</p>
                        <footer className="blockquote-footer mt-2">By <cite title="Source Title">{blog.author}</cite>
                        </footer>
                    </blockquote>
                </div>
            }
        </div>
    )
}
export default ViewBlog