import React from "react";

export const SessionContext = React.createContext(getSession());

export function getSession() {
  // TODO hacer todo lo de login aca
  return {
    email: "",
    userName: "",
    userLastName: "",
    role: "analista",
  };
}
