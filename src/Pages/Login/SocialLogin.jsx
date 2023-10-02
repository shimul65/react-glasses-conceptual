import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { AuthContext } from "../../providers/AuthProviders";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const SocialLogin = () => {

    const navigate = useNavigate();

    const { googleLogin, githubLogin } = useContext(AuthContext);

    const handleSocialLogin = (media) => {
        media()
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
            <div className="divider">continue with</div>
            <div className="flex justify-center gap-3">
                <button onClick={() => handleSocialLogin(googleLogin)} className="btn text-3xl"><FcGoogle></FcGoogle></button>
                <button onClick={() => handleSocialLogin(githubLogin)} className="btn text-3xl"><BsGithub></BsGithub></button>
            </div>
        </>
    );
};

export default SocialLogin;