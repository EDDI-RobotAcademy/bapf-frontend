import React from 'react';
import { useLocation } from 'react-router-dom';

const SnackAppWrapper: React.FC = () => {
  const location = useLocation();
  
  // mfe-container의 현재 경로를 snack 앱에 전달
  const snackUrl = `http://localhost:3000${location.pathname}${location.search}`;
  
  return (
    <iframe
      src={snackUrl}
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
        margin: 0,
        padding: 0
      }}
      title="Snack App"
    />
  );
};

export default SnackAppWrapper;