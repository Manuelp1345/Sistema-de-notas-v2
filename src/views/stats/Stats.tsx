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
  const [maxNote, setMaxNote] = React.useState<any>({
    value: 20,
    name: "",
  });
  const [minNote, setMinNote] = React.useState<any>({
    value: 20,
    name: "",
  });
  const navigate = useNavigate();

  const getAniosAndSecciones = async () => {
    //@ts-ignore
    const response = await window.API.getAniosAndSecciones(periodoSelected);
    const alumnosPeriodo = await queryToDataBase(
      `SELECT
      *,
          SUM(nota.nota) AS total_notas,
          AVG(nota.nota) AS promedio_nota
      FROM anio
      INNER JOIN etapas ON anio.id = etapas.anioId
      INNER JOIN alumno on etapas.alumnoId = alumno.id
      INNER JOIN nota on nota.alumnoId = alumno.id
	    INNER JOIN seccion on etapas.seccioneId = seccion.id
      INNER JOIN basic_data on basic_data.id = alumno.datosPersonalesId
      WHERE anio.periodoId=${periodoSelected}
      GROUP BY alumno.id;`
    );

    const findMAxNote = alumnosPeriodo.map((alumno: any) => {
      return {
        name: `${alumno.firstName} ${alumno.Surname} | C.I ${alumno.dni} | ${alumno.anio} ${alumno.seccion}`,
        value: alumno.promedio_nota,
      };
    });
    const maxNoteValue = Math.max(
      ...findMAxNote.map((item: any) => item.value)
    );
    const minNoteValue = Math.min(
      ...findMAxNote.map((item: any) => item.value)
    );
    setMaxNote(findMAxNote.find((item: any) => item.value === maxNoteValue));
    setMinNote(findMAxNote.find((item: any) => item.value === minNoteValue));

    setAlumnos(alumnosPeriodo);
    setAniosAndSecciones(response);
  };

  const getAlumno = async () => {
    const alumnosPeriodo = await queryToDataBase(
      `SELECT
      *,
          SUM(nota.nota) AS total_notas,
          AVG(nota.nota) AS promedio_nota
      FROM anio
      INNER JOIN etapas ON anio.id = etapas.anioId
      INNER JOIN alumno on etapas.alumnoId = alumno.id
	    INNER JOIN seccion on etapas.seccioneId = seccion.id
      INNER JOIN nota on nota.alumnoId = alumno.id
      INNER JOIN basic_data on basic_data.id = alumno.datosPersonalesId
      WHERE anio.periodoId=${periodoSelected} AND etapas.anioId=${year} AND etapas.seccioneId=${secciones}
      GROUP BY alumno.id;`
    );

    console.log("alumnosPeriodo", alumnosPeriodo);
    const findMAxNote = alumnosPeriodo.map((alumno: any) => {
      return {
        name: `${alumno.firstName} ${alumno.Surname} | C.I ${alumno.dni} | ${alumno.anio} ${alumno.seccion}`,
        value: alumno.promedio_nota,
      };
    });
    const maxNoteValue = Math.max(
      ...findMAxNote.map((item: any) => item.value)
    );
    const minNoteValue = Math.min(
      ...findMAxNote.map((item: any) => item.value)
    );

    setMaxNote(findMAxNote.find((item: any) => item.value === maxNoteValue));
    setMinNote(findMAxNote.find((item: any) => item.value === minNoteValue));

    setAlumnos(alumnosPeriodo);
  };

  const queryToDataBase = async (query) => {
    // @ts-ignore
    const response = await window.API.createQuery(query);
    console.log("responseQeury", response);
    return response;
  };

  const getPeriodos = async (filter: any) => {
    // @ts-ignore
    const data = await window.API.getPeriodos(filter);
    setPeriodos(data[0]);
    return data[0];
  };

  const getAlumnosAnio = async () => {
    const alumnosPeriodo = await queryToDataBase(
      `SELECT
      *,
          SUM(nota.nota) AS total_notas,
          AVG(nota.nota) AS promedio_nota
      FROM anio
      INNER JOIN etapas ON anio.id = etapas.anioId
      INNER JOIN alumno on etapas.alumnoId = alumno.id
      INNER JOIN nota on nota.alumnoId = alumno.id
	    INNER JOIN seccion on etapas.seccioneId = seccion.id
      INNER JOIN basic_data on basic_data.id = alumno.datosPersonalesId
      WHERE anio.periodoId=${periodoSelected} AND etapas.anioId=${year}
      GROUP BY alumno.id;`
    );
    const findMAxNote = alumnosPeriodo.map((alumno: any) => {
      return {
        name: `${alumno.firstName} ${alumno.Surname} | C.I ${alumno.dni} | ${alumno.anio} ${alumno.seccion}`,
        value: alumno.promedio_nota,
      };
    });
    const maxNoteValue = Math.max(
      ...findMAxNote.map((item: any) => item.value)
    );
    const minNoteValue = Math.min(
      ...findMAxNote.map((item: any) => item.value)
    );

    setMaxNote(findMAxNote.find((item: any) => item.value === maxNoteValue));
    setMinNote(findMAxNote.find((item: any) => item.value === minNoteValue));

    setAlumnos(alumnosPeriodo);
  };

  React.useEffect(() => {
    if (secciones !== -1) getAlumno();
  }, [secciones]);
  React.useEffect(() => {
    setSecciones(-1);

    if (year !== -1) {
      getAlumnosAnio();
    }
  }, [year]);

  React.useEffect(() => {
    setSecciones(-1);
    setYear(-1);
    if (periodoSelected !== -1) {
      getAniosAndSecciones();
    }
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
      Edad: moment().diff(
        alumno?.alumno
          ? alumno?.alumno.DatosPersonales.DateOfBirth
          : alumno.DateOfBirth,
        "years"
      ),
      año: alumno?.alumno
        ? alumno.alumno.DatosPersonales.DateOfBirth
        : alumno.DateOfBirth,
    }));

    console.log("total", total);

    return total;
  };

  const genderCount = () => {
    const female = alumnos.filter((alumno: any) => {
      return alumno.alumno
        ? alumno?.alumno.DatosPersonales.sexo === "F"
        : alumno.sexo === "F";
    }).length;
    const male = alumnos.filter((alumno: any) => {
      return alumno.alumno
        ? alumno.alumno.DatosPersonales.sexo === "M"
        : alumno.sexo === "M";
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
        {periodoSelected !== -1 && (
          <>
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                mt: 2,
              }}
            >
              Total de Alumnos: {alumnos.length}
            </Typography>
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                mt: 2,
              }}
            >
              Mayor promedio de Nota: {maxNote.value.toFixed(2)} {maxNote.name}
            </Typography>
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                mt: 2,
              }}
            >
              Menor promedio de Nota: {minNote.value.toFixed(2)} {minNote.name}
            </Typography>
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
          </>
        )}
      </Box>
    </Box>
  );
}
