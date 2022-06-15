import { BsTwitter, BsFacebook, BsInstagram, BsPinterest, BsVimeo } from "react-icons/bs"

const Footer = () => {
    return (
        <div>
            <div className=" py-2 bg-sky-100">
            <div className="container-xxl my-8">
                <div className="flex flex-col lg:flex-row justify-between">
                    <div className="space-y-3 py-3">
                        <h1 className="uppercase h5 font-semibold tracking-widest">blogzine</h1>
                        <p className="text-xs text-muted tracking-widest">The next-generation blog, news, and magazine theme for you to start sharing your stories today! </p>
                        <div className="flex text-muted text-sm">
                            <BsTwitter className="me-3" />
                            <BsFacebook className="me-3" />
                            <BsInstagram className="me-3" />
                            <BsPinterest className="me-3" />
                            <BsVimeo className="me-3" />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-20 md: mr-10">

                        <div className="space-y-3 py-3">
                            <h1 className="uppercase h5 font-semibold tracking-widest">Navigation</h1>
                            <div className="text-muted text-xs space-y-1 tracking-wider">
                                <p>Features</p>
                                <p>Style Guide</p>
                                <p>Login</p>
                                <p>Home</p>
                                <p>Blogs</p> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div className="bg-[#343a40] text-center text-white py-7">
                <div className="container-xxl text-xs text-center tracking-widest">
                    <p>© 2022, blogzine. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer