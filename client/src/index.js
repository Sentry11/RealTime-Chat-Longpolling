import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React Strict mode comented because in this mode react re-rendered twice as a result
  // message are duplicated. In prodaction this bug non-exist
  // <React.StrictMode>
    <App />
  // {/* </React.StrictMode> */}
);
