import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const LoginModal = ({ onClose }) => {
    const { login, signup } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("test@test.com");
    const [password, setPassword] = useState("1234");
    const [subscribed, setSubscribed] = useState(false);
    const [error, setError] = useState("");
    const [mode, setMode] = useState("login"); // or "signup"

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = mode === "login" ? login(email, password) : signup(username, email, password, subscribed);
        if (!success) {
            setError(mode === "login" ? "Invalid credentials" : "User already exists");
        } else {
            onClose("done");
        }
    };
    
    return (
        <div style={styles.backdrop}>
            <div style={styles.modal}>
                <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
                <form onSubmit={handleSubmit}>
                    {mode != "login" ? <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" /> : null}
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {mode != "login" ? <label ><input type="checkbox" value={subscribed} onChange={(e) => setSubscribed(!subscribed)} /> Recieve updates</label> : null}
                    <button type="submit">{mode === "login" ? "Login" : "Sign Up"}</button>
                </form>
                <div>
                    {mode === "login" ? "No account?" : "Already have an account?"}{" "}
                    <button onClick={() => setMode(mode === "login" ? "signup" : "login")}>
                        {mode === "login" ? "Sign up" : "Login"}
                    </button>
                </div>
                <button onClick={onClose}>Back</button>
            </div>
        </div>
    );
};

const styles = {
    backdrop: {
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        background: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        minWidth: "300px"
    }
};

export default LoginModal;
