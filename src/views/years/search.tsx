import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { TableCustom } from "../table/TableCustom";
import { GlobalContext } from "../../config/context/GlobalContext";
import { Etapas } from "../../config/entitys/etapas";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Search = () => {
  const { id } = useParams();
  const [anio, setAnio] = useState({});
  const [secciones, setSecciones] = useState({ seccion: "loading", id: 0 });
  //  @ts-ignore
  const [alumnos, setAlumnos] = useState([{ id: 0 } as Etapas]);
  const { areas, alumno } = useContext(GlobalContext);

  const navigate = useNavigate();

  const getData = async () => {
    console.log("ID SECCION", id);
    // @ts-ignore
    const findSecciones = await getSecciones(id);
    console.log(findSecciones);

    // @ts-ignore
    const anio = await window.API.getAnio(findSecciones.anio.id);
    console.log(anio);
    setAnio(anio);

    const findAlumnos = await getAlumno(findSecciones.id);
    console.log(findAlumnos);
  };

  const getSecciones = async (id) => {
    console.log("id anio", id);
    // @ts-ignore
    const findSecciones = await window.API.getSeccion(id);
    console.log(findSecciones);
    setSecciones(findSecciones);
    // @ts-ignore
    return findSecciones;
  };

  const getAreas = async (id) => {
    console.log("id anio", id);
    // @ts-ignore
    const findAreas = await window.API.getAreas(id);
    areas.setAreas(findAreas);
    console.log(findAreas);

    // @ts-ignore
    return { findAreas };
  };

  const getAlumno = async (id) => {
    console.log("id seccion", id);
    // @ts-ignore
    const findSecciones = await window.API.getAlumnosGraduados();

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
        alumno.periodo = alumno.anio.periodo.periodo;
        return alumno;
      })
    );

    // @ts-ignore
    return findSecciones;
  };

  const handleClickRow = async (param) => {
    console.log(param);
    await getAreas(alumnos.find((datos) => datos.id === param.id)?.anio.id);

    alumno.setAlumnoId(
      alumnos.find((datos) => datos.id === param.id) as Etapas
    );
    navigate("/alumno");
  };

  useEffect(() => {
    (async () => {
      await getData();
      console.log("id", id);
    })();
  }, []);

  return (
    <Box
      className="animate__animated animate__fadeInRight"
      component="main"
      sx={{ flexGrow: 1, p: 3 }}
    >
      <DrawerHeader />

      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          width="100%"
          textAlign="center"
          variant="h4"
          component="h1"
          gutterBottom
        >
          Alumnos Graduados
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row-reverse",
          marginTop: "2rem",
        }}
      >
        {/*         <Button
          onClick={handleOpen}
          sx={{
            fontWeight: "bold",
          }}
          variant="outlined"
        >
          Agregar Alumno
        </Button> */}
      </Box>
      <TableCustom
        toolbar
        columns={[
          {
            field: "id",
            headerName: "ID",
            disableExport: true,
            hide: true,
          },
          {
            field: "dni",
            headerName: "C.I",
            headerClassName: "backGround",
            width: 130,

            headerAlign: "center",
            flex: 1,
            align: "center",
          },
          {
            field: "firstName",
            headerName: "Nombre",
            width: 130,
            headerClassName: "backGround",
            headerAlign: "center",
            flex: 1,
            align: "center",
          },
          {
            field: "secondName",
            headerName: "Segundo Nombre",
            width: 130,
            headerClassName: "backGround",
            headerAlign: "center",
            flex: 1,
            align: "center",
          },
          {
            field: "Surname",
            headerName: "Apellido",
            width: 130,
            headerClassName: "backGround",
            headerAlign: "center",
            flex: 1,
            align: "center",
          },
          {
            field: "secondSurname",
            headerName: "Segundo Apellido",
            width: 130,
            headerClassName: "backGround",
            headerAlign: "center",
            flex: 1,
            align: "center",
          },
          {
            field: "periodo",
            headerName: "Periodo",
            width: 130,
            headerClassName: "backGround",
            headerAlign: "center",
            flex: 1,
            align: "center",
          },
        ]}
        rows={alumnos}
        loading={false}
        handleDobleClick={() => {
          console.log("first");
        }}
        handleClick={handleClickRow}
      />
    </Box>
  );
};

export default Search;
