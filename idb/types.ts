
export interface Scenario {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  benefits: {
    labirintar: string[];
    idb: string[];
  };
  remuneration: string;
  equity?: string;
}
