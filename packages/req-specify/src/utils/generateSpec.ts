import * as specs from "../specs";
import type { Spec } from "../types/base";

const validateSpecExport = (specMap: Map<string, Spec>) => {
  Object.values(specs).forEach((spec) => {
    if (spec.export) {
      spec.export.forEach((edge) => {
        if (!specMap.has(edge.id)) {
          throw new Error(
            `${spec.name} 에서 export되는 ${edge.id} 가 존재하지 않음`
          );
        }
      });
    }
  });
};

const validateSpecChildren = (specMap: Map<string, Spec>) => {
  Object.values(specs).forEach((spec) => {
    if (spec.children) {
      spec.children.forEach((child) => {
        if (!specMap.has(child)) {
          throw new Error(`${spec.name} 의 자식 ${child} 가 존재하지 않음`);
        }
      });
    }
  });
};

export const generateSpec = () => {
  const specMap = new Map<string, Spec>();
  const parentMap = new Map<string, string | null>();
  const importMap = new Map<string, string[]>();

  Object.values(specs).forEach((spec) => {
    if (specMap.has(spec.id)) {
      throw new Error(
        `아이디 ${spec.id} 가 중복, ${specMap.get(spec.id)?.name} 과 ${
          spec.name
        } 확인`
      );
    }

    specMap.set(spec.id, spec);
    if (spec.children) {
      spec.children.forEach((child) => {
        parentMap.set(child, spec.id);
      });
    }
    if (spec.export) {
      spec.export.forEach((edge) => {
        importMap.set(edge.id, [...(importMap.get(edge.id) || []), spec.id]);
      });
    }
  });

  validateSpecExport(specMap);
  validateSpecChildren(specMap);

  return { specMap, parentMap, importMap };
};
