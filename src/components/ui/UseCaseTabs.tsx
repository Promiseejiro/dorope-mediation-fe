"use client";
import React from "react";

type Tab = {
  Name: string;
  value: string;
  icon: string;
};

interface Props {
  tabs: Tab[];
  active: string;
  onChange: (value: string) => void;
  className?: string;
}

const UseCaseTabs: React.FC<Props> = ({
  tabs,
  active,
  onChange,
  className,
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative flex bg-gray-100 rounded-xl px-2 py-1 border border-gray-300 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`relative z-10 px-8 py-3 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-300 min-w-[140px] justify-center ${
              active === tab.value
                ? "text-primary font-semibold bg-white shadow-sm ease-in-out"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <i className={`${tab.icon} text-lg`}></i>
            {tab.Name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UseCaseTabs;
