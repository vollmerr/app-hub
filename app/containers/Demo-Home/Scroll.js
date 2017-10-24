import React from 'react';

const Scroll = () => (
  <div>
    {
      Array(100).fill(0).map((x, i) => <h1 key={i}>Testing Scrolling...</h1>) // eslint-disable-line
    }
  </div>
);

export default Scroll;
