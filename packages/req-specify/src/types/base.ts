export interface Schema {
  name: string;
  limit?: string;
  default?: string;
  type: string;
  description?: string;
  placeholder?:string;
  required?:boolean;
}

export interface Edge {
  id: string;
  /**
   * `id`에 해당하는 스펙으로 진입하기 위해 유저가 취하는 행동
   */
  action?: string;
}

export interface Spec {
  id: string;
  name: string;
  description: string;
  /**
   * 구현 우선 순위
   */
  priority: number;
  /**
   * 입력 데이터
   */
  input?: (string | Schema)[];
  /**
   * 출력 데이터
   */
  output?: (string | Schema)[];
  /**
   * 유저 시나리오
   */
  scenarios: string[];
  /**
   * 해당 스펙으로 이뤄지는 상위 스펙
   */
  children?: string[];
  /**
   * 해당 스펙을 통해 진입하는 다른 스펙
   */
  export?: Edge[];
  /**
   * 디자인 특이사항
   */
  design?: string;
}
