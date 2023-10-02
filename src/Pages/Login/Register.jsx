import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { updateProfile } from 'firebase/auth';

const Register = () => {

    const { createUser, handleUpdateProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    //show password
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = (e) => {

        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.abc.value;
        const password = e.target.password.value;
        const img = e.target.img.value;
        const accepted = e.target.terms.checked;
        console.log(name, img, email, password, accepted);

        // validation check
        if (password.length < 6) {
            toast.error('Password should be at least 6 characters or longer');
            return
        }
        else if (!/[A-Z]/.test(password)) {
            toast.error('Your Password should contain an uppercase letter')
            return;
        }
        else if (!accepted) {
            toast.error('Please accept our terms & conditions');
            return;
        }

        //create new user
        createUser(email, password)
            .then(result => {
                const user = result.user;

                // update profile
                handleUpdateProfile(name, img)
                    .then(() => {
                        toast.success('User Sign Up Successfully')
                        navigate('/');
                    }).catch((error) => {
                        console.log(error);
                    });
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
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit} action="">
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input type="text" placeholder="Full name" className="input input-bordered" name='name' />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" className="input input-bordered" name='abc' />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Image Url</span>
                                    </label>
                                    <input type="text" placeholder="image url" className="input input-bordered" name='img' />
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
                                </div>
                                <div className='mt-4 flex gap-2 items-center'>
                                    <input type="checkbox" name="terms" id="terms" />
                                    <label htmlFor="terms">Accept Our Terms and Conditions</label>
                                </div>
                                <div className="form-control  mt-6 p-0">
                                    <button type='submit' className="btn btn-neutral">Register</button>
                                </div>
                                {/* {
                                    error && <p className="text-2xl text-red-600">{error}</p>
                                }
                                {
                                    success && <p className="text-2xl text-green-600">{success}</p>
                                } */}
                                <label className="label">
                                    Have an account? <Link to="/login" className="label-text-alt link link-hover">Please Login</Link>
                                </label>
                                <SocialLogin />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;