import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={{ height: '100vh' }}>
        <Routes>
          <Route path="/chat" element={
            <iframe 
              src="http://localhost:3002" 
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          } />
          <Route path="/*" element={
            <iframe 
              src="http://localhost:3001" 
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;