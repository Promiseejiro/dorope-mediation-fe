import React from "react";

const AnimatedSuccessCheck = () => {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        .circle {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: draw 0.7s ease-out forwards;
        }

        .checkmark {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw 0.5s ease-out forwards 0.3s;
        }

        .pop {
          transform-origin: 50% 50%;
          animation: pop 0.3s ease-out forwards 0.6s;
        }

        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes pop {
          0% {
            transform: scale(0.8);
          }
          80% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>

      <g
        className="pop"
        fill="none"
        stroke="#005cad"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle className="circle" cx="60" cy="60" r="40" />
        <path className="checkmark" d="M40 62 L54 76 L82 48" />
      </g>
    </svg>
  );
};

export default AnimatedSuccessCheck;
