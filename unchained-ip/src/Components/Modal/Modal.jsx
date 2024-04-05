import React from 'react'
import '../../Styles/Modal.css';
import closeimg from '../../assets/closeSVG.svg'

const Modal = ({ modalData, setModal }) => {
    return (
        <section id='modal_sec'>
            <div id='modal_clsbtn_div'>
                <button onClick={()=>{setModal(false)}}>
                    <img src={closeimg} alt="" />
                </button>
            </div>
            <div id='modal_div'>
                <p className='modal_title'>{modalData.title}</p>
                <p className='modal_id'>Block ID: <span className='modal_mnid'>{modalData.blockId}</span></p>
                <p className='modal_type'>Type : <span className='modal_mntype'>{modalData.type}</span></p>
                <p className='modal_desc_title'>
                    Description<br />
                    <p className='modal_desc'>{modalData.description}</p>
                </p>

                <p className='modal_btns'>
                    <button className='mdbtn'>View Document</button>
                    <button className='mdbtn'>Download Certificate</button>
                </p>
            </div>
        </section>
    )
}

export default Modal