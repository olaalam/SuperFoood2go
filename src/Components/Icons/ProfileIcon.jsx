import React from 'react'

const HomeIcon = ({ Width = "32", Height = "32", isActive = '#fff' }) => {
    return (
        <svg width={Width} height={Height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 24C9.21011 21.6419 11.8623 20.0279 16 20.0279C20.1377 20.0279 22.7899 21.6419 24 24M19.2868 11.84C19.2868 13.9608 17.8153 15.68 16 15.68C14.1847 15.68 12.7132 13.9608 12.7132 11.84C12.7132 9.71923 14.1847 8 16 8C17.8153 8 19.2868 9.71923 19.2868 11.84Z" stroke={isActive ? '#9E090F': '#fff'} strokeWidth="2" strokeLinecap="round"/>
        </svg>
    )
}

export default HomeIcon