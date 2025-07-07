import { createContext, useContext } from "react";
import type { Spec } from "../types/base";
import { generateSpec } from "../utils/generateSpec";

export const SpecContext = createContext<Map<string, Spec>>(generateSpec());

export const useSpec = () => {
    const specMap = useContext(SpecContext);
    return specMap;
}