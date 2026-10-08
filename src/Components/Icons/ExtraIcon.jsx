import React from 'react'

const ExtraIcon = ({ Width = "24", Height = "24", isActive = '#fff' }) => {
    return (
        <svg width={Width} height={Height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_111_3529)">
            <path d="M22.4902 15C25.5277 15 27.9902 12.5375 27.9902 9.5C27.9902 6.4625 25.5277 4 22.4902 4C19.4527 4 16.9902 6.4625 16.9902 9.5C16.9902 12.5375 19.4527 15 22.4902 15ZM18.9997 8.5H21.4902V6H23.4902V8.5H25.9902V10.5H23.4902V13H21.4902V10.5H18.9997V8.5Z" fill={isActive ? '#9E090F': '#fff'}/>
            <path d="M4.5 14.5V4.5H14.5V14.5H4.5Z" stroke={isActive ? '#9E090F': '#fff'}/>
            <path d="M4.5 27.5V17.5H14.5V27.5H4.5Z" stroke={isActive ? '#9E090F': '#fff'}/>
            <path d="M17.4902 27.5V17.5H27.4902V27.5H17.4902Z" stroke={isActive ? '#9E090F': '#fff'}/>
            </g>
            <defs>
            <clipPath id="clip0_111_3529">
            <rect width={Width} height={Height} fill="white" transform="translate(4 4)"/>
            </clipPath>
            </defs>
        </svg>        
    )
}

export default ExtraIcon