import React, { useContext, useState, useEffect } from "react";
import { getUserMunicipio } from "./api/user";
import { auth } from "./firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  async function getCurrentUser(user) {
    let userMunicipio = null;
    try {
      const rawUser = await getUserMunicipio(user.email);
      userMunicipio = {
        ...user,
        userId: rawUser.id,
        userRole: rawUser.municipalRoleCode.toLowerCase(),
        name: rawUser.name,
        surname: rawUser.surname,
        completeName: `${rawUser.name} ${rawUser.surname}`,
        idMunicipalRole: rawUser.idMunicipalRole,
      };
    } catch (err) {
      // Al llegar a este error firebase nunca va a autenticar al usuario
      console.log("getCurrentUser ERR", err.message);
    }
    return userMunicipio;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      let userMunicipal = null;
      if (!!user) {
        userMunicipal = await getCurrentUser(user);
      }
      setCurrentUser(userMunicipal);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
