import { useState } from "react";
import { Navigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const usernameFieldId = "username";
  const passwordFieldId = "password";
  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      setAuthorized(response.ok);
    } catch (err) {
      console.error(err);
    }
  };
  if (authorized) {
    return <Navigate to="/" />;
  }
  return (
    <form onSubmit={handleLoginFormSubmit}>
      <section className="field">
        <label htmlFor={usernameFieldId}>Username</label>
        <input
          required
          value={username}
          onInput={handleUsernameInput}
          type="text"
          id={usernameFieldId}
          autoComplete="username"
        />
      </section>
      <section className="field">
        <label htmlFor={passwordFieldId}>Password</label>
        <input
          required
          value={password}
          onInput={handlePasswordInput}
          type="password"
          autoComplete="current-password"
          id={passwordFieldId}
        />
      </section>
      <button>Login</button>
    </form>
  );
}

export default LoginPage;
