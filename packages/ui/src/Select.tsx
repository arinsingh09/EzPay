"use client"

import React from "react";

interface SelectProps {
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
  label: string;
}

export const Select: React.FC<SelectProps> = ({ options, onSelect, label }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
      >
        {options.map(option => (
          <option key={option.key} value={option.key}>{option.value}</option>
        ))}
      </select>
    </div>
  );
};