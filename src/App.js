
import React from 'react';
import {  Routes, Route, Link } from 'react-router-dom';
import EnquiryForm from './EnquiryForm';
import Home from './Home'; 
import "./App.css"

const App = () => {
  return (
    
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/enquiry">Enquiry Form</Link>
            </li>
          </ul>
        </nav>

      
        <Routes>
        <Route exact path="/" element={<Home></Home>} />
        <Route path="/enquiry" element={<EnquiryForm></EnquiryForm>} />
        </Routes>
      </div>
    
  );
};

export default App;
