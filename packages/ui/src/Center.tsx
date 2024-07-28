import { ReactNode } from "react";

interface CenterProps {
  children: ReactNode;
}

export const Center = ({ children }: CenterProps) => {
  return (
    <div className="flex justify-center flex-col h-full">
      <div className="flex justify-center">
        {children}
      </div>
    </div>
  );
};