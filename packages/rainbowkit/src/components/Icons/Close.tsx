import React from 'react';
import { themeVars } from '../../css/sprinkles.css';

export const CloseIcon = () => (
  <svg
    fill="none"
    height="34"
    role="img"
    width="34"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="17"
      cy="17"
      fill={themeVars.colors.modalCloseBackground}
      r="17"
    />
    <path
      d="M11.47 20.407c-.54.54-.568 1.573.027 2.167.595.595 1.627.568 2.167.028l3.33-3.336 3.321 3.329c.575.574 1.58.56 2.167-.028.595-.594.602-1.592.028-2.167l-3.323-3.322 3.323-3.322c.574-.574.567-1.58-.028-2.167-.587-.595-1.592-.602-2.167-.027l-3.322 3.322-3.329-3.33c-.54-.54-1.572-.567-2.167.028-.595.588-.567 1.62-.027 2.16l3.336 3.336-3.336 3.33z"
      fill={themeVars.colors.modalClose}
    />
  </svg>
);
