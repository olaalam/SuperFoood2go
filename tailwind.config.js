/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primaryeRegular: ["Regular"],
        primaryeMedium: ["Medium"],
        primaryeBold: ["Bold"],
       
      },
      boxShadow: {
        'custom': '0 10px 15px rgba(0, 0, 0, 0.8)', // Custom shadow
      },
      colors: {
        mainColor: "#9E090F",
        secoundColor: "#fff",
        thirdColor: "#6B6A6A",
        // AddText:"#5E5E5E",
      },
      backgroundColor: {
        // mainBgColor: "#7E7D7D",
        // secoundBgColor: "#cccccc",
        // thirdBgColor: "#f6f6f6",
        // AddButton:"#ffffff",
      },
      // screens: {
      //   sm: "250px",
      //   md: "640px",
      //   lg: "760px",
      //   xl: "1280px",
      //   // "2xl": "1536px",
      // },
      screens: {
        sm: "300px",    // Adjusted for smaller screens
        md: "640px",    // Kept as is for medium screens
        lg: "1024px",   // Updated to align with larger tablet or small desktop sizes
        xl: "1280px",   // Retained for larger desktop screens
        "2xl": "1536px", // Uncommented for ultra-wide screens if needed
      },      
    },
  },
  plugins: [],
}

