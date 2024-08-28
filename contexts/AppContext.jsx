// src/context/AppContext.js
import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [candidateId, setCandidateId] = useState("2");
  const [userId, setUserId] = useState("982de37c-2949-43b4-983b-f224dbf9c3a4");

  return (
    <AppContext.Provider
      value={{ candidateId, setCandidateId, userId, setUserId }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
