import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../hook/useAuth";
import useAxiosPublic from "../hook/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {googleSignIn} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result => {
            // console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                // console.log(res.data);
                navigate('/');
            } )
        })
    }

    return (
        <div className="p-8 ">
            <div className="divider"></div>
            <div >
                <button  onClick={handleGoogleSignIn} className="btn mb-2 w-[300px] bg-green-600 rounded-full text-white">
                    <FaGoogle className="mr-2"></FaGoogle>
                    Google

                </button>
                <br />
                <button  className="btn mb-2 w-[300px] bg-orange-500 rounded-full text-white">
              <FaFacebook></FaFacebook>
                    Facebook

                </button>
                   <br />
                <button className="btn w-[300px] rounded-full bg-pink-500 text-white">
                <FaGithub></FaGithub>
                    Github
                </button>
                   
            </div>
        </div>
    );
};

export default SocialLogin;