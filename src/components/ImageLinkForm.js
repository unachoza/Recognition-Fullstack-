import React from 'react'
import './ImageLinkForm.css' 

const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return (
        <div>
            <p className="f3">
                {'About to Recognizze U'}
            </p>
            <div className="center">
                <div className="br2 pa4 shadow-1 w-80 center form">
                    <input className="f4 pa2  w-70 center" type="tex" onChange={onInputChange} /><br/>
                    <button className=" w-20 grow f4 link ph3 pv2 dib " onClick={onSubmit}>Detect</button>
                </div>
            </div>
       </div> 
    )
}

export default ImageLinkForm