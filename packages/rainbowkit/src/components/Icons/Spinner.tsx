import React, { useMemo } from 'react';
import { SpinnerIconClassName, SpinnerIconPathClassName } from './Icons.css';

const useRandomId = (prefix: string) =>
  useMemo(
    () => `${prefix}_${Math.round(Math.random() * 1_000_000_000)}`,
    [prefix]
  );

export const SpinnerIcon = ({
  height = 21,
  width = 21,
}: {
  width?: string | number;
  height?: string | number;
}) => {
  const id = useRandomId('spinner');

  return (
    <svg
      className={SpinnerIconClassName}
      fill="none"
      height={height}
      viewBox="0 0 21 21"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id={id}>
        <path d="M10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C11.3284 18 12 18.6716 12 19.5C12 20.3284 11.3284 21 10.5 21C4.70101 21 0 16.299 0 10.5C0 4.70101 4.70101 0 10.5 0C16.299 0 21 4.70101 21 10.5C21 11.3284 20.3284 12 19.5 12C18.6716 12 18 11.3284 18 10.5C18 6.35786 14.6421 3 10.5 3Z" />
      </clipPath>
      <foreignObject
        clipPath={`url(#${id})`}
        height="21"
        width="21"
        x="0"
        y="0"
      >
        <div className={SpinnerIconPathClassName} />
      </foreignObject>
    </svg>
  );
};
