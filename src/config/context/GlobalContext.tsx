import { createContext, useState } from "react";
import { Etapas } from "../entitys/etapas";

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
    alumnoId: Etapas;
    setAlumnoId: React.Dispatch<React.SetStateAction<Etapas>>;
  };
}

export const GlobalContext = createContext<ContextGlobal>({} as ContextGlobal);

export const GlobalProvider = ({ children }) => {
  const [areas, setAreas] = useState<Areas[]>([
    { id: 0, nombre: "", añoId: 0 },
  ]);
  const [alumnoId, setAlumnoId] = useState({} as Etapas);
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
