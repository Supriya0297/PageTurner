import './App.css';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import BooksPage from './pages/BooksPage';
import UserProfilePage from './pages/UserProfilePage';
import ErrorPage from './pages/ErrorPage';
import {Routes, Route, Link} from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <div className="App"> 
    <Routes>
      <Route path='/' element= {<LandingPage />}></Route>
      <Route path='/signup' element= {<SignUpPage />}></Route>
      <Route path='/signin' element= {<SignInPage />}></Route>
      <Route path='/books' element= {<ProtectedRoute component = {<BooksPage />}>
                                     </ProtectedRoute> }></Route>
      <Route path='/profile' element= {<ProtectedRoute component = {<UserProfilePage />}>
                                     </ProtectedRoute> }></Route>
      <Route path='/*' element= {<ErrorPage />}></Route>
    </Routes>
    </div>
  )
}
export default App