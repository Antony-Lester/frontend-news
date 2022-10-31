import './styles/App.css';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react'

import {UserIdContext} from './contexts/userContext'
import Articles from './components/articles';

function App() {
  const [USERID, setUSERID] = useState() //Hard Coded 
  const [currentPage, setCurrentPage] = useState('articles')

  return (
    <div className="App">
      <BrowserRouter>
        <UserIdContext.Provider value={{ USERID, setUSERID }}>
          <Routes>
            <Route path='/' element={<Articles setCurrentPage={setCurrentPage}/>} />
          </Routes>
        </UserIdContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
