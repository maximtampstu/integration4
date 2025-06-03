import { createContext, useContext, useState } from "react";
import { getUsers, addUser } from "../services/users"; // Adjust path as needed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const users = await getUsers();
      const found = users.find(
        (user) => user.email === email && user.password === password
      );
      if (found) {
        setUser(found);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const signup = async (username, email, password, subscribed) => {
    try {
      const newUser = { username, email, password, subscribed };
      const createdUser = await addUser(newUser);
      setUser(createdUser);
      return true;
    } catch (err) {
      console.error("Signup failed:", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signup, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);