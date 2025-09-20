import { memo, useState } from "react";
import "./index.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Salva o nome e role no Firestore
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: user.email,
          role: "user", // por padrão, todos os novos usuários são "user"
        });

        setSuccessMessage("Usuário registrado com sucesso!");
        setErrorMessage("");
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setSuccessMessage("");
      });
  };

  return (
    <div className="RegisterPage">
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          Name:
          <br />
          <input
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
          />
          <br />
          E-mail address:
          <br />
          <input
            placeholder="johndoe@email.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
          />
          <br />
          Password:
          <br />
          <input
            placeholder="123456"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
          <div className="register-forget">Forgot password?</div>
          <button>Create an Account</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </form>
        <p>Already registered?</p>
        <button><Link to='/login'>Login</Link></button>
      </div>
    </div>
  );
};

export default memo(RegisterPage);
