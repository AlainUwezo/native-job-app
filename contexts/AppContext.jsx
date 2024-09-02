// src/context/AppContext.js
import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const candidateTestId = "2";
  const [candidateId, setCandidateId] = useState("");
  const userTestId = "982de37c-2949-43b4-983b-f224dbf9c3a4";
  const [userId, setUserId] = useState("");

  return (
    <AppContext.Provider
      value={{ candidateId, setCandidateId, userId, setUserId }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
