import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {
  const { createUser, signInWithgoogle, user } = useContext(AuthContext);
  const [nameError, setNamerror] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSingUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.Photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // Name validation
    if (name.length < 5) {
      setNamerror("Name should be more than 5 characters");
      return;
    } else {
      setNamerror("");
    }

    // Password validation
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    if (!hasUppercase) {
      setPasswordError("Password must have at least one uppercase letter");
      return;
    } else if (!hasLowercase) {
      setPasswordError("Password must have at least one lowercase letter");
      return;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    } else {
      setPasswordError("");
    }

    setLoading(true);

    // Firebase create user
    createUser(email, password)
      .then((result) => {
        const user = result.user;

        // Update profile
        import("firebase/auth").then(({ updateProfile }) => {
          updateProfile(user, { displayName: name, photoURL: photo })
            .then(() => {
              // MongoDB এ save করা
              const newUser = {
                name,
                email,
                image: photo,
              };

              fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(newUser),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log("User saved in DB:", data);
                  setLoading(false);
                  navigate("/"); // Registration successful → home
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

        // Google sign-in user save in MongoDB
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Google user saved in DB:", data);
            navigate("/"); // Redirect after Google sign-in
          })
          .catch((err) => console.error(err));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex justify-center mx-auto min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-4xl text-center font-bold">Register now!</h1>
        <div className="card-body">
          <form onSubmit={handleSingUp}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                className="input"
                placeholder="Your Name"
                required
              />
              {nameError && <p className="text-xs text-error">{nameError}</p>}

              <label className="label">Photo URL</label>
              <input
                name="Photo"
                type="text"
                className="input"
                placeholder="Photo URL"
                required
              />

              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
                required
              />

              <label className="label">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type="password"
                  className="input pr-10"
                  placeholder="Password"
                  required
                />
              </div>
              {passwordError && (
                <p className="text-xs text-error">{passwordError}</p>
              )}

              <button className="btn btn-neutral mt-4" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>

              {/* Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="btn bg-white text-black border-[#e5e5e5] mt-2"
              >
                Continue with Google
              </button>

              <p className="font-semibold text-center pt-4">
                Already Have an Account?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-700"
                >
                  Login
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
