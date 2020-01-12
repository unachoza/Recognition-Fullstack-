import React from 'react' 

const Navagation = ({onRouteChange, isSignedIn, route}) => {
    return (
        route === "home" ? 
        <nav style={{ display: "flex", justifyContent: 'flex-end', alignItems: 'center'}}>
            <p onClick={() => onRouteChange('signin')}className="f3 link dim  underline pa3 pointer">Sign Out</p>
            </nav>
            :
            <nav style={{ display: "flex", justifyContent: 'flex-end', alignItems: 'center'}}>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim  underline pa3 pointer">Sign In</p>
                <p onClick={() => onRouteChange('register')}className="f3 link dim  underline pa3 pointer">Register</p>
            </nav>
    )
}

export default Navagation