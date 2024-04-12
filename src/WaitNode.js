import React from 'react';

const WaitNode = ({ id }) => {
  return (
    <div style={{ background: '#fff', border: '1px solid #000', padding: '10px', borderRadius: '5px' }}>
      Wait Node - {id}
    </div>
  );
};

export default WaitNode;
