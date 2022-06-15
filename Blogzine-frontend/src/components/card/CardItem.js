import { BsDot } from "react-icons/bs"
import { Link } from "react-router-dom";

const CardItem = ({ title, date, text, author, id }) => {

    return (
        <div className="p-4 hover:bg-black hover:bg-opacity-5 cursor-pointer">
            <div className="flex flex-col lg:flex-row justify-between">
                <div className="mb-3">
                    <div className="flex flex-col lg:flex-row">
                        <div className="flex">
                            <strong className="mr-3 mb-2 lg:mb-0 hover:underline underline-offset-1 hover:text-black text-2xl cursor-pointer">{title}</strong>
                        </div>
                    </div>
                    <div>
                        <p className="text-[15px]">{text}</p>
                    </div>
                    <div className="flex mt-3">
                        <span className="mr-3 mb-1 lg:mb-3 text-sm whitespace-nowrap">{author}</span>
                        <span><BsDot /></span>
                        <span className="ml-3 mb-1 lg:mb-3 text-sm whitespace-nowrap">{date}</span>
                    </div>
                </div>
                <Link className="" to={`/blogs/view/${id}`}>
                    <button className={`w-full lg:h-full lg:p-6 btn btn-outline-dark uppercase rounded-none tracking-widest text-sm`}>View</button>
                </Link>
            </div>
        </div>
    )
}

export default CardItem