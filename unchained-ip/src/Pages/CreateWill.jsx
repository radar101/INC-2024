import React from 'react';
import uploadimg from '../assets/uploadSVG.svg';
import { useState } from 'react';
import '../Styles/CreateWill.css'
import DragAndDrop from '../Components/DragAndDrop/DragAndDrop'

const CreateWill = () => {
  const [selectedfile, SetSelectedFile] = useState([])
  const [valid, setValid] = useState(true);

  const [exdigsign, setexDigSign] = useState('');

  const [tesdigsign, settesDigSign] = useState('');

  const [witdigsign, setwitDigSign] = useState('');

  return (
    <section id='create_ip_sec'>
      <p id='create_ip_title'>Create Will</p>
       <form action="">
       <div id='owner_det_div'>
          <p className='create_titles'>Executor Details</p>
          <div id='owner_det_inpt_div'>
            <div className='inps'>
              <input type="text" name='exname' placeholder='Name' />
            </div>
            <div className='inps inp1'>
              {
                exdigsign.length > 0 &&
                exdigsign.slice(0, exdigsign.length)
              }
              Upload Digital Sign
              <input type="file" name='exsign' onChange={(event) => { setexDigSign(event.target.value) }} />
              <img src={uploadimg} alt="" />
            </div>
            <div className='inps'>
              <input type="text" placeholder='Aadhar no.' name='exaadhanno' />
            </div>
          </div>

        </div>
        <div id='owner_det_div_cover'>
          <div id='owner_det_div'>
            <p className='create_titles'>Testator Details</p>
            <div id='owner_det_inpt_div'>
              <div className='inps'>
                <input type="text" name='tesname' placeholder='Name' />
              </div>
              <div className='inps inp1'>
                {
                  tesdigsign.length > 0 &&
                  tesdigsign.slice(0, tesdigsign.length)
                }
                Upload Digital Sign
                <input type="file" name='tessign' onChange={(event) => { settesDigSign(event.target.value) }} />
                <img src={uploadimg} alt="" />
              </div>
              <div className='inps'>
                <input type="text" placeholder='Aadhar no.' name='tesaadhanno' />
              </div>
            </div>
          </div>
        </div>
        <div id='owner_det_div'>
          <p className='create_titles'>Witness Details</p>
          <div id='owner_det_inpt_div'>
            <div className='inps'>
              <input type="text" name='witname' placeholder='Name' />
            </div>
            <div className='inps inp1'>
              {
                witdigsign.length > 0 &&
                witdigsign.slice(0, witdigsign.length)
              }
              Upload Digital Sign
              <input type="file" name='witsign' onChange={(event) => { setwitDigSign(event.target.value) }} />
              <img src={uploadimg} alt="" />
            </div>
            <div className='inps'>
              <input type="text" placeholder='Aadhar no.' name='witaadhanno' />
            </div>
          </div>

        </div>
        <div id='owner_det_div_cover'>
          <div id='owner_det_div'>
          <DragAndDrop selectedfile={selectedfile} SetSelectedFile={SetSelectedFile} />
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

export default CreateWill