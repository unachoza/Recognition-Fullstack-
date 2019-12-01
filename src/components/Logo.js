import React from 'react'
import Tilt from 'react-tilt'
import '../CSS/Logo.css' 

const Logo = () => {
    return (
        <div className="ma9 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 45 }} style={{ height: 105, width: 120 }} >
                <div className="Tilt-inner">  <img style={{height: 100, width: 100}}alt="logo" src="https://res.cloudinary.com/dh41vh9dx/image/upload/v1560354121/e0ca0f79-5f63-421b-ae58-e57797edc71c_200x200.png"/></div>
            </Tilt>

        </div>
    )
}

export default Logo