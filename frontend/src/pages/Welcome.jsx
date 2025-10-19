import React, { useState } from 'react'

function Welcome() {
  const [msg,setMsg] = useState('');
  function onClickHandler(){
    setMsg('button is clicked');
  }
  
  return (
    <div className='Welcome'>
        <h2>Welcome to Kindle Clone</h2>
        <button name = "click-btn" onClick={onClickHandler}>click me</button>
        <p>{msg}</p>
    </div>
  )
}

export default Welcome