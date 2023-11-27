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
    <div style={{
      display: 'flex',
      gap: '0.25rem',
      alignItems: 'center',
      flexWrap: 'wrap',
    }}>
      {
        props.options.map((option, index) => (
          <button
            key={index}
            style={{
              backgroundColor: '#D1D5DB',
              borderRadius: '9999px',
              padding: '0.25rem',
            }}
            onClick={option.callback}
          >
            {option.icon}
          </button>
        ))
      }
    </div>
  );
}