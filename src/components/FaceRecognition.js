import React from 'react'

const FaceRecognition = ({ imageUrl }) => {
    console.log('check', imageUrl)
    return (
        <div className="center">
            <img alt="" src={imageUrl}/>
        </div>
    )
}

export default FaceRecognition