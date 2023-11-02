import { useRouter } from "next/router";
import React, { useEffect, useState, createContext, useContext } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/auth/status");
        if (response.ok) {
          const { user: userData } = await response.json();

          setUser(userData);
        } else {
          router.push({ pathname: "/login" });
        }
      } catch (err) {
        toast.error("Error authenticating user");
        router.push({ pathname: "/login" });
      } finally {
        setIsLoading(false);
      }
    };

    if (!user) {
      checkIsLoggedIn();
    }
  }, [user]);

  return (
    !isLoading && (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    )
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export default AuthProvider;
