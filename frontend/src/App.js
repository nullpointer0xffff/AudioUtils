import React from 'react';
import Home from './components/Home';
import { AudioProvider } from './components/AudioContext';

const App = () => {
  return (
    <AudioProvider>
      <Home />
    </AudioProvider>
  );
};

export default App;
