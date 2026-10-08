import React from 'react'

const TitleHeader = ({ text, spaceBottom = 0, size = "3xl" }) => {
       return (
              <div className={`py-2 mb-${spaceBottom}`}>
                     <span className={`text-${size} font-medium`}>{text}</span>
              </div>
       );
};

export default TitleHeader;

