import { createContext, useState } from "react";
import { Alumno } from "../types";

interface Areas {
  id: number;
  nombre: string;
  añoId: number;
}

interface ContextGlobal {
  areas: {
    areas: Areas[] | undefined;
    setAreas: React.Dispatch<React.SetStateAction<Areas[]>>;
  };
  alumno: {
    alumnoId: Alumno;
    setAlumnoId: React.Dispatch<React.SetStateAction<Alumno>>;
  };
}

export const GlobalContext = createContext<ContextGlobal>({} as ContextGlobal);

export const GlobalProvider = ({ children }) => {
  const [areas, setAreas] = useState<Areas[]>([
    { id: 0, nombre: "", añoId: 0 },
  ]);
  const [alumnoId, setAlumnoId] = useState({} as Alumno);
  return (
    <GlobalContext.Provider
      value={{
        areas: {
          areas,
          setAreas,
        },
        alumno: {
          alumnoId,
          setAlumnoId,
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
