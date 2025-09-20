import { memo, useState } from "react";
import "./index.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/api";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Verifica role do usuário no Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists() && userSnap.data().role === "admin") {
        navigate("/admin"); // redireciona admins
      } else {
        navigate("/dashboard"); // redireciona usuários normais
      }
    } catch (error) {
      console.error(error.code, error.message);
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="LoginPage">
      <div className="login-form">
        <h2>Welcome back!</h2>
        <form onSubmit={handleSubmit}>
          <p>E-mail address:</p>
          <input
            placeholder="johndoe@email.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
          />
          <p>Password:</p>
          <input
            placeholder="123456"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
          />
          <div className="form-forget">Forgot password?</div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Login</button>
        </form>
        <p>New here?</p>
        <button type="submit"><Link to='/register'>Create New Account</Link></button>
      </div>
    </div>
  );
};

export default memo(LoginPage);
