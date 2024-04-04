import React from 'react'
import '../Styles/Login.css'
import { Link } from 'react-router-dom'
import gglimg from '../assets/googleSVG.svg'
const Login = () => {
  return (
    <section id='login_section'>

      <div id='login_form'>
        <form>
          <p id='form_title'>Sign In</p>
          <div className='inpts'>
            <input type="email" name='email' placeholder='email Id' />
          </div>
          <div className='inpts'>
            <input type="password" name='password' placeholder='password' />
          </div>
          <div className='inpts btn1'>
            <button>
              Sign In
            </button>
            <p id='signupop'>
              Don’t have an account?&nbsp;
              <Link to='/register' className='sgnlink'>Sign Up</Link>
            </p>
          </div>
          OR
          <div className='inpts btn2'>
            <button>
              <img src={gglimg} alt="" />
              Sign In with Google
            </button>
          </div>
        </form>
      </div>
      <div id='login_imgdiv'>
        <p>Welcom back to</p>
        <div>UnchainedIP</div>
      </div>
    </section>
  )
}

export default Login