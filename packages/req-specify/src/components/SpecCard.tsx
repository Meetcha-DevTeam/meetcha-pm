import type { ReactNode } from "react";

interface SpecCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const SpecCard = ({ title, children, className = "" }: SpecCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}; 