import { SpecCard } from "./SpecCard";

interface ScenariosCardProps {
  scenarios: string[];
}

export const ScenariosCard = ({ scenarios }: ScenariosCardProps) => {
  return (
    <SpecCard title="유저 시나리오">
      <ul className="space-y-3">
        {scenarios.map((scenario, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 text-sm font-medium rounded-full mr-3 mt-0.5">
              {index + 1}
            </span>
            <span className="text-gray-700">{scenario}</span>
          </li>
        ))}
      </ul>
    </SpecCard>
  );
}; 