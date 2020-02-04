import React from 'react';
import '../CSS/ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit, input }) => {
  return (
    <div className="center">
      <div className="br2 pa4 shadow-1 w-80 center form" style={{ backgroundColor: '#00000090' }}>
        <input
          className="f4 pa2  w-70 center"
          type="text"
          value={input}
          name="img"
          onChange={e => onInputChange(e)}
          autoComplete="none"
        />
        <br />
        <button className=" w-20 grow f4 link ph3 pv2 dib " onClick={onSubmit}>
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
