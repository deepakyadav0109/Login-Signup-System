import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Registration from './Components/Registration';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Login from './Components/Login';
import Verification from './Components/verification';
import process from 'process';
window.process = process;

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
  },
  {
    path:"registration",
    element:<Registration/>,
  },
  {
    path:"login",
    element:<Login/>,
  },
  {
    path:"verification",
    element:<Verification/>,
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);

fetch('/.netlify/functions/getData')
  .then(response => response.json())
  .then(data => console.log(data));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
