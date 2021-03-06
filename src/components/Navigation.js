import React from 'react' 

const Navagation = ({ onRouteChange, route, handleSignOut }) =>  (
        route === "home" ? 
        <nav style={{ height: "150px",display: "flex", justifyContent: 'flex-end', alignItems: 'center', }}>
            <p onClick={() => handleSignOut('signin')} className="f3 link dim  underline pa3 pointer">Sign Out</p>
            </nav>
            :
            <nav style={{height: "150px", display: "flex", justifyContent: 'flex-end', alignItems: 'center'}}>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim  underline pa3 pointer">Sign In</p>
                <p onClick={() => onRouteChange('register')}className="f3 link dim  underline pa3 pointer">Register</p>
            </nav>
    )

export default Navagation
