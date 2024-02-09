import { createContext, useState } from "react";
import { Etapas } from "../entitys/etapas";
import { User } from "../entitys/user";
import { Periodo } from "../entitys/periodo";

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
  user: {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
  };
  periodo: {
    periodo: Periodo;
    setPeriodo: React.Dispatch<React.SetStateAction<Periodo>>;
  };
}

export const GlobalContext = createContext<ContextGlobal>({} as ContextGlobal);

export const GlobalProvider = ({ children }) => {
  const [areas, setAreas] = useState<Areas[]>([
    { id: 0, nombre: "", añoId: 0 },
  ]);
  const [alumnoId, setAlumnoId] = useState({} as Etapas);
  const [user, setUser] = useState({} as User);
  const [periodo, setPeriodo] = useState({} as Periodo);
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
        user: {
          user,
          setUser,
        },
        periodo: {
          periodo,
          setPeriodo,
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
