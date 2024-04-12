// FilterDataNode.js
import React from 'react';

const FilterDataNode = ({ id }) => {
  return (
    <div style={{ background: '#fff', border: '1px solid #000', padding: '10px', borderRadius: '5px' }}>
      Filter Data Node - {id}
    </div>
  );
};

export default FilterDataNode;
