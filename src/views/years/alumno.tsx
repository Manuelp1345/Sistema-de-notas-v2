import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Swal from "sweetalert2";
import { GlobalContext } from "../../config/context/GlobalContext";
import { TableCustom } from "../table/TableCustom";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Alumno = (): JSX.Element => {
  const { id } = useParams();
  const [anio, setAnio] = useState([{}]);
  const [secciones, setSecciones] = useState({});
  const navigate = useNavigate();
  const { areas, alumno } = useContext(GlobalContext);

  const getData = async () => {
    // @ts-ignore
    const anio = await window.API.getAnio(id);
    console.log(anio);
    setAnio(anio);
    // @ts-ignore
    const findSecciones = await getSecciones(anio.id);
    console.log(findSecciones);
    const findAreas = await getAreas(anio.id);
    console.log(findAreas);
  };

  const getSecciones = async (id) => {
    console.log("id anio", id);
    // @ts-ignore
    const findSecciones = await window.API.getSecciones(id);
    console.log(findSecciones);
    setSecciones({ data: findSecciones, itemsCount: 0 });
    // @ts-ignore
    return { data: findSecciones, itemsCount: 0 };
  };
  const getAreas = async (id) => {
    console.log("id anio", id);
    // @ts-ignore
    const findAreas = await window.API.getAreas(id);
    console.log(findAreas);

    // @ts-ignore
    return { data: findAreas, itemsCount: 0 };
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
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowBack sx={{ mr: 1 }} />
        Volver
      </Button>
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
          Datos del Alumno <br />
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 2.5,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",

            gap: 2,
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <TextField
            value={alumno.alumnoId.firstName}
            /*           onChange={(e) =>
            setDatosAlumno({
              ...datosAlumno,
              firsName: e.target.value,
            })
          } */
            label="Primer Nombre"
            variant="standard"
          />
          <TextField
            value={alumno.alumnoId.secondName}
            /*           onChange={(e) =>
            setDatosAlumno({
              ...datosAlumno,
              firsName: e.target.value,
            })
          } */
            label="Segundo Nombre"
            variant="standard"
          />
          <TextField
            value={alumno.alumnoId.Surname}
            /*           onChange={(e) =>
            setDatosAlumno({
              ...datosAlumno,
              firsName: e.target.value,
            })
          } */
            label="Primer Apellido"
            variant="standard"
          />
          <TextField
            value={alumno.alumnoId.secondSurname}
            /*           onChange={(e) =>
            setDatosAlumno({
              ...datosAlumno,
              firsName: e.target.value,
            })
          } */
            label="Segundo Apellido"
            variant="standard"
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Condicion</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={alumno.alumnoId.condicion}
              label="Condicion"
              disabled
              /*           onChange={handleChange} */
            >
              <MenuItem value={"Nuevo Ingreso"}>Nuevo Ingreso</MenuItem>
              <MenuItem value={"Regular"}>Regular</MenuItem>
              <MenuItem value={"Repitiente"}>Repitiente</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <br />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",

            gap: 2,
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <TextField
            value={alumno.alumnoId.dni}
            /*           onChange={(e) =>
            setDatosAlumno({
              ...datosAlumno,
              firsName: e.target.value,
            })
          } */
            label="Cedula /Pasaporte /Cedula Escolar"
            variant="standard"
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"M"}
              label="Condicion"
              disabled
              /*           onChange={handleChange} */
            >
              <MenuItem value={"F"}>Femenino</MenuItem>
              <MenuItem value={"M"}>Masculino</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Fecha de nacimiento
            </InputLabel>
            <Input
              value={alumno.alumnoId.DateOfBirth}
              type="Date"
              /*                             onBlur={(e) => {
                              //@ts-ignore

                              console.log(e.target.value);
                              setDatosAlumno({
                                ...datosAlumno,
                                //@ts-ignore
                                fechaNacimiento:
                                  //@ts-ignore
                                  e.target.value,
                              });
                              console.log(datosAlumno);
                            }}
                            onChangeCapture={(e) => {
                              //@ts-ignore

                              console.log(e.target.value);
                              setDatosAlumno({
                                ...datosAlumno,
                                //@ts-ignore
                                fechaNacimiento:
                                  //@ts-ignore
                                  e.target.value,
                              });
                              console.log(datosAlumno);
                            }} */
            />
          </FormControl>

          <TextField
            value={alumno.alumnoId.email}
            /*           onChange={(e) =>
            setDatosAlumno({
              ...datosAlumno,
              firsName: e.target.value,
            })
          } */
            label="Correo"
            variant="standard"
          />
          <TextField
            value={alumno.alumnoId.grupoEstable}
            /*           onChange={(e) =>
            setDatosAlumno({
              ...datosAlumno,
              firsName: e.target.value,
            })
          } */
            label="Grupo estable"
            variant="standard"
          />
        </Box>
        <br />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",

            gap: 2,
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <TextField
            value={alumno.alumnoId.Phone}
            /*           onChange={(e) =>
            setDatosAlumno({
              ...datosAlumno,
              firsName: e.target.value,
            })
          } */
            label="Telefono"
            variant="standard"
          />
          <TextField
            value={alumno.alumnoId.address}
            /*           onChange={(e) =>
            setDatosAlumno({
              ...datosAlumno,
              firsName: e.target.value,
            })
          } */
            label="Direccion"
            variant="standard"
          />

          <TextField
            value={alumno.alumnoId.municipality}
            /*           onChange={(e) =>
            setDatosAlumno({
              ...datosAlumno,
              firsName: e.target.value,
            })
          } */
            label="Municipio"
            variant="standard"
          />
          <TextField
            value={alumno.alumnoId.state}
            /*           onChange={(e) =>
            setDatosAlumno({
              ...datosAlumno,
              firsName: e.target.value,
            })
          } */
            label="Estado"
            variant="standard"
          />
        </Box>
        <br />

        <TextField
          sx={{ flex: 1 }}
          value={alumno.alumnoId.observacion}
          /*           onChange={(e) =>
            setDatosAlumno({
              ...datosAlumno,
              firsName: e.target.value,
            })
          } */
          label="Nota"
          variant="standard"
        />
      </Box>

      <Box sx={{ marginTop: "2.5rem" }} id="Secciones" component="div"></Box>
      <Box>
        <Typography
          variant="h4"
          sx={{ marginTop: "0.5rem", textAlign: "center" }}
        >
          Áreas
        </Typography>
        <TableCustom
          columns={[
            {
              field: "id",
              headerName: "ID",
              disableExport: true,
              hide: true,
            },
            {
              field: "nombre",
              headerName: "Area",
              headerClassName: "backGround",
              width: 130,

              headerAlign: "center",
              flex: 1,
              align: "center",
            },
            {
              field: "firstName",
              headerName: "Primer Momento",
              width: 130,
              headerClassName: "backGround",
              headerAlign: "center",
              flex: 1,
              align: "center",
            },
            {
              field: "firstNamea",
              headerName: "Segundo Momento",
              width: 130,
              headerClassName: "backGround",
              headerAlign: "center",
              flex: 1,
              align: "center",
            },
            {
              field: "firstNames",
              headerName: "Tercer Momento",
              width: 130,
              headerClassName: "backGround",
              headerAlign: "center",
              flex: 1,
              align: "center",
            },
          ]}
          rows={areas.areas}
          loading={false}
          handleClick={() => {
            console.log("first");
          }}
          handleDobleClick={() => {
            console.log("first");
          }}
          toolbar
        />
      </Box>
    </Box>
  );
};

export default Alumno;
