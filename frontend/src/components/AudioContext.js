import React, { createContext, useState, useContext } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const [audioURL, setAudioURL] = useState(null);

  return (
    <AudioContext.Provider value={{ audioURL, setAudioURL }}>
      {children}
    </AudioContext.Provider>
  );
};
