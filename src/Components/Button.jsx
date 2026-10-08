import React from 'react';
import { FaPlus } from "react-icons/fa";
import Loading from './Loading.jsx';
import { useTranslation } from 'react-i18next';

const Button = ({ stateLoding, Width, Text,BorderColor="",BgColor = "bg-mainColor", type = "button", Color = "text-white", Size = "text-2xl", px = "px-7", rounded = "rounded-xl", handleClick }) => {
  return (
    <button
      type={type}
      className={`${BgColor} w-${Width} ${Color} ${Size} border border-${BorderColor} font-medium ${rounded} py-4 ${px}`}
      onClick={handleClick}>
      {!stateLoding ? Text : <div className="w-full flex items-center justify-center m-auto">
        <Loading />
      </div>}
    </button>
  );
};

const ButtonAdd = ({ isWidth = false, Text = 'Add', BgColor = "white", Color = "thirdColor", Size = "xl", handleClick, iconColor = "mainColor" }) => {
  const { t } = useTranslation();

  return (
    <button
      type='button'
      className={`flex items-center w-${isWidth ? "full" : ''} gap-x-2 justify-center bg-${BgColor} font-medium rounded-lg px-4 py-3 outline-none`}
      onClick={handleClick}>
      <FaPlus className={`text-${iconColor}`} /> <span className={`text-${Color} text-${Size}`}>{t(Text)}</span>
    </button>
  );
};

export { Button, ButtonAdd };


