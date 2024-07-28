import React from "react";

interface CardProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <h2 className="text-xl font-semibold bg-gray-50 p-4 border-b">{title}</h2>
      <div className="p-4">{children}</div>
    </div>
  );
};