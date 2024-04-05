import React from 'react'
import '../Styles/Create.css'
import { Link } from 'react-router-dom'
import arrowimg from '../assets/arrowUpSVG.svg'
const Create = () => {
  return (
    <section id='create_sec1'>
       <div className='create_div'>
         <p className='crr1'>Create IP</p>
         <p className='crr2'>
         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
         </p>
         <p className='crr3'>
          <Link 
          to='/create/ip'
          className='crr3_link'>
          Create 
          <img src={arrowimg} alt="" />
          </Link>
         </p>
       </div>

       <div id='vertical'></div>
       <div className='create_div'>
         <p className='crr1'>Create Will</p>
         <p className='crr2'>
         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
         </p>
         <p className='crr3'>
          <Link 
          to='/create/will'
          className='crr3_link'>
          Create 
          <img src={arrowimg} alt="" />
          </Link>
         </p>
       </div>
    </section>
  )
}

export default Create