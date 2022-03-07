/* eslint-disable react/jsx-sort-props */
import React from 'react';

export const CreateIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
  >
    <rect width="48" height="48" rx="10" fill="url(#paint0_radial_251_1213)" />
    <rect
      width="48"
      height="48"
      rx="10"
      fill="url(#paint1_radial_251_1213)"
      fillOpacity="0.7"
      style={{ mixBlendMode: 'screen' }}
    />
    <rect
      x="0.5"
      y="0.5"
      width="47"
      height="47"
      rx="9.5"
      stroke="black"
      strokeOpacity="0.04"
    />
    <g filter="url(#filter0_d_251_1213)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 12C23.1716 12 22.5 12.6716 22.5 13.5V21.7C22.5 21.98 22.5 22.12 22.4455 22.227C22.3976 22.3211 22.3211 22.3976 22.227 22.4455C22.12 22.5 21.98 22.5 21.7 22.5H13.5C12.6716 22.5 12 23.1716 12 24C12 24.8284 12.6716 25.5 13.5 25.5H21.7C21.98 25.5 22.12 25.5 22.227 25.5545C22.3211 25.6024 22.3976 25.6789 22.4455 25.773C22.5 25.88 22.5 26.02 22.5 26.3V34.5C22.5 35.3284 23.1716 36 24 36C24.8284 36 25.5 35.3284 25.5 34.5V26.3C25.5 26.02 25.5 25.88 25.5545 25.773C25.6024 25.6789 25.6789 25.6024 25.773 25.5545C25.88 25.5 26.02 25.5 26.3 25.5H34.5C35.3284 25.5 36 24.8284 36 24C36 23.1716 35.3284 22.5 34.5 22.5H26.3C26.02 22.5 25.88 22.5 25.773 22.4455C25.6789 22.3976 25.6024 22.3211 25.5545 22.227C25.5 22.12 25.5 21.98 25.5 21.7V13.5C25.5 12.6716 24.8284 12 24 12Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_251_1213"
        x="10"
        y="11"
        width="28"
        height="28"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
        />
        <feBlend
          mode="overlay"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_251_1213"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_251_1213"
          result="shape"
        />
      </filter>
      <radialGradient
        id="paint0_radial_251_1213"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-20.5 61) rotate(-40.0766) scale(94.7484)"
      >
        <stop offset="0.276042" stopColor="#20FF4D" />
        <stop offset="0.463542" stopColor="#1499FF" />
        <stop offset="0.755208" stopColor="#FF6FC5" />
        <stop offset="1" stopColor="#BC67FF" />
      </radialGradient>
      <radialGradient
        id="paint1_radial_251_1213"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-7.5 -7.5) rotate(45) scale(78.4889)"
      >
        <stop stopColor="#FF0000" />
        <stop offset="1" stopColor="#00A3FF" />
      </radialGradient>
    </defs>
  </svg>
);
