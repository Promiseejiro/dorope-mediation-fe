"use client";

import React, { useRef } from "react";
import ModalBackdrop from "../common/modalBackdrop";

interface IAnimatedModalLayout {
  children: React.ReactNode;
  className?: string;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  showCloseIcon?: boolean;
  maxWidth?: number;
}
export default function AnimatedModalLayout({
  children,
  className = "",
  setShowModal,
  maxWidth = 500,
  showCloseIcon = false,
}: IAnimatedModalLayout) {
  const modalBackgroundRef = useRef<HTMLDivElement | null>(null);

  const backDropCloseHandler = (e: any) => {
    if (!modalBackgroundRef.current?.contains(e.target)) {
      if (setShowModal) {
        setShowModal(false);
      }
    }
  };

  return (
    <ModalBackdrop
      onClose={backDropCloseHandler}
      className="bg-[rgba(0,0,0,.4)] grid place-items-center p-4 modal-bg-inner-opacity-animation overflow-hidden"
    >
      <div
        style={{ maxWidth }}
        ref={modalBackgroundRef}
        className={`bg-white rounded-2xl w-full modal-inner-move-up-animation ${className}`}
      >
        {showCloseIcon && (
          <span
            className="absolute top-4 right-6 md:top-6 md:right-4 cursor-pointer"
            onClick={() => {
              if (setShowModal) {
                setShowModal(false);
              }
            }}
          >
            <i className="fa-regular fa-circle-xmark text-black"></i>
          </span>
        )}
        {children}
      </div>
    </ModalBackdrop>
  );
}
