import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import your pages/components here

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Example route */}
        <Route path="/" element={<div>Dream Journal Home</div>} />
        {/* Add your other routes here */}
      </Routes>
    </BrowserRouter>
  );
}
