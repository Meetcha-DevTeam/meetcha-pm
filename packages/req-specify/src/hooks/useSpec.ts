import { createContext, useContext } from "react";
import { generateSpec } from "../utils/generateSpec";
import type { SpecStructure } from "../types/spec-map";

export const SpecContext = createContext<SpecStructure>(generateSpec());

export const useSpec = () => {
  const specStructure = useContext(SpecContext);
  return specStructure;
};
