import React, { createContext, useContext, useState } from 'react';

const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
  const [currentSubject, setCurrentSubject] = useState("subject1");

  return (
    <SubjectContext.Provider value={{ currentSubject, setCurrentSubject }}>
      {children}
    </SubjectContext.Provider>
  );
};

export const useSubject = () => useContext(SubjectContext);
