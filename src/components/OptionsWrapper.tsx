'use client'

import React from 'react';

interface OptionsWrapperProps {
  options: {
    icon: React.ReactNode;
    callback: () => void;
  }[];
}

export const OptionsWrapper = (props: OptionsWrapperProps) => {
  return (
    <div className="flex gap-1 items-center flex-wrap">
      {
        props.options.map((option, index) => (
          <button
            key={index}
            className="bg-gray-300 rounded-full p-1"
            onClick={option.callback}
          >
            {option.icon}
          </button>
        ))
      }
    </div>
  );
}