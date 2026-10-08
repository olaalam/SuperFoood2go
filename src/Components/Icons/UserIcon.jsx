import React from 'react'

const UserIcon = ({ Width = "24", Height = "24", isActive = '#fff' }) => {
    return (
        <svg width={Width} height={Height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 17C2.21011 14.6419 4.86227 13.0279 9 13.0279C13.1377 13.0279 15.7899 14.6419 17 17M12.2868 4.84C12.2868 6.96077 10.8153 8.68 9 8.68C7.18474 8.68 5.71318 6.96077 5.71318 4.84C5.71318 2.71923 7.18474 1 9 1C10.8153 1 12.2868 2.71923 12.2868 4.84Z" stroke={isActive ? '#9E090F': '#fff'} strokeWidth="2" strokeLinecap="round"/>
        </svg>

    )
}

export default UserIcon