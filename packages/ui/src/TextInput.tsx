"use client"

interface TextInputProps {
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
  type?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  onChange,
  label,
  type = "text"
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        onChange={(e) => onChange(e.target.value)}
        type={type}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        placeholder={placeholder}
      />
    </div>
  );
};