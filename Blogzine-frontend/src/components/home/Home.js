import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import Card from "../card/Card"

const Home = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')))
    // var retrievedObject = 

    // console.log('retrievedObject: ', JSON.parse(retrievedObject));

    // console.log(auth)

    // useEffect(() => {

    //     // const checkUser = async () => {
    //     //     await axios.get('/api/users/check/authentication').then(function (res) {
    //     //         console.log(res)
    //     //         if (!res.data.bool) {
    //     //             navigate('/register')
    //     //         }
    //     //         else {
    //     //             setLoading(false)
    //     //         }
    //     //     })
    //     // }

    //     // checkUser();

    // }, [navigate])

    // if (loading) return <Spinner />
    // else
    if (!auth.user) {
        navigate('/login')
    }
    return (
        <div className="min-h-full flex container-xxl">
            <div className="flex-grow py-14">
                <Card />
            </div>
        </div>
    )
}

export default Home