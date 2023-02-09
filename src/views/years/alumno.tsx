import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
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
import { Tooltip, FormGroup } from "@mui/material";
import { CustomModal } from "../modals/customModal";

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
  const [openDatosAlumno, setOpenDatosAlumno] = React.useState(false);
  const handleClickOpenDatosAlumno = () => setOpenDatosAlumno(true);
  const handleCloseDatosAlumno = () => {
    setOpenDatosAlumno(false);
  };

  const [openDatosRepresentante, setOpenDatosRepresentante] =
    React.useState(false);
  const handleClickOpenDatosRepresentante = () =>
    setOpenDatosRepresentante(true);
  const handleCloseDatosRepresentante = () => {
    setOpenDatosRepresentante(false);
  };

  const [currentYear, setCurrentYear] = React.useState(0);
  const { areas, alumno } = useContext(GlobalContext);
  const { alumno: alumnoDb } = alumno.alumnoId;
  const { representante } = alumnoDb;

  const getNotas = async (data) => {
    // @ts-ignore
    const resnotas = await window.API.getNotas(data);
    console.log(resnotas);
    const notasMap = {};
    resnotas.forEach((nota) => {
      notasMap[`${nota.materia.id}-${nota.momento}`] = nota;
      if (nota.recuperacion.length > 0) {
        notasMap[`${nota.materia.id}-${nota.momento}rp`] = {
          ...nota,
          nota: nota.recuperacion[0].Nota,
        };
      }
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
      data.rp = false;
    }
    if (newCell["2"]) {
      data.nota = newCell["2"];
      data.momento = "2";
      data.rp = false;
    }
    if (newCell["3"]) {
      data.nota = newCell["3"];
      data.momento = "3";
      data.rp = false;
    }
    if (newCell["1rp"]) {
      data.nota = newCell["1rp"];
      data.momento = "1";
      data.rp = true;
    }
    if (newCell["2rp"]) {
      data.nota = newCell["2rp"];
      data.momento = "2";
      data.rp = true;
    }
    if (newCell["3rp"]) {
      data.nota = newCell["3rp"];
      data.momento = "3";
      data.rp = true;
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
    setCurrentYear(anio.id);
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
          let momentoOne = 0;
          let momentoTwo = 0;
          let momentoThree = 0;
          if (resNotas[`${area.id}-1`]) {
            area["1"] = resNotas[`${area.id}-1`].nota;
            momentoOne = Number(resNotas[`${area.id}-1`].nota);
            if (resNotas[`${area.id}-1rp`]) {
              area["1rp"] = resNotas[`${area.id}-1rp`].nota;
              momentoOne = Number(resNotas[`${area.id}-1rp`].nota);
            }
          }
          if (resNotas[`${area.id}-2`]) {
            area["2"] = resNotas[`${area.id}-2`].nota;
            momentoTwo = Number(resNotas[`${area.id}-2`].nota);
            if (resNotas[`${area.id}-2rp`]) {
              area["2rp"] = resNotas[`${area.id}-2rp`].nota;
              momentoTwo = Number(resNotas[`${area.id}-2rp`].nota);
            }
          }
          if (resNotas[`${area.id}-3`]) {
            area["3"] = resNotas[`${area.id}-3`].nota;
            momentoThree = Number(resNotas[`${area.id}-3`].nota);
            if (resNotas[`${area.id}-3rp`]) {
              area["3rp"] = resNotas[`${area.id}-3rp`].nota;
              momentoThree = Number(resNotas[`${area.id}-3rp`].nota);
            }
          }

          let total = "0";

          if (area["1"] && area["2"] && area["3"])
            total = (
              (Number(momentoOne) + Number(momentoTwo) + Number(momentoThree)) /
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

  const generarBoletin = async () => {
    // @ts-ignore
    const res = await window.API.generarBoletin({
      alumnoId: alumno.alumnoId.alumno.id,
      anioId: currentYear,
    });
    console.log(res);
    if (res) {
      Swal.fire({
        title: "Boletin generado",
        text: "El boletin se ha generado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    }
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
          if (areas.areas)
            areas.setAreas(
              areas.areas.map((area) => {
                delete area["1"];
                delete area["2"];
                delete area["3"];
                delete area["1rp"];
                delete area["2rp"];
                delete area["3rp"];

                return area;
              })
            );
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
          Informacion del Alumno <br />
        </Typography>
      </Box>

      <Box
        sx={{
          gap: "1rem",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography
          width="100%"
          textAlign="center"
          variant="h5"
          component="h2"
          gutterBottom
        >
          {alumno.alumnoId.alumno.DatosPersonales.firstName.toUpperCase()}{" "}
          {alumno.alumnoId.alumno.DatosPersonales.secondName.toUpperCase()}{" "}
          {alumno.alumnoId.alumno.DatosPersonales.Surname.toUpperCase()}{" "}
          {alumno.alumnoId.alumno.DatosPersonales.secondSurname.toUpperCase()} |{" "}
          {alumno.alumnoId.anio.anio} "{alumno.alumnoId.seccione.seccion}"
          <br />
        </Typography>
        <Button variant="contained" onClick={handleClickOpenDatosAlumno}>
          Datos Del Alumno
        </Button>
        <Button variant="contained" onClick={handleClickOpenDatosRepresentante}>
          Datos Del Representante
        </Button>

        <Button variant="contained" onClick={handleClickOpenDatosAlumno}>
          Cambiar Seccion / Año
        </Button>
        <Button variant="contained" onClick={generarBoletin}>
          Generar Boletin
        </Button>
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
              renderCell: (params) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      width: "1rem",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0.5rem",
                    }}
                  >
                    <Tooltip
                      title="Doble click para editar"
                      arrow
                      placement="right"
                    >
                      <Box>
                        &nbsp;&nbsp;&nbsp;&nbsp;{params.formattedValue}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                      </Box>
                    </Tooltip>
                  </Box>
                );
              },
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
              renderCell: (params) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      width: "1rem",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0.5rem",
                    }}
                  >
                    <Tooltip
                      title="Doble click para editar"
                      arrow
                      placement="right"
                    >
                      <Box>
                        &nbsp;&nbsp;&nbsp;&nbsp;{params.formattedValue}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                      </Box>
                    </Tooltip>
                  </Box>
                );
              },
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
              renderCell: (params) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      width: "1rem",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0.5rem",
                    }}
                  >
                    <Tooltip
                      title="Doble click para editar"
                      arrow
                      placement="right"
                    >
                      <Box>
                        &nbsp;&nbsp;&nbsp;&nbsp;{params.formattedValue}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                      </Box>
                    </Tooltip>
                  </Box>
                );
              },
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
              renderCell: (params) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      width: "1rem",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0.5rem",
                    }}
                  >
                    <Tooltip
                      title="Doble click para editar"
                      arrow
                      placement="right"
                    >
                      <Box>
                        &nbsp;&nbsp;&nbsp;&nbsp;{params.formattedValue}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                      </Box>
                    </Tooltip>
                  </Box>
                );
              },
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
              renderCell: (params) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      width: "1rem",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0.5rem",
                    }}
                  >
                    <Tooltip
                      title="Doble click para editar"
                      arrow
                      placement="right"
                    >
                      <Box>
                        &nbsp;&nbsp;&nbsp;&nbsp;{params.formattedValue}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                      </Box>
                    </Tooltip>
                  </Box>
                );
              },
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
              renderCell: (params) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      width: "1rem",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0.5rem",
                    }}
                  >
                    <Tooltip
                      title="Doble click para editar"
                      arrow
                      placement="right"
                    >
                      <Box>
                        &nbsp;&nbsp;&nbsp;&nbsp;{params.formattedValue}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                      </Box>
                    </Tooltip>
                  </Box>
                );
              },
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
      <CustomModal
        btnText="Cerrar"
        color="Primary"
        tittle={"Datos del alumno"}
        openDialog={openDatosAlumno}
        handleCloseDialog={handleCloseDatosAlumno}
        handledConfirm={handleCloseDatosAlumno}
      >
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
              value={alumno.alumnoId.alumno.DatosPersonales.firstName}
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
              value={alumno.alumnoId.alumno.DatosPersonales.secondName}
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
              value={alumno.alumnoId.alumno.DatosPersonales.Surname}
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
              value={alumno.alumnoId.alumno.DatosPersonales.secondSurname}
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
                value={alumno.alumnoId.alumno.condicion}
                label="Condicion"
                disabled
                /*           onChange={handleChange} */
              >
                <MenuItem value={"Nuevo Ingreso"}>Nuevo Ingreso</MenuItem>
                <MenuItem value={"Regular"}>Regular</MenuItem>
                <MenuItem value={"Repitiente"}>Repitiente</MenuItem>
                <MenuItem value={"Graduado"}>Graduado</MenuItem>
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
              value={alumno.alumnoId.alumno.DatosPersonales.dni}
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
                value={alumno.alumnoId.alumno.DatosPersonales.DateOfBirth}
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
              value={alumno.alumnoId.alumno.DatosPersonales.email}
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
              value={alumno.alumnoId.alumno.grupoEstable}
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
              value={alumno.alumnoId.alumno.DatosPersonales.Phone}
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
              value={alumno.alumnoId.alumno.DatosPersonales.address}
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
              value={alumno.alumnoId.alumno.DatosPersonales.municipality}
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
              value={alumno.alumnoId.alumno.DatosPersonales.state}
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
            value={alumno.alumnoId.alumno.observacion}
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
      </CustomModal>
      <CustomModal
        btnText="Cerrar"
        color="Primary"
        tittle={"Datos del representante"}
        openDialog={openDatosRepresentante}
        handleCloseDialog={handleCloseDatosRepresentante}
        handledConfirm={handleCloseDatosRepresentante}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
            rowGap: "3rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <TextField
              value={representante.DatosPersonales.firstName}
              /*                onChange={(e) =>
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                firstName: e.target.value,
                              })
                            } */
              label="Primer Nombre"
              variant="standard"
            />
            <TextField
              value={representante.DatosPersonales.secondName}
              /*            onChange={(e) =>
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                secondName: e.target.value,
                              })
                            } */
              label="Segundo Nombre"
              variant="standard"
            />
            <TextField
              value={representante.DatosPersonales.Surname}
              /*                onChange={(e) =>
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                surname: e.target.value,
                              })
                            } */
              label="Primer Apellido"
              variant="standard"
            />
            <TextField
              value={representante.DatosPersonales.secondSurname}
              /*                      onChange={(e) =>
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                secondSurname: e.target.value,
                              })
                            } */
              label="Segundo Apellido"
              variant="standard"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "100%",
            }}
          >
            <TextField
              value={representante.parentesco}
              /*                    onChange={(e) =>
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                filiacion: e.target.value,
                              })
                            } */
              label="Filiación"
              variant="standard"
            />
            <TextField
              value={representante.DatosPersonales.dni}
              /*                             onChange={(e) =>
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                dni: e.target.value,
                              })
                            } */
              label="Cedula / Pasaporte"
              variant="standard"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <>
              <TextField
                value={representante.DatosPersonales.address}
                /*                 onChange={(e) =>
                                  setDatosRepresetante({
                                    ...datosRepresetante,
                                    //@ts-ignore
                                    address: e.target.value,
                                  })
                                } */
                label="Direccion"
                variant="standard"
              />
              <TextField
                value={representante.DatosPersonales.municipality}
                /*                        onChange={(e) =>
                                  setDatosRepresetante({
                                    ...datosRepresetante,
                                    //@ts-ignore
                                    municipality: e.target.value,
                                  })
                                } */
                label="Municipio"
                variant="standard"
              />
              <TextField
                value={representante.DatosPersonales.state}
                /*                               onChange={(e) =>
                                  setDatosRepresetante({
                                    ...datosRepresetante,
                                    //@ts-ignore
                                    state: e.target.value,
                                  })
                                } */
                label="Estado"
                variant="standard"
              />
            </>
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default Alumno;
