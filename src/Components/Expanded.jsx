// import React, { useState } from 'react';

// const ExpandableParagraph = ({ text }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

  
//   const truncatedText = text.slice(0, 10); // Adjust the slice length as needed
//   const displayText = isExpanded ? text : `${truncatedText}...`;

//   return (
//     <div>
//       <p className="cursor-pointer" onClick={toggleExpand}>
//         {displayText}
//       </p>
//       <button
//         onClick={toggleExpand}
//         className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
//       >
//         {isExpanded ? 'Show Less' : 'Read More'}
//       </button>
//     </div>
//   );
// };

// export default ExpandableParagraph;
