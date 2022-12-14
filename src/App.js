import './styles/App.css';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react'

import {UserIdContext} from './contexts/userContext'
import Articles from './components/articles';
import Topics from './components/topics';
import Article from './components/article';

function App() {
  const [USERID, setUSERID] = useState('grumpy19') //Hard Coded USER 
  
  return (
    <div className="App">
      <BrowserRouter>
        <UserIdContext.Provider value={{ USERID, setUSERID }}>
          <Routes>
            <Route path='/' element={<Articles/>} />
            <Route path='/topics' element={<Topics/>} />
            <Route path='/topic/:topic_id' element={<Articles />} />
            <Route path='/article/:article_id' element={<Article />} />
          </Routes>
        </UserIdContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
