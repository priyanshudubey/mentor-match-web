import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginClick = async (e) => {
    e.preventDefault();
    setError("");

    // If signup flow, first create account then login
    if (isSignup) {
      try {
        await axios.post(
          `${BASE_URL}signup`,
          { firstName, lastName, emailId, password },
          { withCredentials: true }
        );
        // after successful signup, auto-login user
        const response = await axios.post(
          `${BASE_URL}login`,
          { emailId, password },
          { withCredentials: true }
        );
        dispatch(addUser(response.data.user));
        // redirect to profile and open edit mode so user can complete their profile
        navigate("/profile", { state: { openEdit: true } });
      } catch (err) {
        console.log(err);
        setError(err?.response?.data || err.message || "Signup failed");
      }
      return;
    }

    // Login Flow
    try {
      const response = await axios.post(
        `${BASE_URL}login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(response.data.user));
      navigate("/feed");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      {/* Main Card Container */}
      <div className="flex w-full max-w-5xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden">
        {/* --- LEFT SIDE: Landing Page Content (Visible on Desktop) --- */}
        <div className="hidden md:flex flex-col justify-center w-1/2 bg-indigo-700 p-12 text-white relative">
          <img
            src="/mmn-logo.png"
            alt="Mentor Match logo"
            className="h-36 w-36 object-contain flex content-center mx-auto mb-4 md:mb-4"
          />
          <div className="z-10">
            <h1 className="text-5xl font-bold mb-4 tracking-tight">
              Mentor Match
            </h1>
            <p className="text-indigo-200 text-lg mb-8">
              Unlock your coding potential. Connect with industry experts who
              have been in your shoes.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-indigo-600 p-2 rounded-lg">🚀</span>
                <span className="font-medium">1-on-1 Expert Guidance</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-indigo-600 p-2 rounded-lg">🤝</span>
                <span className="font-medium">Real-world Code Reviews</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-indigo-600 p-2 rounded-lg">💼</span>
                <span className="font-medium">Career Roadmap Planning</span>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-indigo-500/30">
              <p className="italic text-indigo-300">
                "The best way to learn is to learn from those who have already
                mastered the craft."
              </p>
            </div>
          </div>

          {/* Decorative Circle in Background */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        {/* --- RIGHT SIDE: Login/Signup Form --- */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-base-100 flex flex-col justify-center">
          {/* Mobile Header (Only shows on small screens) */}
          <div className="md:hidden text-center mb-6">
            <h2 className="text-3xl font-bold text-primary">Mentor Match</h2>
            <p className="text-base-content/60">Find your mentor today.</p>
          </div>

          <fieldset className="fieldset w-full bg-base-100">
            <legend className="fieldset-legend text-2xl font-bold text-base-content mb-4 text-center w-full border-b pb-2 border-base-200">
              {isSignup ? "Create Account" : "Welcome Back"}
            </legend>

            <div className="flex justify-center mb-6">
              <p className="text-sm text-base-content/70">
                {isSignup ? "Already have an account?" : "New to Mentor Match?"}
                <button
                  className="link link-primary font-semibold ml-1"
                  onClick={() => setIsSignup((s) => !s)}>
                  {isSignup ? "Login here" : "Create account"}
                </button>
              </p>
            </div>

            {isSignup && (
              <div className="grid grid-cols-2 gap-4">
                <label className="floating-label mb-3">
                  <span>First Name</span>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="floating-label mb-3">
                  <span>Last Name</span>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>
            )}

            <label className="floating-label mb-3 w-full">
              <span>Email Address</span>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="developer@example.com"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            <label className="floating-label mb-6 w-full">
              <span>Password</span>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {error && (
              <div className="alert alert-error text-sm py-2 mb-4">
                <span>{error}</span>
              </div>
            )}

            <button
              className="btn btn-primary w-full text-lg"
              onClick={handleLoginClick}>
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Login;
