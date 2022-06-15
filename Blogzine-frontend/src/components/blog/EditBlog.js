import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
import { BiArrowFromRight } from 'react-icons/bi'

const EditPost = () => {
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [body, setBody] = useState(null);
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')))
    const params = useParams()
    const history = createBrowserHistory({ window });
    // console.log(params.id)
    // console.log(id)
    useEffect(() => {
        const blog = async () => {
            await axios.get(`/api/blogs/${params.id}`, {
                headers: {
                    token: 'Bearer ' + auth.token
                }
            }).then(function (res) {
                // console.log(res.data)
                // setBlog(res.data)
                setTitle(res.data.title);
                setDescription(res.data.desc);
                setBody(res.data.body)
            })
        }
        blog()

    }, [params.id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`/api/blogs/${params.id}`, {
            title: title,
            body: body,
            desc: description
        }, {
            headers: {
                token: 'Bearer ' + auth.token
            }
        }).then(function (res) {
            console.log(res)
            history.back()
        })

    }

    return (
        <div className="py-20 container-xxl ">
            <div className='hover:font-semibold flex items-center hover:underline hover:underline-offset-1 cursor-pointer'>
                <BiArrowFromRight />
                <p className='uppercase rounded-none tracking-widest text-sm ms-1 mr-4 ' onClick={history.back}>go back</p>
            </div>
            <div className={` px-4 my-5`} style={{ border: "1px solid #dfe0e5", borderRadius: "2px" }}>
                <p className={`text-4xl tracking-wider uppercase my-10 font-bold text-center`}>Edit Post</p>
                {
                    title && description && body &&
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="PostName" className="form-label tracking-wide text-muted">Post name</label>
                            <input type="text" placeholder="post name" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control font-bold" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="PostDescription" className="form-label tracking-wide text-muted">Short Description</label>
                            <textarea style={{ height: "100px" }} placeholder="Add description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="PostText" className="form-label tracking-wide text-muted">Post body</label>
                            <textarea className="form-control" value={body} onChange={(e) => setBody(e.target.value)} style={{ height: "300px", resize: 'none' }} />
                        </div>
                        <div className={'d-flex flex-row justify-content-center justify-content-sm-start'}>
                            <button type="submit" className="btn btn-outline-dark uppercase rounded-none tracking-widest text-sm btn btn-outline-dark w-100">Save Change</button>

                        </div>
                    </form>
                }
            </div>
        </div>
    )
}
export default EditPost