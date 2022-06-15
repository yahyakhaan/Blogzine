import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Modal } from "bootstrap"


const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modal, setModal] = useState(null)

    useEffect(() => {

        // const checkUser = async () => {
        //     await axios.get('/api/users/check/authentication').then(function (res) {
        //         // console.log(res)
        //         if (res.data.bool === true) {
        //             navigate("/")
        //         }
        //     }).catch(function (err) {
        //         console.log(err)
        //     })
        // }

        // checkUser();

        const myModal = new Modal(document.getElementById('login'), {
            keyboard: false
        })
        setModal(myModal)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/api/auth/login", {
            email: email,
            password: password,
        })
            .then(function (response) {
                console.log(response);
                localStorage.setItem('auth', JSON.stringify(response.data));
                setEmail("")
                setPassword("")
                navigate("/")
                // modal.show()
            })
            .catch(function (error) {
                alert(error.response.data.message);
            });
    }

    return (
        <div>
            <div className="container-xxl min-h-screen flex justify-center items-center">
                <div className="">
                    <div style={{ backgroundColor: '#e8effd' }} className="p-5 rounded">

                        <h2 className="h2 fw-bold text-center uppercase tracking-widest mt-5 mb-20 ">Log in to your Account</h2>

                        <form className="mt-4" onSubmit={handleSubmit}>

                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput1" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" required />
                                <label for="floatingInput1">Email Address</label>
                            </div>

                            <div class="form-floating mb-5">
                                <input type="password" class="form-control" id="floatingInput2" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <label for="floatingInput2">Password</label>
                            </div>

                            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between mb-4">
                                <div>
                                    <button className="btn btn-outline-dark uppercase rounded-none tracking-widest text-sm" type="submit">Sign me</button>
                                </div>

                                <div>
                                    <div className="text-muted d-flex flex-row align-items-center" >
                                        <span>Don't have an account?</span>
                                        <Link to={'/register'}>
                                            <p className="hover:underline hover:underline-offset-1 fw-bold uppercase rounded-none tracking-widest text-sm p-2" type="submit">Sign up</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="login" tabindex="-1" aria-labelledby="loginLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title uppercase fw-bold tracking-widest" id="loginLabel">Attention!</h5>

                        </div>
                        <div class="modal-body text-center">
                            The Account has been created <b className="uppercase tracking-wide text-blue-600 mx-2">sign in</b> to proceed futher
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-primary px-4 tracking-wider" onClick={() => modal.hide()}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login;