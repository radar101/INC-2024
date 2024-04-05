import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/User.css'
import userimg from '../assets/userSVG.svg'
import crimg from '../assets/createImg.svg'
import vrimg from '../assets/verifyImg.svg'
import { Ips } from './Ipdata.js'
import arrowimg from '../assets/arrowUpSVG.svg'
import Modal from '../Components/Modal/Modal.jsx'
const User = () => {
    const [showModal, setModal] = useState(false);
    const [modalData, setModalData] = useState(null)

    return (
        <>
            <section id='user_sec1'>
                <div id='user_panel'>
                    <div id='user_detail_div'>
                        <div id='user_imgdiv'>
                            <img src={userimg} alt="" />
                        </div>
                        <div id='user_details_div'>
                            <p id='username'>Rahul Patil</p>
                            <p id='useremail'>rahul@gmail.com</p>
                            <p id='userphone'>1234567890</p>
                        </div>
                    </div>
                    <div id='user_work_div'>
                        <p id='r1'>POFU's created by you</p>
                        <div id='r2'>
                            <div id='total_cnt'>5</div>
                            <div id='ips'>3<br />IP's</div>
                            <div id='wills'>2<br />Will's</div>
                        </div>
                    </div>
                </div>
                <div id='creat_and_verify_div'>
                    <div className='aanv_div'>
                        <div className='aanv_imgdiv'>
                            <img src={crimg} alt="" />
                        </div>
                        <div className='aanv_btndiv'>
                            <Link
                                to='/create'
                                className='aanv_btn'>
                                Create Now
                            </Link>
                        </div>
                    </div>

                    <div className='aanv_div'>
                        <div className='aanv_imgdiv'>
                            <img src={vrimg} alt="" />
                        </div>
                        <div className='aanv_btndiv'>
                            <Link className='aanv_btn'>
                                Verify Doc
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            <section id='user_sec2'>
                <div id='user_sec2title'>Your PoFU's</div>
                <div id='user_ips_div'>
                    {
                        Ips.length >= 0 &&
                        Ips.map((ip, index) => {
                            return (
                                <div className='ip_div' key={index}>
                                    <p className='ip_title'>{ip.title}</p>
                                    <p className='ip_id'>{ip.blockId}</p>
                                    <p className='ip_vmore'>
                                        <button
                                            onClick={() => {
                                                setModal(true);
                                                setModalData(ip);
                                            }}
                                            className='ipvlink'>
                                            View More
                                            <img src={arrowimg} alt="" />
                                        </button>
                                    </p>
                                </div>
                            )
                        })
                    }
                    {
                        Ips.length === 0 &&
                        <div id='noip_div'>
                            You Have No IP's
                        </div>
                    }
                </div>
            </section>
            {
                showModal &&
                <Modal modalData={modalData} setModal={setModal} />
            }

        </>
    )
}

export default User