import { useContext, useEffect, useState, useRef } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const [disabled, setDisabled] = useState(true);
    const [captchaText, setCaptchaText] = useState('');
    const captchaRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(3);
    }, [])

    const handleCaptchaInput = (e) => {
        const text = e.target.value;
        setCaptchaText(text);
    }

    const handleValidateCaptcha = () => {
        if (validateCaptcha(captchaText)) {
            setDisabled(false);
            Swal.fire({
                title: "Captcha Validated",
                text: "You can now proceed with login",
                icon: "success"
            });
        } else {
            setDisabled(true);
            Swal.fire({
                title: "Invalid Captcha",
                text: "Please try again",
                icon: "error"
            });
        }
    }

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        // Proceed with login only if captcha is correct
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "User Login Successful",
                    showClass: {
                        popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster
                        `
                    },
                    hideClass: {
                        popup: `
                            animate__animated
                            animate__fadeOutDown
                            animate__faster
                        `
                    }
                });
                navigate(from, { replace: true });

            })
            .catch(error => {
                console.error("Login error:", error);
                Swal.fire({
                    title: "Login Failed",
                    text: error.message,
                    icon: "error"
                });
            });
    }

    return (
    <>
    <Helmet>
        <title>Bistro Boss | Login</title>
    </Helmet>
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">

          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card md:w-1/2 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                <LoadCanvasTemplate />
                </label>
                <input 
                  type="text" 
                  name="captcha" 
                  ref={captchaRef}
                  placeholder="type the captcha above" 
                  className="input input-bordered" 
                  onChange={handleCaptchaInput}
                  required 
                />
                <button 
                  className="btn btn-outline btn-xs mt-2" 
                  onClick={handleValidateCaptcha}
                  type="button"
                >
                  Validate Captcha
                </button>
              </div>
              <div className="form-control mt-6">
                {/* TODO: apply disable for recaptcha */}
                <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
              </div>
            </form>
            <p className='px-6'><small>New Here? <Link to="/signup">Create an account </Link></small></p>
          <SocialLogin></SocialLogin>

          </div>
        </div>

      </div>

    </>
    );
};

export default Login;