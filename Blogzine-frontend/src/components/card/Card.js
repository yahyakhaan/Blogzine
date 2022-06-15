import axios from "axios";
import { useState, useEffect } from "react";
import CardItem from "./CardItem";
import { MdArrowLeft, MdArrowRight } from "react-icons/md"

const Card = () => {
    const [pages, setPages] = useState([]);

    const [cards, setCards] = useState(null);
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')))

    useEffect(() => {
        const blogs = async () => {
            await axios.get('/api/blogs?p=1', {
                headers: {
                    token: 'Bearer ' + auth.token
                }
            }).then(function (res) {
                // console.log(res.data)
                setCards(res.data.blogs)
                setPages(res.data.pages)
            })
        }
        blogs()

    }, [])

    const handleClick = (e) => {
        const val = e.target.value
        const blogs = async () => {
            await axios.get(`/api/blogs?p=${val}`).then(function (res) {
                setCards(res.data.blogs)
            })
        }
        blogs()
    }

    return (
        <div>
            <div>
                <div className="text-center text-4xl tracking-wider uppercase font-bold py-10">
                    Blogs
                </div>

                <div className="">

                    <hr />
                    <div className="">
                        {
                            cards && cards.map((c, i) => (
                                <>
                                    {
                                        i !== 0 && <hr key={'213'} className="" />
                                    }
                                    <CardItem key={c._id} id={c._id} title={c.title} date={c.createdAt.substring(0, 10)} text={c.desc} author={c.author} />
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="text-center my-5">
                <div
                    className="btn-toolbar hidden lg:flex items-center justify-center mt-10"
                    role="toolbar"
                    aria-label="Toolbar with button groups"
                >
                    <div className="btn-group me-2 flex items-center" role="group" aria-label="First group">
                        <MdArrowLeft className="text-2xl" />
                        {
                            [...Array(pages)].map((page, i) => (
                                <button
                                    type="button"
                                    value={i + 1}
                                    className="btn bg-[#f0f0f0] border-[1px] rounded-none border-gray-300"
                                    onClick={handleClick}
                                >
                                    {i + 1}
                                </button>
                            ))
                        }
                        <MdArrowRight className="text-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;