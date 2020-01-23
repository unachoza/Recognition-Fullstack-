import React from 'react';

const Rank = ({ name, entries }) => (
      <div className='white f3'>
        {`${name.toUpperCase()} , your current entry count is ... ${entries}  `}
      </div>
      
  );

export default Rank;