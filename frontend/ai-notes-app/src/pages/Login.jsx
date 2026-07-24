import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/dashboard");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <>
      <style>{`
        *{
          box-sizing:border-box;
        }

        body{
          margin:0;
        }

        .login-page{
          min-height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          padding:20px;
          background:
            radial-gradient(circle at top left,#4f46e5,transparent 35%),
            radial-gradient(circle at bottom right,#06b6d4,transparent 35%),
            #0f172a;
        }

        .login-card{
          width:100%;
          max-width:430px;

          display:flex;
          flex-direction:column;
          align-items:center;

          padding:40px 35px;

          border-radius:24px;

          background:rgba(255,255,255,0.08);

          backdrop-filter:blur(18px);

          border:1px solid rgba(255,255,255,.12);

          box-shadow:
            0 20px 45px rgba(0,0,0,.45);
        }

        .login-logo{
          width:110px;
          height:110px;
          border-radius:20px;
          object-fit:cover;
          margin-bottom:20px;
          box-shadow:0 0 25px rgba(255,255,255,.2);
        }

        .login-title{
          color:white;
          font-size:2rem;
          margin:0;
        }

        .login-subtitle{
          color:#cbd5e1;
          margin:10px 0 30px;
          text-align:center;
          font-size:.95rem;
        }

        .login-input{
          width:100%;
          padding:14px 16px;
          margin-bottom:16px;

          border:none;
          border-radius:12px;

          background:rgba(255,255,255,.1);
          color:white;

          outline:none;

          transition:.3s;
        }

        .login-input::placeholder{
          color:#cbd5e1;
        }

        .login-input:focus{
          background:rgba(255,255,255,.15);
          box-shadow:0 0 0 2px #60a5fa;
        }

        .login-btn{
          width:100%;
          padding:14px;

          margin-top:10px;

          border:none;
          border-radius:12px;

          font-size:1rem;
          font-weight:bold;

          cursor:pointer;

          color:white;

          background:linear-gradient(
            135deg,
            #3b82f6,
            #2563eb
          );

          transition:.3s;
        }

        .login-btn:hover{
          transform:translateY(-2px);
          box-shadow:0 10px 25px rgba(37,99,235,.45);
        }

        .register-text{
          margin-top:22px;
          color:#cbd5e1;
          text-align:center;
        }

        .register-text a{
          color:#60a5fa;
          text-decoration:none;
          font-weight:bold;
        }

        .register-text a:hover{
          text-decoration:underline;
        }

        @media (max-width:500px){

          .login-card{
            padding:30px 22px;
          }

          .login-logo{
            width:90px;
            height:90px;
          }

          .login-title{
            font-size:1.7rem;
          }
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">

          <img
            src="/noteQuiz.jpg"
            alt="NoteQuiz Logo"
            className="login-logo"
          />

          <h1 className="login-title">
            NoteQuiz AI
          </h1>

          <p className="login-subtitle">
            AI-powered Notes & Quiz Learning Platform
          </p>

          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="login-btn"
            onClick={loginUser}
          >
            Login
          </button>

          <p className="register-text">
            No account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Login;