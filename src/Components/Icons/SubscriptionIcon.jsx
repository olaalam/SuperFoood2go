import React from 'react'

const SubscriptionIcon = ({ Width = "24", Height = "24", isActive = '#fff' }) => {
    return (
        <svg width={Width} height={Height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_111_3492)">
            <path d="M16.239 16.4392L17.0461 16L16.239 15.5608L10.239 12.2958L9.5 11.8937V12.735V19.265V20.1063L10.239 19.7042L16.239 16.4392ZM19.5 7.5H4.5V6.5H19.5V7.5ZM6.5 2.5H17.5V3.5H6.5V2.5ZM21.5 12V20C21.5 20.8289 20.8289 21.5 20 21.5H4C3.17114 21.5 2.5 20.8289 2.5 20V12C2.5 11.1711 3.17114 10.5 4 10.5H20C20.8289 10.5 21.5 11.1711 21.5 12Z" stroke={isActive ? '#9E090F': '#fff'}/>
            </g>
            <defs>
            <clipPath id="clip0_111_3492">
            <rect width={Width} height={Height} fill="white"/>
            </clipPath>
            </defs>
        </svg>
    )
}

export default SubscriptionIcon