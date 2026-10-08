import React from 'react'
import { IoFastFood } from "react-icons/io5";

const FoodIcon = ({ Width = "24", Height = "24", isActive = '#fff' }) => {
  return (
    <IoFastFood
      style={{
        width: `${Width}px`,
        height: `${Height}px`,
        color: isActive ? '#9E090F' : '#fff',
        transition: 'color 0.3s ease',
      }}
    />
  )
}

export default FoodIcon
