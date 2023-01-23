import { Etapas } from "./entitys/etapas";
export interface CredentialDB {
  host: string;
  user: string;
  password: string;
  pass?: string;
  port: number;
  database: string;
}
