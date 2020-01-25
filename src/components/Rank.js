import React from 'react';
import '../CSS/App.css'

const Rank = ({ name, entries }) => (
      <div className='white f3 user-rank'>
        {`${name.toUpperCase()} , your image count is  ...  ${entries}  `}
      </div>
      
  );

export default Rank;