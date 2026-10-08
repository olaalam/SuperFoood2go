import React, { useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

const SearchBar = ({ type = "text", bg, pr, value, handleChange, placeholderKey = 'search' }) => {
  const { t, i18n } = useTranslation();

  // Set the document direction based on language change
  useEffect(() => {
    if (i18n.language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [i18n.language]);

  return (
    <div className='w-full relative border border-mainColor rounded-3xl flex items-center'>
      {/* Search Icon */}
      <IoSearch
        className={`text-mainColor font-bold text-xl ${i18n.language === 'ar' ? 'mr-4' : 'ml-4'}`}
      />
      {/* Input Field */}
      <input
        type={type}
        onChange={handleChange}
        value={value}
        className={`bg-${bg} w-full h-full py-3 rounded-3xl outline-none font-medium text-mainColor ${pr} ${i18n.language === 'ar' ? 'pl-12 pr-3' : 'pl-3 pr-12'}`}
        placeholder={t(placeholderKey)} // Use the translated placeholder
      />
    </div>
  );
}

export default SearchBar;
