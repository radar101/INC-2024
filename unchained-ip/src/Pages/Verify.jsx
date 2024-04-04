import React from 'react'
import '../Styles/Verify.css';
import Modal from '../Components/Modal/Modal';
import { useState } from 'react';

const Verify = () => {
    const [showModal, setModal] = useState(false);
    const [modalData, setModalData] = useState(null)
    const [valid,setValid]=useState(true);

    const validSubmit=(event)=>{
        event.preventDefault()
        const docid=event.target.docid.value;
        //validate docid
        if(docid===""){
            setValid(false)
        }
        else{
            setValid(true)
            setModal(true);
        }   
       
        setModalData({
            title:"title",
            blockId:"fasjdkfn",
            description:"dsfsdsg",
            type:"will",
        })
    }

  return (
    <>
    <section id='verify_sec'>
       <div id='verify_main_div'>
         <p id='verify_title'>Verify Document</p>
         <form action="" onSubmit={validSubmit}>
              <div id='verify_id_div'>
                <input type="text" placeholder='Enter Document ID' name='docid'/>
              </div>
              {
                !valid &&
                <p id='valid_verify'>
                   Enter Valid ID
                </p>

              }
              <div id='verify_sub_div'>
                  <button >
                    Submit
                  </button>
              </div>
              
         </form>
       </div>
    </section>
    {
                showModal &&
                <Modal modalData={modalData} setModal={setModal} />
            }
    </>
    
  )
}

export default Verify