import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import { GlobalContext } from "../../config/context/GlobalContext";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { LineChart, Line } from "recharts";
const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 300, pv: 2400, amt: 2400 },
  { name: "Page C", uv: 200, pv: 2400, amt: 2400 },
  { name: "Page D", uv: 278, pv: 2400, amt: 2400 },
  { name: "Page E", uv: 189, pv: 2400, amt: 2400 },
  { name: "Page F", uv: 239, pv: 2400, amt: 2400 },
  { name: "Page G", uv: 349, pv: 2400, amt: 2400 },
  { name: "Page H", uv: 349, pv: 2400, amt: 2400 },
  { name: "Page I", uv: 349, pv: 2400, amt: 2400 },
  { name: "Page J", uv: 349, pv: 2400, amt: 2400 },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Stats() {
  const { user, periodo } = React.useContext<any>(GlobalContext);
  const [aniosAndSecciones, setAniosAndSecciones] = React.useState<any>([]);
  const [secciones, setSecciones] = React.useState<any>(-1);
  const [year, setYear] = React.useState<any>(-1);
  const [alumnos, setAlumnos] = React.useState<any>([]);
  const navigate = useNavigate();

  const getAniosAndSecciones = async () => {
    //@ts-ignore
    const response = await window.API.getAniosAndSecciones(periodo.periodo.id);
    setAniosAndSecciones(response);
  };

  const getAlumno = async () => {
    // @ts-ignore
    const findSecciones = await window.API.getAlumno(secciones);

    console.log("findSecciones", findSecciones);

    setAlumnos(
      findSecciones.map((alumno) => {
        alumno.firstName =
          `${alumno.alumno.DatosPersonales.firstName}`.toLocaleUpperCase();
        alumno.secondName =
          `${alumno.alumno.DatosPersonales.secondName}`.toLocaleUpperCase();
        alumno.Surname =
          `${alumno.alumno.DatosPersonales.Surname}`.toLocaleUpperCase();
        alumno.secondSurname =
          `${alumno.alumno.DatosPersonales.secondSurname}`.toLocaleUpperCase();
        alumno.dni = alumno.alumno.DatosPersonales.dni;
        return alumno;
      })
    );

    // @ts-ignore
    return findSecciones;
  };

  React.useEffect(() => {
    if (secciones !== -1) getAlumno();
  }, [secciones]);

  React.useEffect(() => {
    getAniosAndSecciones();
  }, []);

  console.log("alumnos", alumnos);

  return (
    <Box
      className="animate__animated animate__fadeInRight"
      component="main"
      sx={{ flexGrow: 1, p: 3, overflow: "auto !important" }}
    >
      <DrawerHeader />

      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 5,
        }}
        variant="h4"
        component="div"
        gutterBottom
      >
        Estadisticas
      </Typography>

      <Box
        sx={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 120, width: "33.3%" }}>
          <InputLabel id="demo-simple-select-helper-label">Año</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Año"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {aniosAndSecciones.map((item: any) => {
              return <MenuItem value={item.id}>{item.anio}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120, width: "33.3%" }}>
          <InputLabel id="demo-simple-select-helper-label">Año</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Año"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {aniosAndSecciones.map((item: any) => {
              return <MenuItem value={item.id}>{item.anio}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120, width: "33.3%" }}>
          <InputLabel id="demo-simple-select-helper-label">Seccion</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Seccion"
            value={secciones}
            onChange={(e) => setSecciones(e.target.value)}
            disabled={year === -1}
          >
            {aniosAndSecciones
              .filter((item: any) => item.id === year)
              .map((item: any) => {
                return item.secciones.map((seccion: any) => {
                  return (
                    <MenuItem value={seccion.id}>{seccion.seccion}</MenuItem>
                  );
                });
              })}
          </Select>
        </FormControl>
      </Box>

      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>

      {user.user.role === "USER" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            mt: 2,
            gap: 5,
          }}
        >
          <Button variant="contained">Generar Consulta</Button>
          <Button onClick={() => navigate("/logout")} variant="contained">
            <LogoutIcon /> Salir del sistema
          </Button>
        </Box>
      )}
    </Box>
  );
}
