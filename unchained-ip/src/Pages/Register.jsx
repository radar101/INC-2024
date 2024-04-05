import React from 'react'
import { Link } from 'react-router-dom'
import gglimg from '../assets/googleSVG.svg'
import '../Styles/Register.css'
const Register = () => {
  return (
    <section id='reg_section'>
      <div id='reg_imgdiv'>
        <p>Get Started with</p>
        <div>UnchainedIP</div>
      </div>
      <div id='reg_form'>
        <form>
          <p id='form_title'>Sign Up</p>
          <div className='inpts'>
            <input type="text" name='name' placeholder='Full name' />
          </div>
          <div className='inpts'>
            <input type="email" name='email' placeholder='email id' />
          </div>

          <div className='multi1'>
            <div className='inpts'>
              <select name='nationallity'  >
                <option value="0">Nationality</option>
                <option value="1">Indian</option>
                <option value="2">American</option>
                <option value="3">British</option>
              </select>
            </div>
            <div className='inpts'>
              <select name='gender'  >
                <option value="0">Gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
            </div>
          </div>


          <div className='multi2'>
            <div className='inpts inp1'>
              <select name='ccode' id='s1' >
                <option value="0">+91</option>
                <option value="1">+10</option>
                <option value="2">+20</option>
                <option value="3">+30</option>
              </select>
            </div>
            <div className='inpts inp2'>
              <input name='phone' id='s2' placeholder='phone number' />
            </div>
          </div>

          <div className='inpts'>
            <select name='usefor' placeholder='password' >
              <option value="1">I seek to use the platform primarily for</option>
              <option value="2">For 1</option>
              <option value="3">For 2</option>
              <option value="4">For 3</option>
            </select>
          </div>
          <div className='inpts'>
            <input type="password" name='password' placeholder='password' />
          </div>
          <div className='tandcchk'>
            <input type="checkbox" name='tandcagree' />
            I agree to the Terms and Privacy Policy
          </div>

          <div className='inpts btn1'>
            <button>
              Sing In
            </button>
            <p id='signupop'>
              Already have an account?&nbsp;
              <Link to='/login' className='sgnlink'>Sing In</Link>
            </p>
          </div>

          <div className='inpts btn2'>
            <button>
              <img src={gglimg} alt="" />
              Sign In with Google
            </button>
          </div>
        </form>
      </div>

    </section>
  )
}

export default Register