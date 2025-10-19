import './Header.css';
import amazon_logo from '../assets/amazon_logo.png';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <div className='Header'>
      <header>
        <img id= "kindle_logo" src="https://m.media-amazon.com/images/G/01/kfw/landing/img_logo._CB611756372_.png" alt="Amazon Kindle" />
        <h2>Take your stories wherever you go</h2>
        <div className='buttons-container'>
          <button id="Header__signUp" onClick={() => navigate('/signup')}>
            Create an Amazon Account
          </button>
          <button id="Header__signIn" onClick={() => navigate('/signin')}>
          <img src={amazon_logo} alt="" />
          <span>Sign In with your account</span>
          </button>
        </div>
        <img id = "kindle_on_web" src="https://m.media-amazon.com/images/G/01/kfw/landing/img_kindleWeb_IN2x._CB610886625_.png" alt="" />
      </header>
    </div>
  )
}

export default Header