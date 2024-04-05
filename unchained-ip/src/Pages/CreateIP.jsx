import React, { useState } from 'react'
import '../Styles/CreateIp.css'
import uploadimg from '../assets/uploadSVG.svg'
import DragAndDrop from '../Components/DragAndDrop/DragAndDrop'
const CreateIP = () => {
  const [selectedfile, SetSelectedFile] = useState([])
  const [valid, setValid] = useState(true);
  const [addhar, setAadhar] = useState('');
  const [digsign, setDigSign] = useState('');
  const [formData,setFormData]=useState(null);

  return (
    <section id='create_ip_sec'>
      <p id='create_ip_title'>Create IP</p>
      <form action="">
        <div id='owner_det_div'>
          <p className='create_titles'>Owner Details</p>
          <div id='owner_det_inpt_div'>
            <div className='inps'>
              <input type="text" name='name' placeholder='Name' />
            </div>
            <div className='inps inp1'>
              {
                digsign.length > 0 &&
                digsign.slice(0, digsign.length)
              }
              Upload Digital Sign
              <input type="file" name='ownersign' onChange={(event) => { setDigSign(event.target.value) }} />
              <img src={uploadimg} alt="" />
            </div>
            <div className='inps'>
              <input type="text" placeholder='Aadhar no.' name='aadhanno' />
            </div>
            <div className='inps inp1'>
              {
                addhar.length > 0 &&
                addhar.slice(0, addhar.length)
              }
              Upload Aadhar Photocopy
              <input type="file" onChange={(event) => { setAadhar(event.target.value) }} name='owneraadhar' />
              <img src={uploadimg} alt="" />
            </div>
          </div>

        </div>

        <div id='ip_det_div_back'>
          <div id='ip_det_div'>
            <p className='create_titles'>IP Details</p>
            <div id='ip_det_cr1'>
              <div className='inps'>
                <input type="text" name='Title' placeholder='Title' />
              </div>
              <div className='inps'>
                <input type="text" name='type' placeholder='Type' />
              </div>
            </div>
            <div id='ip_det_cr2'>
              <div className='inps'>
                <textarea type="text" name='description' placeholder='Description' />
              </div>
            </div>
            <DragAndDrop selectedfile={selectedfile} SetSelectedFile={SetSelectedFile} />
            <div id='ip_det_cr4'>
              <div className='inps'>
                <input type="text" name='exlink' placeholder='External Link' />
              </div>
              <div className='inps'>
                <input type="text" name='license' placeholder='License Type' />
              </div>
            </div>
            <div id='ip_det_cr5'>
              <div className='inps'>
                <input type="text" name='addinfo' placeholder='Additional Information' />
              </div>
            </div>
          </div>
        </div>
        <p id='agree_chk_div'>
          <input type="checkbox" name='tanc_chk' />
          &nbsp;
          I acknowledge that I own the rights to the submitted document and
          agree to the <a id='tc_text'>terms and conditions.</a>
        </p>
        {
          !valid &&
          <p id='valid_div'>
            Please enter the required details
          </p>
        }
        <p id='createip_btns_div'>
          <button className='sbt_btn'>Submit</button>
        </p>
      </form>
    </section>
  )
}

export default CreateIP