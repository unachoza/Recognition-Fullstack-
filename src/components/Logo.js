import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css' 

const Logo = () => {
    return (
        <div className="ma9 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 45 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner">  <img  alt="logo" src="https://res.cloudinary.com/dh41vh9dx/image/upload/v1553964040/logo.png"/></div>
            </Tilt>

        </div>
    )
}

export default Logo