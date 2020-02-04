import React from 'react';
import '../CSS/FaceRecognition.css';
const FaceRecognition = ({ img, box, fa }) =>
  this.state = {
    
  }
  
 this.displayFaceBox(this.calculateFaceBox(data));
        this.setState({ noFace: false });

{
  return (
    <div className="center">
      <div className="absolute mt2">
        <img id="imageInput" alt="" src={img} width="500px" height="auto" />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
