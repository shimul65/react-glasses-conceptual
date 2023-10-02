import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    //show password
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = (e) => {

        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        //create new user
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User Sign In Successfully')
                navigate('/');
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorCode, errorMessage);
            })

    }

    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" placeholder="email" className="input input-bordered" name='email' />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="w-1/2 relative ">
                                        <input type={showPass ? "text" : "password"}
                                            placeholder="password" className="input input-bordered" name='password' />
                                        <span onClick={() => setShowPass(!showPass)} className="absolute top-4 -right-14 ">
                                            {
                                                showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                            }</span>
                                    </div>
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6 p-0">
                                    <button className="btn btn-neutral" type='submit'>Login</button>
                                </div>
                                <label className="label">
                                    New here? <Link to="/register" className="label-text-alt link link-hover">Create an account</Link>
                                </label>
                                <SocialLogin />
                            </div></form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;