import './App.css';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import BooksPage from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import UserProfilePage from './pages/UserProfilePage';
import ErrorPage from './pages/ErrorPage';
import {Routes, Route, Link} from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import Welcome from './pages/Welcome';

function App() {
  return (
    <div className="App"> 
    <Routes>
      <Route path='/' element= {<LandingPage />}></Route>
      <Route path='/signup' element= {<SignUpPage />}></Route>
      <Route path='/signin' element= {<SignInPage />}></Route>
      <Route path='/welcome' element= {<Welcome />}></Route>
      <Route path='/books' element= {<ProtectedRoute><BooksPage/></ProtectedRoute> }></Route>
      <Route path='/books/:id' element= {<ProtectedRoute><BookDetailPage/></ProtectedRoute> }></Route>
      <Route path='/profile' element= {<ProtectedRoute><UserProfilePage/></ProtectedRoute> }></Route>
      <Route path='/*' element= {<ErrorPage />}></Route>
    </Routes>
    </div>
  )
}
export default App

