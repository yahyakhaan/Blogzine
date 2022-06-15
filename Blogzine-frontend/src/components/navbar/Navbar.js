import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Navbar = () => {

    const [y, setY] = useState(null);
    // const [session, setSession] = useState(false);
    const navigate = useNavigate();
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')))

    useEffect(() => {
        setY(window.scrollY);

        // const checkUser = async () => {
        //     await axios.get('/api/users/check/authentication').then((res) => {
        //         console.log(res)
        //         setSession(res.data);
        //     }).catch(function (err) {
        //         console.log(err)
        //     })
        // }

        const handleNavigation = e => {
            const window = e.currentTarget;
            setY(window.scrollY);

        };

        // checkUser();
        setAuth(JSON.parse(localStorage.getItem('auth')))

        window.addEventListener("scroll", handleNavigation);

        return (() => {
            window.removeEventListener("scroll", handleNavigation);
        });
    }, []);

    const handleClick = async () => {
        // await axios.get('/api/users/destroy/authentication').then(function (res) {
        //     console.log(res)
        // })
        // setSession(false);
        // setLoading(true)
        setAuth(null)
        localStorage.setItem('auth', JSON.stringify(null));
        navigate('/login')
    }

    return (
        <div className="container-xxl">
            <div className={`navbar navbar-expand-lg navbar-light p-2 ${y > 50 && 'fixed-top bg-white shadow-[2px_1px_10px_4px_rgba(0,0,0,0.3)]'}`}>
                <div className="navbar-brand cursor-pointer" >
                    <Link to={'/'}>
                        <p className="tracking-[0.2rem] text-2xl font-bold uppercase">blogzine</p>
                    </Link>
                </div>


                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse lg:flex lg:justify-end" id="navbarSupportedContent">
                    <div className="navbar-nav mb-2 mb-lg-0 flex align-items-center">
                        {
                            auth &&
                            (
                                <>
                                    <li className="nav-item">
                                        <Link to={`/blogs/${auth.user._id}`}>
                                            {/* <Link to={`/blogs/123`}> */}
                                            <p className="nav-link tracking-widest mb-1 lg:mb-0 lg:mr-1 cursor-pointer" aria-current="page" href="/products">My Blogs</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <p className="nav-link tracking-widest mb-1 lg:mb-0 lg:mr-1 cursor-pointer" onClick={handleClick}>Logout</p>
                                    </li>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Navbar