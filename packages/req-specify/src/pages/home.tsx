import { Link } from "react-router-dom";
import { useSpec } from "../hooks/useSpec";

export const HomePage = () => {
  const {specMap} = useSpec();
  return (
    <div>
      {Array.from(specMap.values()).map((spec) => (
        <Link key={spec.id} to={`/${spec.id}`}>
          <p>{spec.name}</p>
        </Link>
      ))}
    </div>
  );
};
