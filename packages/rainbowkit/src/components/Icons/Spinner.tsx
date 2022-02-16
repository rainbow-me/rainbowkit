import React from 'react';

export const Spinner = () => (
  <svg
    fill="none"
    height="22"
    viewBox="0 0 22 22"
    width="22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20"
      stroke="url(#paint0_angular_2_92901)"
      strokeLinecap="round"
      strokeLinejoin="bevel"
      strokeWidth="3"
    />
    <defs>
      <radialGradient
        cx="0"
        cy="0"
        gradientTransform="translate(11 11) rotate(90) scale(9)"
        gradientUnits="userSpaceOnUse"
        id="paint0_angular_2_92901"
        r="1"
      >
        <stop offset="0.783452" stopColor="#4892FE" />
        <stop offset="0.888512" stopColor="#4892FE" stopOpacity="0" />
        <stop offset="1" stopColor="#4892FE" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);
