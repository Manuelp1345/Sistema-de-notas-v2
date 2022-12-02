import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import { TableCustom } from "../table/TableCustom";
import { GlobalContext } from "../../config/context/GlobalContext";
import { Alumno } from "../../config/types";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const steps = [
  "Datos del Alumno",
  "Datos de Representantes",
  "Datos Academicos",
];

const Seccion = () => {
  const { id } = useParams();
  const [anio, setAnio] = useState({});
  const [secciones, setSecciones] = useState({ seccion: "loading", id: 0 });
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [alumnos, setAlumnos] = useState([{ id: 0 } as Alumno]);
  const { areas, alumno } = useContext(GlobalContext);

  const [datosAlumno, setDatosAlumno] = useState({
    firsName: "",
    SecondName: "",
    surname: "",
    secondSurname: "",
    dni: "",
    address: "",
    municipality: "",
    state: "",
    cedula: false,
    pasaporte: false,
    partidaDeNacimiento: false,
    fotos: false,
    notasEscolares: false,
    observacion: "",
    condicion: "",
    grupoEstable: "",
    fechaNacimiento: new Date(),
    phone: 0,
    sexo: "",
    email: "",
  });
  const [datosRepresetante, setDatosRepresetante] = useState({
    firstName: "",
    secondName: "",
    surname: "",
    secondSurname: "",
    dni: "",
    address: "",
    municipality: "",
    state: "",
    filiacion: "",
    phone: 0,
    alumnoAddress: false,
    email: "",
  });
  const [open, setOpen] = React.useState(false);
  const [loading, setloading] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setDatosAlumno({
      ...datosAlumno,
      //@ts-ignore
      condicion: event.target.value,
    });
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const insertAlumno = async () => {
    const data = {
      seccion: secciones.id,
      alumno: datosAlumno,
      representante: datosRepresetante,
    };
    //@ts-ignore
    const response = await window.API.insertAlumno(data);
    setloading(false);

    const findAlumnos = await getAlumno(secciones.id);
    console.log(findAlumnos);

    return response;
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    const newActive = activeStep;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    if (newActive === 2) {
      if (datosRepresetante.alumnoAddress === true) {
        console.log("misma dirrecion");
        setDatosRepresetante({
          ...datosRepresetante,
          address: datosAlumno.address,
          municipality: datosAlumno.municipality,
          state: datosAlumno.state,
        });
        setDatosAlumno({
          ...datosAlumno,
          fechaNacimiento: moment(datosAlumno.fechaNacimiento).toDate(),
        });
      }
      await insertAlumno();
      console.log("completado");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setloading(true);
    setActiveStep(0);
  };

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

  const getAlumno = async (id) => {
    console.log("id seccion", id);
    // @ts-ignore
    const findSecciones = await window.API.getAlumno(id);

    const alumnos = findSecciones.map((data) => {
      data.alumno.DatosPersonales.firstName =
        `${data.alumno.DatosPersonales.firstName}`.toUpperCase();
      data.alumno.DatosPersonales.secondName =
        `${data.alumno.DatosPersonales.secondName}`.toUpperCase();
      data.alumno.DatosPersonales.Surname =
        `${data.alumno.DatosPersonales.Surname}`.toUpperCase();
      data.alumno.DatosPersonales.secondSurname =
        `${data.alumno.DatosPersonales.secondSurname}`.toUpperCase();
      data.alumno.idDatos = data.alumno.DatosPersonales.id;
      delete data.alumno.DatosPersonales.id;

      data.alumno = { ...data.alumno, ...data.alumno.DatosPersonales };
      delete data.alumno.DatosPersonales;

      return data.alumno;
    });

    setAlumnos(alumnos);

    // @ts-ignore
    return alumnos;
  };

  const handleClickRow = (param) => {
    console.log(param);
    alumno.setAlumnoId(
      alumnos.find((datos) => datos.id === param.id) as Alumno
    );
    navigate("/alumno");
  };

  useEffect(() => {
    (async () => {
      await getData();
      console.log("id", id);
    })();
    console.log(alumnos);
    console.log(areas.areas);
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
          setSecciones({ seccion: "loading", id: 0 });
          setAlumnos([{ id: 0 } as Alumno]);

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
          {
            // @ts-ignore
            `${anio.anio} SECCIÓN "${
              (secciones && secciones.seccion) || "loading"
            }"`
          }
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
        <Button
          onClick={handleOpen}
          sx={{
            fontWeight: "bold",
          }}
          variant="outlined"
        >
          Agregar Alumno
        </Button>
      </Box>
      <TableCustom
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
        ]}
        rows={alumnos}
        loading={false}
        handleClick={handleClickRow}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ width: "100%", height: "100%" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (index === 0) {
                  //@ts-ignore
                  labelProps.optional = (
                    <Typography variant="caption">Paso Uno</Typography>
                  );
                }
                if (index === 1) {
                  //@ts-ignore
                  labelProps.optional = (
                    <Typography variant="caption">Paso Dos</Typography>
                  );
                }
                if (index === 2) {
                  //@ts-ignore
                  labelProps.optional = (
                    <Typography variant="caption">Paso Tre</Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  //@ts-ignore

                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                {loading ? (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress sx={{ my: "5rem" }} />
                  </Box>
                ) : (
                  <>
                    {" "}
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleReset}>
                        Ingresar Otro Alumno
                      </Button>
                      <Button
                        onClick={() => {
                          handleClose();
                          handleReset();
                        }}
                      >
                        Cerrar
                      </Button>
                    </Box>
                  </>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  {activeStep === 0 && (
                    <>
                      {" "}
                      <Typography
                        textAlign="center"
                        width="100%"
                        fontWeight="bold"
                      >
                        Datos
                      </Typography>
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
                            value={datosAlumno.firsName}
                            onChange={(e) =>
                              setDatosAlumno({
                                ...datosAlumno,
                                firsName: e.target.value,
                              })
                            }
                            label="Primer Nombre"
                            variant="standard"
                          />
                          <TextField
                            value={datosAlumno.SecondName}
                            onChange={(e) =>
                              setDatosAlumno({
                                ...datosAlumno,
                                SecondName: e.target.value,
                              })
                            }
                            label="Segundo Nombre"
                            variant="standard"
                          />
                          <TextField
                            value={datosAlumno.surname}
                            onChange={(e) =>
                              setDatosAlumno({
                                ...datosAlumno,
                                surname: e.target.value,
                              })
                            }
                            label="Primer Apellido"
                            variant="standard"
                          />
                          <TextField
                            value={datosAlumno.secondSurname}
                            onChange={(e) =>
                              setDatosAlumno({
                                ...datosAlumno,
                                secondSurname: e.target.value,
                              })
                            }
                            label="Segundo Apellido"
                            variant="standard"
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "1rem",
                          }}
                        >
                          <TextField
                            value={datosAlumno.dni}
                            onChange={(e) =>
                              setDatosAlumno({
                                ...datosAlumno,
                                dni: e.target.value,
                              })
                            }
                            label="Cedula /Pasaporte /Cedula Escolar"
                            variant="standard"
                          />
                          <TextField
                            value={datosAlumno.address}
                            onChange={(e) =>
                              setDatosAlumno({
                                ...datosAlumno,
                                address: e.target.value,
                              })
                            }
                            label="Direccion"
                            variant="standard"
                          />
                          <TextField
                            value={datosAlumno.municipality}
                            onChange={(e) =>
                              setDatosAlumno({
                                ...datosAlumno,
                                municipality: e.target.value,
                              })
                            }
                            label="Municipio"
                            variant="standard"
                          />
                          <TextField
                            value={datosAlumno.state}
                            onChange={(e) =>
                              setDatosAlumno({
                                ...datosAlumno,
                                state: e.target.value,
                              })
                            }
                            label="Estado"
                            variant="standard"
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "1rem",
                          }}
                        >
                          <TextField
                            value={datosAlumno.email}
                            onChange={(e) =>
                              setDatosAlumno({
                                ...datosAlumno,
                                email: e.target.value,
                              })
                            }
                            label="Correo"
                            variant="standard"
                          />
                          <TextField
                            value={datosAlumno.phone}
                            onChange={(e) =>
                              setDatosAlumno({
                                ...datosAlumno,
                                phone: parseInt(e.target.value),
                              })
                            }
                            label="Telefono"
                            variant="standard"
                          />

                          <Input
                            type="Date"
                            onBlur={(e) => {
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
                            }}
                          />
                          <FormControl>
                            <InputLabel id="demo-simple-select-label">
                              Sexo
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={"M"}
                              label="Condicion"

                              /*           onChange={handleChange} */
                            >
                              <MenuItem value={"F"}>Femenino</MenuItem>
                              <MenuItem value={"M"}>Masculino</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                    </>
                  )}
                  {activeStep === 1 && (
                    <>
                      {" "}
                      <Typography
                        textAlign="center"
                        width="100%"
                        fontWeight="bold"
                      >
                        Datos
                      </Typography>
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
                            value={datosRepresetante.firstName}
                            onChange={(e) =>
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                firstName: e.target.value,
                              })
                            }
                            label="Primer Nombre"
                            variant="standard"
                          />
                          <TextField
                            value={datosRepresetante.secondName}
                            onChange={(e) =>
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                secondName: e.target.value,
                              })
                            }
                            label="Segundo Nombre"
                            variant="standard"
                          />
                          <TextField
                            value={datosRepresetante.surname}
                            onChange={(e) =>
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                surname: e.target.value,
                              })
                            }
                            label="Primer Apellido"
                            variant="standard"
                          />
                          <TextField
                            value={datosRepresetante.secondSurname}
                            onChange={(e) =>
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                secondSurname: e.target.value,
                              })
                            }
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
                            value={datosRepresetante.filiacion}
                            onChange={(e) =>
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                filiacion: e.target.value,
                              })
                            }
                            label="Filiación"
                            variant="standard"
                          />
                          <TextField
                            value={datosRepresetante.dni}
                            onChange={(e) =>
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                dni: e.target.value,
                              })
                            }
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
                          <FormGroup
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <FormControlLabel
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                              control={<Checkbox />}
                              label="¿El estudiante vive con el represetante?"
                              value={datosRepresetante.alumnoAddress}
                              onChange={(e) =>
                                setDatosRepresetante({
                                  ...datosRepresetante,
                                  //@ts-ignore
                                  alumnoAddress: e.target.checked,
                                })
                              }
                            />
                          </FormGroup>
                          {!datosRepresetante.alumnoAddress && (
                            <>
                              <TextField
                                value={datosRepresetante.address}
                                onChange={(e) =>
                                  setDatosRepresetante({
                                    ...datosRepresetante,
                                    //@ts-ignore
                                    address: e.target.value,
                                  })
                                }
                                label="Direccion"
                                variant="standard"
                              />
                              <TextField
                                value={datosRepresetante.municipality}
                                onChange={(e) =>
                                  setDatosRepresetante({
                                    ...datosRepresetante,
                                    //@ts-ignore
                                    municipality: e.target.value,
                                  })
                                }
                                label="Municipio"
                                variant="standard"
                              />
                              <TextField
                                value={datosRepresetante.state}
                                onChange={(e) =>
                                  setDatosRepresetante({
                                    ...datosRepresetante,
                                    //@ts-ignore
                                    state: e.target.value,
                                  })
                                }
                                label="Estado"
                                variant="standard"
                              />
                            </>
                          )}
                        </Box>
                      </Box>
                    </>
                  )}
                  {activeStep === 2 && (
                    <>
                      {" "}
                      <Typography
                        textAlign="center"
                        width="100%"
                        fontWeight="bold"
                      >
                        Información académica
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "1rem",
                          flexWrap: "wrap",
                          rowGap: "3rem",
                          mt: 5,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "1rem",
                            width: "80%",
                          }}
                        >
                          <TextField
                            sx={{ width: "100%" }}
                            label="Grupo Estable"
                            variant="standard"
                            value={datosAlumno.grupoEstable}
                            onChange={(e) =>
                              setDatosAlumno({
                                ...datosAlumno,
                                //@ts-ignore
                                grupoEstable: e.target.value,
                              })
                            }
                          />
                          <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">
                              Condicion
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={datosAlumno.condicion}
                              label="Condicion"
                              onChange={handleChange}
                            >
                              <MenuItem value={"Nuevo Ingreso"}>
                                Nuevo Ingreso
                              </MenuItem>
                              <MenuItem value={"Regular"}>Regular</MenuItem>
                              <MenuItem value={"Repitiente"}>
                                Repitiente
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        <Typography
                          textAlign="center"
                          width="100%"
                          fontWeight="bold"
                        >
                          Documentos
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "1rem",
                          }}
                        >
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox />}
                              value={datosAlumno.cedula}
                              onChange={(e) =>
                                setDatosAlumno({
                                  ...datosAlumno,
                                  //@ts-ignore
                                  cedula: e.target.checked,
                                })
                              }
                              label="Cedula"
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Pasaporte"
                              value={datosAlumno.pasaporte}
                              onChange={(e) =>
                                setDatosAlumno({
                                  ...datosAlumno,
                                  //@ts-ignore
                                  pasaporte: e.target.checked,
                                })
                              }
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Partida de nacimiento"
                              value={datosAlumno.partidaDeNacimiento}
                              onChange={(e) =>
                                setDatosAlumno({
                                  ...datosAlumno,
                                  //@ts-ignore
                                  partidaDeNacimiento: e.target.checked,
                                })
                              }
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Fotos tipo carnet"
                              value={datosAlumno.fotos}
                              onChange={(e) =>
                                setDatosAlumno({
                                  ...datosAlumno,
                                  //@ts-ignore
                                  fotos: e.target.checked,
                                })
                              }
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Notas Escolares"
                              value={datosAlumno.notasEscolares}
                              onChange={(e) =>
                                setDatosAlumno({
                                  ...datosAlumno,
                                  //@ts-ignore
                                  notasEscolares: e.target.checked,
                                })
                              }
                            />
                          </FormGroup>
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
                            label="Nota ( Opcional )"
                            variant="standard"
                            sx={{
                              width: "100%",
                            }}
                            value={datosAlumno.observacion}
                            onChange={(e) =>
                              setDatosAlumno({
                                ...datosAlumno,
                                //@ts-ignore
                                observacion: e.target.value,
                              })
                            }
                          />
                        </Box>
                      </Box>
                    </>
                  )}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Atras
                  </Button>

                  <Box
                    sx={{
                      display: "flex",
                      flex: "1 1 auto",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      color="inherit"
                      onClick={handleClose}
                      sx={{ mr: 1 }}
                    >
                      Cerrar
                    </Button>
                  </Box>

                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1
                      ? "Registrar Datos"
                      : "Siguiente"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Seccion;
