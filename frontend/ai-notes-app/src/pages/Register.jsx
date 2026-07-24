import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log(error);
      alert("Registration failed");
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

        .register-page{
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

        .register-card{
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

          box-shadow:0 20px 45px rgba(0,0,0,.45);
        }

        .register-logo{
          width:110px;
          height:110px;
          border-radius:20px;
          object-fit:cover;
          margin-bottom:20px;
          box-shadow:0 0 25px rgba(255,255,255,.2);
        }

        .register-title{
          color:white;
          font-size:2rem;
          margin:0;
        }

        .register-subtitle{
          color:#cbd5e1;
          margin:10px 0 30px;
          text-align:center;
          font-size:.95rem;
        }

        .register-input{
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

        .register-input::placeholder{
          color:#cbd5e1;
        }

        .register-input:focus{
          background:rgba(255,255,255,.15);
          box-shadow:0 0 0 2px #60a5fa;
        }

        .register-btn{
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

        .register-btn:hover{
          transform:translateY(-2px);
          box-shadow:0 10px 25px rgba(37,99,235,.45);
        }

        .login-text{
          margin-top:22px;
          color:#cbd5e1;
          text-align:center;
        }

        .login-text a{
          color:#60a5fa;
          text-decoration:none;
          font-weight:bold;
        }

        .login-text a:hover{
          text-decoration:underline;
        }

        @media (max-width:500px){

          .register-card{
            padding:30px 22px;
          }

          .register-logo{
            width:90px;
            height:90px;
          }

          .register-title{
            font-size:1.7rem;
          }
        }
      `}</style>

      <div className="register-page">
        <div className="register-card">

          <img
            src="/noteQuiz.jpg"
            alt="NoteQuiz Logo"
            className="register-logo"
          />

          <h1 className="register-title">
            Create Account
          </h1>

          <p className="register-subtitle">
            Join NoteQuiz AI and start learning smarter.
          </p>

          <input
            className="register-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="register-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="register-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="register-btn"
            onClick={registerUser}
          >
            Create Account
          </button>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Register;