import React from 'react' 

const Navagation = ({onRouteChange}) => {
    return (
        <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: 'center'}}>
            <p onClick={() => onRouteChange('signin')}className="f3 link dim  underline pa3 pointer">Sign Out</p>
        </div>
    )
}

export default Navagation