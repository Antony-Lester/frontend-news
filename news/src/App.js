import './styles/App.css';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react'

import {UserIdContext} from './contexts/userContext'
import Articles from './components/articles';
import Topics from './components/topics';

function App() {
  const [USERID, setUSERID] = useState() //Hard Coded 
  
  return (
    <div className="App">
      <BrowserRouter>
        <UserIdContext.Provider value={{ USERID, setUSERID }}>
          <Routes>
            <Route path='/' element={<Articles/>} />
            <Route path='/topics' element={<Topics/>} />
            <Route path='/topic/:topic_id' element={<Articles/>} />
          </Routes>
        </UserIdContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
