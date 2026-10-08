import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import TitleHeader from './TitleHeader'
import { useTranslation } from 'react-i18next';

const HeaderPageSection = ({ handleClick, name, size }) => {
       const { i18n } = useTranslation();
       
       return (
              <>
                     <div className={`w-full flex items-center justify-start mb-10 ${
                                                 i18n.language === 'ar' ? 'flex-row-reverse' : ''
                                          }`}>
                            <button type='button' className='' onClick={handleClick}>
                                   <IoIosArrowDown className="rotate-90 text-mainColor text-5xl" />
                            </button>
                            <div className="text-mainColor w-full text-center">
                                   <TitleHeader text={name} size={size}/>
                            </div>
                     </div>
              </>
       )
}

export default HeaderPageSection