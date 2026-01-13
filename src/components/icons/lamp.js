import React from 'react';

const IconLamp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ overflow: 'visible' }}>
    <title>Lamp</title>
    {/* Suspender wire */}
    <line x1="12" y1="0" x2="12" y2="8" stroke="var(--green)" strokeWidth="1" />
    {/* Lamp Shade */}
    <path
      d="M6 14 A 6 6 0 0 1 18 14 L 18 15 L 6 15 Z"
      fill="var(--green)"
      stroke="var(--green)"
      strokeWidth="1"
    />
    {/* Bulb */}
    <circle cx="12" cy="16" r="2.5" fill="#ffcc00" stroke="#ffcc00" strokeWidth="0.5" />
    {/* Light Rays */}
    <g stroke="#ffcc00" strokeWidth="1.5">
      <line x1="12" y1="19.5" x2="12" y2="22" opacity="0.8" />
      <line x1="8.5" y1="18.5" x2="7" y2="20" opacity="0.6" />
      <line x1="15.5" y1="18.5" x2="17" y2="20" opacity="0.6" />
    </g>
  </svg>
);

export default IconLamp;
