import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClickGame from './ClickGame';
import VideoUpload from './VideoUpload';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClickGame />} />
        <Route path="/upload" element={<VideoUpload />} />
      </Routes>
    </Router>
  );
};

export default App;