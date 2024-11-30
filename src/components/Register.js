import { auth, db } from "./Firebase";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: ""
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.form}>
        <h3 style={styles.header}>Sign Up</h3>

        <div style={styles.formGroup}>
          <label style={styles.label}>First name</label>
          <input
            type="text"
            placeholder="First name"
            onChange={(e) => setFname(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Last name</label>
          <input
            type="text"
            placeholder="Last name"
            onChange={(e) => setLname(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email address</label>
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </div>

        <p style={styles.textCenter}>
          Already registered? <a href="/login" style={styles.link}>Login</a>
        </p>
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
    outline: "none",
    transition: "border-color 0.3s",
  },
  buttonContainer: {
    marginTop: "32px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#167bff",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "500",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
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
  },
};

export default Register;
