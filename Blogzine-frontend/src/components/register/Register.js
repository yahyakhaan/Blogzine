import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Modal } from "bootstrap"


const Register = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [modal, setModal] = useState(null)

    useEffect(() => {

        // const checkUser = async () => {
        //     await axios.get('/api/users/check/authentication').then(function (res) {

        //         if (res.data.bool === true) {
        //             navigate("/")
        //         }
        //     }).catch(function (err) {
        //         console.log(err)
        //     })
        // }

        // checkUser();

        const myModal = new Modal(document.getElementById('register'), {
            keyboard: false
        })
        setModal(myModal)
    }, [navigate])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/api/auth/register", {
            username: name,
            email: email,
            password: password
        })
            .then(function (response) {
                console.log(response);
                setName("")
                setEmail("")
                setPassword("")
                modal.show()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <div className="container-xxl min-h-screen flex justify-center items-center pt-14">
                <div className="">
                    <div style={{ backgroundColor: '#e8effd' }} className="p-5 rounded">

                        <h2 className="h2 fw-bold text-center uppercase tracking-widest mt-5 mb-20 ">Create your free account</h2>

                        <form className="mt-4" onSubmit={handleSubmit}>

                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="floatingInput4" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" required />
                                <label for="floatingInput4">Name</label>
                            </div>

                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput5" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" required/>
                                <label for="floatingInput5">Email Address</label>
                            </div>

                            <div class="form-floating mb-5">
                                <input type="password" class="form-control" id="floatingInput6" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                <label for="floatingInput6">Password</label>
                            </div>

                            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between mb-4">
                                <div>
                                    <button className="btn btn-outline-dark uppercase rounded-none tracking-widest text-sm" type="submit">Sign me up</button>
                                </div>

                                <div>
                                    <div className="text-muted d-flex flex-row align-items-center" >
                                        <span>Have an account?</span>
                                        <Link to={'/login'}>
                                            <p className="hover:underline hover:underline-offset-1 fw-bold uppercase rounded-none tracking-widest text-sm p-2" type="submit">Sign in</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="register" tabindex="-1" aria-labelledby="registerLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title uppercase fw-bold tracking-widest" id="registerLabel">Attention!</h5>
                   
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

export default Register;