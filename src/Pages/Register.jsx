import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const Register = () => {
  const { createUser, signInWithgoogle } = useContext(AuthContext);
  const [nameError, setNamerror] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSingUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.Photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (name.length < 5) {
      setNamerror('Name should be more than 5 characters');
      return;
    } else {
      setNamerror('');
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    if (!hasUppercase) {
      setPasswordError('Password must have at least one uppercase letter');
      return;
    } else if (!hasLowercase) {
      setPasswordError('Password must have at least one lowercase letter');
      return;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    } else {
      setPasswordError('');
    }

    setLoading(true);

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        import('firebase/auth').then(({ updateProfile }) => {
          updateProfile(user, { displayName: name, photoURL: photo })
            .then(() => {
              const newUser = { name, email, image: photo };

              fetch('https://travelease-server-side.vercel.app/users', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(newUser),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log('User saved in DB:', data);
                  setLoading(false);
                  navigate('/');
                })
                .catch((err) => {
                  console.error(err);
                  setLoading(false);
                });
            })
            .catch((error) => {
              console.error(error);
              setLoading(false);
            });
        });
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithgoogle()
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        fetch('https://travelease-server-side.vercel.app/users', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('Google user saved in DB:', data);
            navigate('/');
          })
          .catch((err) => console.error(err));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex justify-center mx-auto min-h-screen items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
      >
        <h1 className="text-4xl text-center text-red-600 font-bold">Register now!</h1>
        <div className="card-body">
          <form onSubmit={handleSingUp}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                className="input w-full "
                placeholder="Your Name"
                required
              />
              {nameError && <p className="text-xs text-error">{nameError}</p>}

              <label className="label">Photo URL</label>
              <input
                name="Photo"
                type="text"
                className="input w-full "
                placeholder="Photo URL"
                required
              />

              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input w-full "
                placeholder="Email"
                required
              />

              <label className="label">Password</label>
              <div className="relative">
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

              {passwordError && (
                <p className="text-xs text-error">{passwordError}</p>
              )}

              <button className="btn btn-neutral  bg-red-600 text-black font-semibold shadow-md hover:bg-black hover:text-white transition duration-300 mt-4" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="btn bg-white text-black border-[#e5e5e5] mt-2"
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
                Continue with Google
              </button>

              <p className="font-semibold text-center pt-4">
                Already Have an Account?{' '}
                <Link to="/login" className="text-red-600 hover:text-red-900">
                  Login
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
