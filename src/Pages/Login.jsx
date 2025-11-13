import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 eye icons import
import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
  const { loginUser, signInWithgoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // 👇 AOS init
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    setError("");

    loginUser(email, password)
      .then(() => {
        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setError("");
    signInWithgoogle()
      .then(() => {
        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  return (
    <div
      className="flex justify-center mx-auto min-h-screen items-center"
      data-aos="fade-up"
    >
      <div
        className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
        data-aos="zoom-in"
      >
        <h1 className="text-4xl text-center text-red-600 font-bold" data-aos="fade-right">
          Login now!
        </h1>
        <div className="card-body">
          <form onSubmit={handleLogin}>
            <fieldset className="fieldset">
              {error && (
                <p className="text-red-500 text-xs mb-2" data-aos="fade-left">
                  {error}
                </p>
              )}
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input w-full"
                placeholder="Email"
                required
                data-aos="fade-up"
              />

              <label className="label">Password</label>
              <div className="relative" data-aos="fade-up">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input w-full pr-10"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div data-aos="fade-up">
                <a className="link link-hover">Forgot password?</a>
              </div>

              <button className="btn btn-neutral  bg-red-600 text-black font-semibold shadow-md hover:bg-black hover:text-white transition duration-300 mt-4" disabled={loading} data-aos="fade-up">
                {loading ? "Logging in..." : "Login"}
              </button>

              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="btn bg-white text-black border-[#e5e5e5] mt-2"
                data-aos="fade-up"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>

              {/* Register link */}
              <p className="font-semibold text-center pt-4" data-aos="fade-up">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-red-600 hover:text-red-900"
                >
                  Register
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
