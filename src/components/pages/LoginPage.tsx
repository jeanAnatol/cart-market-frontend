
import { useState } from "react";
import {Link} from "react-router-dom";
import { login } from "../../services/api.auth";
import {saveToken} from "../auth/token.ts";


export default function LoginPage() {
  // const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const res = await login({ username, password });
      saveToken(res.token);
      window.location.href = "/"; // force refresh
    } catch (err) {
      setError("Invalid credentials");
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-50 p-6 border rounded">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      
      {error && <p className="text-red-600 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded bg-white"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        
        <input
          className="border p-2 rounded bg-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        
        <button className="bg-blue-600 text-white py-2 rounded">
          Login
        </button>
        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
