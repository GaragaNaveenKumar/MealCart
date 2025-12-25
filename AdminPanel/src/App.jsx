import React from 'react'
import Navbar from './Components/Navbar/Navbar.jsx';
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import {Route, Routes} from "react-router-dom";
import Add from './Pages/Add/Add.jsx';
import List from './Pages/List/List.jsx';
import Ordres from './Pages/Orders/Ordres.jsx';


const App = () => {

  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes >
          <Route path='/add' element={<Add/>}/>
          <Route path='/list' element={<List/>}/>
          <Route path='/orders' element={<Ordres/>}/>
        </Routes>
      </div>
      
    </div>
  )
}

export default App
