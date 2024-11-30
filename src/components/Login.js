import { auth } from "./Firebase";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInwithGoogle from "./SignInWithGoogle";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3 style={styles.header}>Login</h3>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </div>

        <p style={styles.textCenter}>
          New user? <a href="/register" style={styles.link}>Register Here</a>
        </p>
        <SignInwithGoogle />
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    padding: "20px",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "40px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
    color: "#167bff",
    fontSize: "28px",
    fontWeight: "600",
  },
  formGroup: {
    marginBottom: "24px",
  },
  label: {
    display: "block",
    fontSize: "15px",
    color: "#495057",
    marginBottom: "8px",
    fontWeight: "500",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ced4da",
    width: "100%",
    fontSize: "14px",
    transition: "border-color 0.3s",
    outline: "none",
    "&:focus": {
      borderColor: "#167bff",
    },
  },
  buttonContainer: {
    marginTop: "32px",
  },
  button: {
    padding: "12px",
    width: "100%",
    backgroundColor: "#167bff",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "500",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
  textCenter: {
    textAlign: "center",
    marginTop: "24px",
    fontSize: "14px",
    color: "#6c757d",
  },
  link: {
    color: "#167bff",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.3s",
    "&:hover": {
      color: "#0056b3",
      textDecoration: "underline",
    },
  },
};

export default Login;
