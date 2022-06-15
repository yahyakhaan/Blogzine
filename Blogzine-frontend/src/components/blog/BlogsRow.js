import { MdDeleteOutline } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import { AiOutlineEye } from 'react-icons/ai'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
const BlogsRow = ({ blog }) => {

    const [del, setDel] = useState(false);
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')))
    
    const handleDelete = async () => {
        await axios.delete(`/api/blogs/${blog._id}`, {
            headers: {
                token: 'Bearer ' + auth.token
            }
        }).then(function (res) {
            console.log(res)
        })
        setDel(true)

    }

    return (

        !del &&

        <tr>
            <th className="pt-3 align-middle">{blog.title}</th>
            <td className="pt-3 align-middle">{blog.createdAt.substring(0, 10)}</td>
            <td className="pt-3 align-middle">
                <div className={`d-flex flex-row justify-content-between`}>
                    <MdDeleteOutline onClick={handleDelete} size={30} className={`p-1 hover:text-red-600 cursor-pointer`} style={{ borderRadius: '15px', backgroundColor: '#d1d2d3' }} />
                    <Link to={`/blogs/view/${blog._id}`}>
                        <AiOutlineEye size={30} className={`p-1`} style={{ borderRadius: '15px', backgroundColor: '#d1d2d3' }} />
                    </Link>
                    <Link to={`/blogs/edit/${blog._id}`}>
                        <BiEdit size={30} className={`p-1`} style={{ borderRadius: '15px', backgroundColor: '#d1d2d3' }} />
                    </Link>
                </div>
            </td>

        </tr>
    )
}
export default BlogsRow