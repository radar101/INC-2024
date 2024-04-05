import React from 'react'
import {socialMediaData} from './data.js'
import '../../Styles/Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <section id='footer_sec'>
            <div id='ft1'>
                <div id='footer_seclogo'>UnchainedIP</div>
                <div id='social_media'>
                    <ul>
                        
                            {socialMediaData.length>0 &&
                                 socialMediaData.map((sm,index)=>{
                                    return(
                                        <li key={index} ><a href={sm.link} target='_blank'  rel="noreferrer"><img src={sm.img} alt="" className='icn'/></a></li>

                                    )
                                 })
                          
                            }
                      
                    </ul>
                </div>
            </div>
            <div id='ft2'>
                <div id='footer_links'>
                   <Link 
                   to='/about'
                   className='flinks'>About us</Link>
                   <Link className='flinks'>Terms & Privacy Policy</Link>
                </div>
                <p id='cprt'>
                © 2024 UnchainedIP
                </p>
            </div>
        </section>
    )
}

export default Footer