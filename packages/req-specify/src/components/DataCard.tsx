import { SpecCard } from "./SpecCard";
import type { Schema } from "../types/base";

interface DataCardProps {
  title: string;
  data: (string | Schema)[];
}

export const DataCard = ({ title, data }: DataCardProps) => {
  return (
    <SpecCard title={title}>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-md p-3">
            {typeof item === "string" ? (
              <span className="text-gray-700">{item}</span>
            ) : (
              <div>
                <div className="font-medium text-gray-900">{item.name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">타입:</span> {item.type}
                  {item.required && (
                    <span className="ml-2 text-red-600">(필수)</span>
                  )}
                </div>
                {item.limit && (
                  <div className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">제한:</span> {item.limit}
                  </div>
                )}
                {item.description && (
                  <div className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </div>
                )}
                {item.default && (
                  <div className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">기본값:</span> {item.default}
                  </div>
                )}
                {item.placeholder && (
                  <div className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">플레이스홀더:</span> {item.placeholder}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </SpecCard>
  );
}; 