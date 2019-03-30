import React from 'react'
import './ImageLinkForm.css' 

const ImageLinkForm = () => {
    return (
        <div>
            <p className="f3">
                {'About to Recognizze U'}
            </p>
            <div className="center">
                <div className="br2 pa4 shadow-1 w-80 center form">
                    <input className="f4 pa2  w-70 center" type="tex" /><br/>
                    <button className=" w-20 grow f4 link ph3 pv2 dib  ">Detect</button>
                </div>
            </div>
       </div> 
    )
}

export default ImageLinkForm