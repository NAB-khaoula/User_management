import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Login42 from 'react-42-login';

const clientID = process.env.INTRA_CLIENT_ID;

const secret = process.env.INTRA_SECRET;
const callbackURL = process.env.INTRA_CALLBACK_URL;

const log = (response) => {
  console.log(response);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Login42
  //   clientId={clientID}
  //       onFailure={log}
  //       onSuccess={log}
  //       route="/api42"
  //       redirectUri={callbackURL}
  //       >
  <React.StrictMode>

    <App />
  </React.StrictMode>
  // </Login42>
);

reportWebVitals();