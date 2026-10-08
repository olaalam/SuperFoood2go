// import React, { useState } from "react";

// const Header = () => {
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <header className="absolute top-5 w-full z-10">
//       {/* Container */}
//       <div className="container mx-auto px-10 py-4">
//         <div className="flex justify-between items-center">
//           {/* Site Logo */}
//           <div className="site-logo">
//             <a href="index.html">
//               <img
//                 src="demo/assets/images/logo-black.png"
//                 alt="Logo"
//                 className="h-10"
//               />
//             </a>
//           </div>

//           {/* Navigation */}
//           <nav className="hidden md:flex space-x-6 text-white font-medium">
//             <ul className="flex space-x-6">
//               <li>
//                 <a
//                   href="#"
//                   className="relative hover:text-blue-400 after:absolute after:w-0 after:h-1 after:bg-blue-400 hover:after:w-full after:transition-all after:bottom-0"
//                 >
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="relative hover:text-blue-400 after:absolute after:w-0 after:h-1 after:bg-blue-400 hover:after:w-full after:transition-all after:bottom-0"
//                 >
//                   About
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="relative hover:text-blue-400 after:absolute after:w-0 after:h-1 after:bg-blue-400 hover:after:w-full after:transition-all after:bottom-0"
//                 >
//                   Services
//                 </a>
//               </li>
//             </ul>
//           </nav>

//           {/* Header CTA Button */}
//           <div className="hidden md:block">
//             <a
//               href="https://themeforest.net/item/saasio-one-page-template/28830790"
//               className="bg-teal-500 hover:bg-blue-500 text-white py-2 px-5 rounded-full transition-all"
//             >
//               Purchase $20
//             </a>
//           </div>

//           {/* Mobile Menu Toggle */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
//               className="text-2xl text-white"
//             >
//               <i className="fas fa-bars"></i>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-90 z-50">
//             <div className="flex justify-between p-5">
//               {/* Mobile Logo */}
//               <div>
//                 <a href="#">
//                   <img
//                     src="demo/assets/images/logo-white.png"
//                     alt="Logo"
//                     className="h-10"
//                   />
//                 </a>
//               </div>

//               {/* Close Button */}
//               <button
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="text-white text-2xl"
//               >
//                 <i className="fas fa-times"></i>
//               </button>
//             </div>

//             {/* Mobile Navigation */}
//             <ul className="text-white text-center space-y-6 mt-10">
//               <li>
//                 <a href="#" className="hover:text-blue-400">
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-blue-400">
//                   About
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-blue-400">
//                   Services
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="https://themeforest.net/item/saasio-one-page-template/28830790"
//                   className="bg-teal-500 hover:bg-blue-500 text-white py-2 px-5 rounded-full inline-block"
//                 >
//                   Purchase $20
//                 </a>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
