import { useState } from "react";
import "./app.css";
import type { Spec } from "./types/base";
import { generateSpec } from "./utils/generateSpec";

function App() {
  const [specMap] = useState<Map<string, Spec>>(() => generateSpec());

  return (
    <>
      {Array.from(specMap.values()).map((spec) => (
        <div key={spec.id}>
          <h1>{spec.name}</h1>
          <p>{spec.description}</p>
        </div>
      ))}
    </>
  );
}

export default App;
