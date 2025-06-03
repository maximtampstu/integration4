import { createContext, useContext, useState } from "react";
//https://react.dev/reference/react/createContext
// import { redirect } from "react-router-dom";
import { useNavigate } from "react-router";

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Just a placeholder user store (you'd replace this with a real backend later)
    const [users, setUsers] = useState([
        { id: 1, username:"tester123", email: "test@test.com", password: "1234", subscribed: true }
    ]);

    console.log(users)

    const login = (email, password) => {
        const found = users.find((user) => user.email === email && user.password === password);
        if (found) {
            setUser(found);
            return true;
        }
        return false;
    };

    const signup = (username, email, password, subscribed) => {
        if (users.find((user) => user.email === email)) return false;
        const id = users.length + 1
        const newUser = { id, username, email, password, subscribed };
        setUsers([...users, newUser]);
        setUser(newUser);
        return true;
    };

    const logout = () => {
        setUser(null)
        navigate("/");
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, signup, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
