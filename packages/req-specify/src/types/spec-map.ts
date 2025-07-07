import type { Spec } from "./base";

export type SpecMap = Map<string, Spec>;
export type ParentMap = Map<string, string | null>;
export type ImportMap = Map<string, string[]>;

export interface SpecStructure {
    specMap: SpecMap;
    parentMap: ParentMap;
    importMap: ImportMap;
}