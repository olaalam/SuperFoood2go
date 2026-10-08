import React, { forwardRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { FaTimes } from 'react-icons/fa';

const MultipleChoiceMenu = forwardRef(({
    iconMenu,
    handleOpen,
    selectedOptions = [], // Array to hold selected options
    openMenu,
    handleSelectOption, // Function to handle option selection
    handleRemoveOption, // Function to handle option removal
    options = [],
    name,
    borderWidth="2", borderColor = "mainColor", 
}, ref) => {

    return (
        <>
            <div className="w-full mx-auto relative" ref={ref}>
                <button
                    className={`flex items-center justify-between w-full h-full px-2 py-4 border-${borderWidth} border-${borderColor} rounded-2xl outline-none font-medium text-thirdColor text-center bg-secoundColor`}
                    onClick={handleOpen}
                >
                    <div className="text-mainColor text-2xl">{iconMenu}</div>
                    <div className="flex flex-wrap gap-2 items-center">
                        {selectedOptions.length > 0 ? selectedOptions.map((option, index) => (
                            <div key={index} className="flex items-center bg-gray-200 text-mainColor px-3 py-1 rounded-2xl">
                                {option}
                                <FaTimes className="ml-2 text-sm cursor-pointer" onClick={() => handleRemoveOption(option)} />
                            </div>
                        )) : <span>Select {name}</span>}
                    </div>
                    <IoIosArrowDown className={`${openMenu ? "rotate-180" : "rotate-0"} text-white text-xl transition-all duration-300`} />
                </button>
                <div className={`${openMenu ? "block" : "hidden"} scrollSec absolute w-full min-h-10 max-h-32 top-15 bg-mainColor text-white rounded-2xl drop-shadow-sm overflow-y-scroll z-10`}>
                    {options.map((option,index) => (
                        <div
                            key={option.id || index }
                            className={`flex items-center py-1 gap-1 justify-center text-xl font-medium text-white hover:cursor-pointer hover:bg-mainColor hover:text-secoundColor transition-all duration-300 ${selectedOptions.includes(option.name) ? 'bg-mainColor text-secoundColor' : ''}`}
                            onClick={handleSelectOption}
                        >
                            {option.name}
                            <input type="hidden" value={option?.id || option.name} className='inputVal' />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
});

export default MultipleChoiceMenu;

