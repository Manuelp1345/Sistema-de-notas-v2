import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
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
  const navigate = useNavigate();
  const { areas, alumno } = useContext(GlobalContext);
  const getNotas = async (data) => {
    // @ts-ignore
    const resnotas = await window.API.getNotas(data);
    console.log(resnotas);
    const notasMap = {};
    resnotas.forEach((nota) => {
      notasMap[`${nota.materia.id}-${nota.momento}`] = nota;
    });

    console.log(notasMap);

    return notasMap;
  };

  const handledSetNota = async (newCell) => {
    console.log(newCell);
    const data = newCell;
    if (newCell["1"]) {
      data.nota = newCell["1"];
      data.momento = "1";
    }
    if (newCell["2"]) {
      data.nota = newCell["2"];
      data.momento = "2";
    }
    if (newCell["3"]) {
      data.nota = newCell["3"];
      data.momento = "3";
    }

    // @ts-ignore
    data.alumnoId = alumno.alumnoId.id;

    delete data.firstName;

    console.log("data", data);

    // @ts-ignore
    const res = await window.API.setNota(data);
    console.log(res);

    await getData();

    return newCell;
  };

  const getData = async () => {
    // @ts-ignore
    const anio = await window.API.getAnio(id);
    console.log(anio);
    // @ts-ignore
    const findSecciones = await getSecciones(anio.id);
    console.log(findSecciones);
    const findAreas = await getAreas(anio.id);
    console.log(findAreas);
    const resNotas = await getNotas({
      alumnoId: alumno.alumnoId.id,
      añoId: anio.id,
    });

    console.log(resNotas);

    if (areas.areas)
      areas.setAreas(
        areas.areas.map((area) => {
          if (resNotas[`${area.id}-1`]) {
            area["1"] = resNotas[`${area.id}-1`].nota;
          }
          if (resNotas[`${area.id}-2`]) {
            area["2"] = resNotas[`${area.id}-2`].nota;
          }
          if (resNotas[`${area.id}-3`]) {
            area["3"] = resNotas[`${area.id}-3`].nota;
          }

          let total = "0";

          if (area["1"] && area["2"] && area["3"])
            total = (
              (Number(resNotas[`${area.id}-1`].nota) +
                Number(resNotas[`${area.id}-2`].nota) +
                Number(resNotas[`${area.id}-3`].nota)) /
              3
            ).toFixed(2);

          // @ts-ignore
          area["total"] = isNaN(Number(total)) ? 0 : total;

          return area;
        })
      );
  };

  const getSecciones = async (id) => {
    console.log("id anio", id);
    // @ts-ignore
    const findSecciones = await window.API.getSecciones(id);
    console.log(findSecciones);
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
              field: "1",
              headerName: "Primer Momento",
              width: 130,
              headerClassName: "backGround",
              headerAlign: "center",
              flex: 1,
              type: "number",

              align: "center",
              editable: true,
            },
            {
              field: "1rp",
              headerName: "Ajuste Primer Momento",
              width: 130,
              headerClassName: "backGround",
              headerAlign: "center",
              flex: 1,
              type: "number",

              align: "center",
              editable: true,
            },
            {
              field: "2",
              headerName: "Segundo Momento",
              width: 130,
              headerClassName: "backGround",
              headerAlign: "center",
              flex: 1,
              type: "number",
              align: "center",
              editable: true,
            },
            {
              field: "2rp",
              headerName: "Ajuste Segundo Momento",
              width: 130,
              headerClassName: "backGround",
              headerAlign: "center",
              flex: 1,
              type: "number",

              align: "center",
              editable: true,
            },

            {
              field: "3",
              headerName: "Tercer Momento",
              width: 130,
              headerClassName: "backGround",
              headerAlign: "center",
              flex: 1,
              align: "center",
              type: "number",
              editable: true,
            },
            {
              field: "3rp",
              headerName: "Ajuste Tercer Momento",
              width: 130,
              headerClassName: "backGround",
              headerAlign: "center",
              flex: 1,
              align: "center",
              type: "number",
              editable: true,
            },
            {
              field: "total",
              headerName: "Nota Final",
              width: 130,
              headerClassName: "backGround",
              headerAlign: "center",
              flex: 1,
              align: "center",
              type: "number",
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
          handleEditCell={handledSetNota}
        />
      </Box>
    </Box>
  );
};

export default Alumno;
