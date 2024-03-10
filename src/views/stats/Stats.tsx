import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
  ResponsiveContainer,
  BarChart,
  Rectangle,
  Pie,
  PieChart,
  Cell,
  Scatter,
} from "recharts";

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
import moment from "moment";

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
  const [periodos, setPeriodos] = React.useState<any>([]);
  const [periodoSelected, setPeriodoSelected] = React.useState<any>(-1);
  const [sizeScreen, setSizeScreen] = React.useState<any>(window.innerWidth);
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

  const getPeriodos = async (filter: any) => {
    // @ts-ignore
    const data = await window.API.getPeriodos(filter);
    setPeriodos(data[0]);
    return data[0];
  };

  React.useEffect(() => {
    if (secciones !== -1) getAlumno();
  }, [secciones]);

  React.useEffect(() => {
    if (periodoSelected !== -1) getAniosAndSecciones();
  }, [periodoSelected]);

  React.useEffect(() => {
    getPeriodos({ pageIndex: 1, pageSize: 3 });
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setSizeScreen(window.innerWidth);
    });
  }, []);

  const yearOldAverage = () => {
    const total = alumnos.map((alumno: any) => ({
      name: `${alumno.firstName} ${alumno.Surname}`,
      Edad: moment().diff(alumno.alumno.DatosPersonales.DateOfBirth, "years"),
      año: alumno.alumno.DatosPersonales.DateOfBirth,
    }));

    console.log("total", total);

    return total;
  };

  const genderCount = () => {
    const female = alumnos.filter((alumno: any) => {
      return alumno.alumno.DatosPersonales.sexo === "F";
    }).length;
    const male = alumnos.filter((alumno: any) => {
      return alumno.alumno.DatosPersonales.sexo === "M";
    }).length;

    return [
      {
        name: "Femenino",
        value: female,
      },
      {
        name: "Masculino",
        value: male,
      },
    ];
  };
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    value,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {value}
      </text>
    );
  };
  console.log("alumnos", alumnos);

  return (
    <Box
      className="animate__animated animate__fadeInRight"
      component="main"
      sx={{ flexGrow: 1, p: 3, overflow: "auto !important" }}
    >
      <DrawerHeader />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
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
            width: "100%",
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120, width: "33.3%" }}>
            <InputLabel>Periodo</InputLabel>
            <Select
              label="Periodo"
              value={periodoSelected}
              onChange={(e) => setPeriodoSelected(e.target.value)}
            >
              {periodos.map((item: any) => {
                return <MenuItem value={item.id}>{item.periodo}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120, width: "33.3%" }}>
            <InputLabel>Año</InputLabel>
            <Select
              label="Año"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              disabled={periodoSelected === -1}
            >
              {aniosAndSecciones.map((item: any) => {
                return <MenuItem value={item.id}>{item.anio}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120, width: "33.3%" }}>
            <InputLabel>Seccion</InputLabel>
            <Select
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
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: window.innerWidth < 1024 ? "column" : "row",
            gap: 5,
          }}
        >
          <Box
            sx={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography>Grafico de Genero</Typography>
            <PieChart width={600} height={400}>
              <Pie
                data={genderCount()}
                cx="51%"
                cy="40%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {genderCount().map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Box>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography>Promedio de edad</Typography>
            <LineChart
              width={500}
              height={300}
              data={yearOldAverage()}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="natural"
                dataKey="Edad"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </Box>
        </Box>
      </Box>

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
