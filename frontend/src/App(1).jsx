import './App.css';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import BooksPage from './pages/BooksPage';
import {Routes, Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App"> 
    <Routes>
      <Route path='/' element= {<LandingPage />}></Route>
      <Route path='/signup' element= {<SignUpPage />}></Route>
      <Route path='/signin' element= {<SignInPage />}></Route>
      <Route path='/books' element= {<BooksPage />}></Route>
    </Routes>
    </div>
  )
}

export default App
