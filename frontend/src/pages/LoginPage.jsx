// step449: we will be having the same format as the signup page here too , so we can copy paste the signup page code here and make some changes in it like replace the signup by login function , isSigningUp by isLoggingIn etc : rest keep almost the same and can paste it here below.

// step450: after this see the next steps in the ChatPage.jsx file now there.
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { 
  MessageCircleIcon, 
  MailIcon, 
  LoaderIcon, 
  LockIcon, 
  EyeIcon,
  EyeOffIcon,
  SparklesIcon 
} from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4 min-h-screen">
        <div className="relative w-full max-w-5xl">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row h-full rounded-2xl overflow-hidden bg-slate-800/70 backdrop-blur-md border border-slate-700/50 shadow-2xl">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-10">
                  <div className="relative inline-block mb-4">
                    <MessageCircleIcon className="w-14 h-14 mx-auto text-cyan-400 mb-2" />
                    <SparklesIcon className="w-5 h-5 absolute -top-1 -right-1 text-yellow-400 fill-yellow-400/20" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400 text-lg">Log in to continue your conversation</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-7">
                  {/* EMAIL INPUT */}
                  <div className="group">
                    <label className="auth-input-label2">Email Address</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon2" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="auth-input2"
                        placeholder="nischaykumar.dev@gmail.com"
                        required
                      />
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div className="group">
                    <label className="auth-input-label2">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon2" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="auth-input2 pr-12"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {/* {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />} */}
                      </button>
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button 
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none"
                    type="submit" 
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <>
                        <LoaderIcon className="w-5 h-5 animate-spin mr-2" />
                        Logging In...
                      </>
                    ) : (
                      "Log In"
                    )}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-slate-400">
                    Don't have an account?{" "}
                    <Link to="/signup" className="auth-link2 font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-800 via-slate-800/90 to-slate-900 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/10 rounded-full -translate-x-16 translate-y-16"></div>
              
              <div className="relative z-10 text-center">
                <img
                  src="/login2.png"
                  alt="People using mobile devices"
                  className="w-4/5 h-auto object-contain mx-auto transform hover:scale-105 transition-transform duration-700"
                />
                <div className="mt-8 text-center">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                    Connect Anytime, Anywhere
                  </h3>
                  <p className="text-slate-400 mt-2 max-w-md mx-auto">
                    Join millions of users who trust our platform for seamless communication
                  </p>

                  <div className="mt-6 flex justify-center gap-3 flex-wrap">
                    <span className="auth-badge2 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Free Forever</span>
                    <span className="auth-badge2 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">Secure</span>
                    <span className="auth-badge2 bg-purple-500/10 text-purple-400 border-purple-500/20">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;
