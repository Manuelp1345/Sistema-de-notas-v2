export interface CredentialDB {
  host: string;
  user: string;
  password: string;
  pass?: string;
  port: number;
  database: string;
}

export interface Alumno {
  DateOfBirth: string;
  Phone: string;
  Surname: string;
  address: string;
  city: string;
  condicion: string;
  dni: string;
  email: string;
  firstName: string;
  grupoEstable: string;
  id: number;
  idDatos: number;
  municipality: string;
  observacion: string;
  secondName: string;
  secondSurname: string;
  sexo: string;
  state: string;
}
