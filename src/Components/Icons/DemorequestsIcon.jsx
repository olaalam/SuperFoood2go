import React from 'react'

const DemorequestsIcon = ({ Width = "24", Height = "24", isActive = '#fff' }) => {
    return (
        <svg width={Width} height={Height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_21_1862)">
            <path d="M18 4H6C3.79086 4 2 5.79086 2 8V16C2 18.2091 3.79086 20 6 20H18C20.2091 20 22 18.2091 22 16V8C22 5.79086 20.2091 4 18 4Z" stroke={isActive ? '#9E090F': '#fff'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 8L9.77 11.11C11.2014 11.6831 12.7986 11.6831 14.23 11.11L22 8" stroke={isActive ? '#9E090F': '#fff'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_21_1862">
            <rect svg width={Width} height={Height} fill="white"/>
            </clipPath>
            </defs>
        </svg>

    )
}

export default DemorequestsIcon