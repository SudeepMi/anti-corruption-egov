import React, { useState } from "react";
import "./style.css";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import API from "../../utils/Api";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
function Login() {
const history = useNavigate();
  const [Classes, setClass] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Username, setUsername] = useState("");
    const [isLoading, setLoading] = useState(false);

  const HandleRegister = (e) => {
    e.preventDefault();
    if(Email=="" || Password=="" || Username==""){
        return  toast.error("Fill the form");
    }
    setLoading(true);
    const intToast = toast.loading("Registering")
      API.post("/auth/", {
        username: Username,
        password: Password,
        email: Email,
      }).then(async(res) => {
        console.log(res.data)
          if(res.status === 201){
           
            setLoading(false);
            toast.dismiss(intToast);
            await toast.success("Successfully Registered",{
                closeButton: false,
            })
            await localStorage.setItem("token", res.data.token);
            await localStorage.setItem("user", JSON.stringify(res.data.user));
            history("/");
          }
      }).catch(err => {
        toast.dismiss(intToast);
        toast.error("Registeration Failed",{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            closeButton: false,
        });
      })
    }
      const HandleLogin = (e) => {
          e.preventDefault();
            setLoading(true);
            const intToast = toast.loading("Logging in")
            API.post("auth/login", {
                email: Email,
                password: Password,
            }).then(async(res) => {
                if(res.status === 200){
                    // setSuccess(true);
                    setLoading(false);
                    toast.dismiss(intToast);
                    toast.success("Successfully Logged In",{
                        closeButton: false,
                    })
                    setClass("");
                    setPassword("");
                    setEmail("");
                    setUsername("");
                    await localStorage.setItem("token", res.data.token);
                    await localStorage.setItem("user", JSON.stringify(res.data.user));
                    history("/dashboard");
                    window.location.reload(false)
                }
            }).catch(err => {
                toast.dismiss(intToast);
                toast.error("Login Failed",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    closeButton: false,
                });
            })
      
  }
  return (
    <div className="auth_wrapper">
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <div className={`${Classes} container`} id="container">
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="/social" className="social">
                <i className="fa fa-facebook-f"></i>
              </a>
              <a href="/social" className="social">
                <i className="fa fa-google-plus"></i>
              </a>
              <a href="/social" className="social">
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" required placeholder="Name" name="username"id="username" onChange={(e)=>setUsername(e.target.value)} />
            <input type="email" required placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" required placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={(e)=>HandleRegister(e)}>
                {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="/social" className="social">
                <i className="fa fa-facebook-f"></i>
              </a>
              <a href="/social" className="social">
                <i className="fa fa-google"></i>
              </a>
              <a href="/social" className="social">
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input type="email" required placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" required placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            <a href="/forgot-password">Forgot your password?</a>
            <button onClick={(e)=>HandleLogin(e)}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => setClass("")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>PORTAL</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setClass("right-panel-active")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
