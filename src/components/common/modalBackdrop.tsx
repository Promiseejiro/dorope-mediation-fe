"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface IModal {
  children: React.ReactNode;
  className?: string;
  onClose?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ModalBackdrop = ({
  children,
  className = "",
  onClose = () => {
    return;
  },
}: IModal) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return ReactDOM.createPortal(
      <div
        onClick={onClose}
        className={`absolute inset-0 h-screen ${className}`}
      >
        {children}
      </div>,
      document.getElementById("modal-root") as Element
    );
  }

  return null;
};

export default ModalBackdrop;
