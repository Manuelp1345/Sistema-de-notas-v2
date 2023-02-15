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
import { ArrowBack, Label } from "@mui/icons-material";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import { TableCustom } from "../table/TableCustom";
import { GlobalContext } from "../../config/context/GlobalContext";
import { Etapas } from "../../config/entitys/etapas";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface AlumnoData {
  firsName: string;
  SecondName: string;
  surname: string;
  secondSurname: string;
  dni: string;
  address: string;
  municipality: string;
  state: string;
  cedula: boolean;
  pasaporte: boolean;
  partidaDeNacimiento: boolean;
  fotos: boolean;
  notasEscolares: boolean;
  observacion: string;
  condicion: string;
  grupoEstable: string;
  fechaNacimiento: null | Date;
  phone: number;
  sexo: string;
  email: string;
}

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
  zIndex: 1,
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
  const [existAlumno, setExistAlumno] = useState(false);
  const [inserAlumno, setInserAlumno] = useState(false);
  const [errorDataAlumno, setErrorDataAlumno] = useState({
    dni: false,
    firstName: false,
    SecondName: false,
    surname: false,
    secondSurname: false,
    address: false,
    municipality: false,
    state: false,
    phone: false,
    email: false,
    sexo: false,
    fechaNacimiento: false,
    grupoEstable: false,
    condicion: false,
  });
  const [errorDataRepresentante, setErrorDataRepresentante] = useState({
    dni: false,
    firstName: false,
    SecondName: false,
    surname: false,
    secondSurname: false,
    address: false,
    municipality: false,
    state: false,
    phone: false,
    email: false,
    filiacion: false,
  });

  const [skipped, setSkipped] = useState(new Set());
  //  @ts-ignore
  const [alumnos, setAlumnos] = useState([{ id: 0 } as Etapas]);
  const { areas, alumno } = useContext(GlobalContext);

  const [datosAlumno, setDatosAlumno] = useState<AlumnoData>({
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
    fechaNacimiento: null,
    phone: Number(0),
    sexo: "select",
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

  const handleChangeSexo = (event) => {
    setDatosAlumno({
      ...datosAlumno,
      //@ts-ignore
      sexo: event.target.value,
    });
    setErrorDataAlumno({
      ...errorDataAlumno,
      sexo: false,
    });
  };

  const validateDniAlumno = async (dni: string) => {
    //@ts-ignore
    const response = await window.API.getAlumnoByDni(dni);

    setExistAlumno(response);

    return response;
  };

  const validateRepresentanteDNI = async (dni: string) => {
    //@ts-ignore
    const response = await window.API.getRepresentanteByDni(dni);

    if (response) {
      Swal.fire({
        title: "Atención",
        text: "El representante que está tratando de agregar ya existe en el sistema. ¿Desea cargar la información del representante en el formulario. ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then((result) => {
        if (result.isConfirmed) {
          setDatosRepresetante({
            ...datosRepresetante,
            address: response.DatosPersonales.address,
            email: response.DatosPersonales.email,
            firstName: response.DatosPersonales.firstName,
            municipality: response.DatosPersonales.municipality,
            phone: response.DatosPersonales.Phone,
            surname: response.DatosPersonales.Surname,
            secondName: response.DatosPersonales.secondName,
            secondSurname: response.DatosPersonales.secondSurname,
            state: response.DatosPersonales.state,
            filiacion: response.parentesco,
          });
        }
      });
    }

    console.log(response);
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

    console.log("response inser alumno", response);

    if (response === true) {
      setInserAlumno(response);
    } else {
      setInserAlumno(false);
    }

    return response;
  };

  const validateFirstStep = () => {
    if (activeStep === 0) {
      console.log(errorDataAlumno);

      if (datosAlumno.firsName === "") {
        console.log(errorDataAlumno);
        setErrorDataAlumno({ ...errorDataAlumno, firstName: true });
        return false;
      }

      if (datosAlumno.SecondName === "") {
        setErrorDataAlumno({ ...errorDataAlumno, SecondName: true });
        return false;
      }

      if (datosAlumno.surname === "") {
        setErrorDataAlumno({ ...errorDataAlumno, surname: true });
        return false;
      }

      if (datosAlumno.dni === "" || existAlumno) {
        setErrorDataAlumno({ ...errorDataAlumno, dni: true });
        return false;
      }

      if (datosAlumno.address === "") {
        setErrorDataAlumno({ ...errorDataAlumno, address: true });
        return false;
      }

      if (datosAlumno.municipality === "") {
        setErrorDataAlumno({ ...errorDataAlumno, municipality: true });
        return false;
      }

      if (datosAlumno.state === "") {
        setErrorDataAlumno({ ...errorDataAlumno, state: true });
        return false;
      }

      if (datosAlumno.phone === 0 || datosAlumno.phone.toString().length < 10) {
        setErrorDataAlumno({ ...errorDataAlumno, phone: true });
        return false;
      }

      if (datosAlumno.sexo === "select") {
        setErrorDataAlumno({ ...errorDataAlumno, sexo: true });
        return false;
      }
      if (
        datosAlumno.email === "" ||
        !datosAlumno.email.includes("@") ||
        !datosAlumno.email.includes(".com")
      ) {
        setErrorDataAlumno({ ...errorDataAlumno, email: true });
        return false;
      }

      if (
        datosAlumno.fechaNacimiento === null ||
        moment(datosAlumno.fechaNacimiento).toDate() === moment().toDate()
      ) {
        console.log(datosAlumno.fechaNacimiento);
        setErrorDataAlumno({ ...errorDataAlumno, fechaNacimiento: true });
        return false;
      }

      return true;
    }
    if (activeStep === 1) {
      console.log(errorDataRepresentante);

      if (datosRepresetante.dni === "") {
        setErrorDataRepresentante({ ...errorDataRepresentante, dni: true });
        return false;
      }

      if (datosRepresetante.firstName === "") {
        console.log(errorDataAlumno);
        setErrorDataRepresentante({
          ...errorDataRepresentante,
          firstName: true,
        });
        return false;
      }

      if (datosRepresetante.secondName === "") {
        setErrorDataRepresentante({
          ...errorDataRepresentante,
          SecondName: true,
        });
        return false;
      }

      if (datosRepresetante.surname === "") {
        setErrorDataRepresentante({ ...errorDataRepresentante, surname: true });
        return false;
      }

      if (datosRepresetante.filiacion === "") {
        setErrorDataRepresentante({
          ...errorDataRepresentante,
          filiacion: true,
        });
        return false;
      }

      if (
        datosRepresetante.phone === 0 ||
        datosRepresetante.phone.toString().length < 10
      ) {
        setErrorDataRepresentante({ ...errorDataRepresentante, phone: true });
        return false;
      }

      if (
        datosRepresetante.email === "" ||
        !datosRepresetante.email.includes("@") ||
        !datosRepresetante.email.includes(".com")
      ) {
        setErrorDataRepresentante({ ...errorDataRepresentante, email: true });
        return false;
      }

      if (!datosRepresetante.alumnoAddress) {
        if (datosRepresetante.address === "") {
          setErrorDataRepresentante({
            ...errorDataRepresentante,
            address: true,
          });
          return false;
        }

        if (datosRepresetante.municipality === "") {
          setErrorDataRepresentante({
            ...errorDataRepresentante,
            municipality: true,
          });
          return false;
        }

        if (datosRepresetante.state === "") {
          setErrorDataRepresentante({ ...errorDataRepresentante, state: true });
          return false;
        }
      }

      return true;
    }
    if (activeStep === 2) {
      console.log(errorDataAlumno);

      if (datosAlumno.grupoEstable === "") {
        console.log(errorDataAlumno);
        setErrorDataAlumno({ ...errorDataAlumno, grupoEstable: true });
        return false;
      }

      if (datosAlumno.condicion === "") {
        setErrorDataAlumno({ ...errorDataAlumno, condicion: true });
        return false;
      }

      return true;
    }
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

  const handleClickRow = (param) => {
    console.log(param);
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
          // @ts-ignore
          setAlumnos([{ id: 0 } as Etapas]);

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
        ]}
        rows={alumnos}
        loading={false}
        handleDobleClick={() => {
          console.log("first");
        }}
        handleClick={handleClickRow}
      />
      <Modal
        sx={{ zIndex: 20 }}
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
                    <Typography variant="caption">Paso Tres</Typography>
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
                    {/*interfaz para mostrar que se ingreso correctamente los datos del alumno  */}
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {inserAlumno ? (
                        <>
                          <CheckCircleOutlineIcon
                            sx={{
                              fontSize: "5rem",
                              color: "#4caf50",
                              my: "5rem",
                            }}
                          />
                          <Typography sx={{ mt: 2, mb: 1 }}>
                            Alumno Ingresado Correctamente
                          </Typography>
                        </>
                      ) : (
                        <>
                          <ErrorOutlineIcon
                            sx={{
                              fontSize: "5rem",
                              color: "#f44336",
                              my: "5rem",
                            }}
                          />
                          <Typography sx={{ mt: 2, mb: 1 }}>
                            Error al Ingresar Alumno
                          </Typography>
                        </>
                      )}
                    </Box>

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
                            onChange={(e) => {
                              setDatosAlumno({
                                ...datosAlumno,
                                firsName: e.target.value,
                              });
                              setErrorDataAlumno({
                                ...errorDataAlumno,
                                firstName: false,
                              });
                            }}
                            label="Primer Nombre"
                            variant="standard"
                            error={errorDataAlumno.firstName}
                            helperText={
                              errorDataAlumno.firstName &&
                              'El campo "Primer Nombre" es obligatorio'
                            }
                          />
                          <TextField
                            value={datosAlumno.SecondName}
                            error={errorDataAlumno.SecondName}
                            helperText={
                              errorDataAlumno.SecondName &&
                              'El campo "Segundo Nombre" es obligatorio'
                            }
                            onChange={(e) => {
                              setDatosAlumno({
                                ...datosAlumno,
                                SecondName: e.target.value,
                              });
                              setErrorDataAlumno({
                                ...errorDataAlumno,
                                SecondName: false,
                              });
                            }}
                            label="Segundo Nombre"
                            variant="standard"
                          />
                          <TextField
                            value={datosAlumno.surname}
                            error={errorDataAlumno.surname}
                            helperText={
                              errorDataAlumno.surname &&
                              'El campo "Primer Apellido" es obligatorio'
                            }
                            onChange={(e) => {
                              setDatosAlumno({
                                ...datosAlumno,
                                surname: e.target.value,
                              });
                              setErrorDataAlumno({
                                ...errorDataAlumno,
                                surname: false,
                              });
                            }}
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
                            error={errorDataAlumno.dni}
                            helperText={
                              errorDataAlumno.dni &&
                              "El Numero ya existe / no es valido"
                            }
                            onChange={async (e) => {
                              setDatosAlumno({
                                ...datosAlumno,
                                dni: e.target.value,
                              });
                              setErrorDataAlumno({
                                ...errorDataAlumno,
                                dni: false,
                              });
                            }}
                            onKeyUp={async () => {
                              const response = await validateDniAlumno(
                                datosAlumno.dni
                              );
                              setErrorDataAlumno({
                                ...errorDataAlumno,
                                dni: response,
                              });
                            }}
                            label="Cedula /Pasaporte /Cedula Escolar"
                            variant="standard"
                          />
                          <TextField
                            value={datosAlumno.address}
                            error={errorDataAlumno.address}
                            helperText={
                              errorDataAlumno.address &&
                              'El campo "Direccion" es obligatorio'
                            }
                            onChange={(e) => {
                              setDatosAlumno({
                                ...datosAlumno,
                                address: e.target.value,
                              });
                              setErrorDataAlumno({
                                ...errorDataAlumno,
                                address: false,
                              });
                            }}
                            label="Direccion"
                            variant="standard"
                          />
                          <TextField
                            value={datosAlumno.municipality}
                            error={errorDataAlumno.municipality}
                            helperText={
                              errorDataAlumno.municipality &&
                              'El campo "Municipio" es obligatorio'
                            }
                            onChange={(e) => {
                              setDatosAlumno({
                                ...datosAlumno,
                                municipality: e.target.value,
                              });
                              setErrorDataAlumno({
                                ...errorDataAlumno,
                                municipality: false,
                              });
                            }}
                            label="Municipio"
                            variant="standard"
                          />
                          <TextField
                            value={datosAlumno.state}
                            error={errorDataAlumno.state}
                            helperText={
                              errorDataAlumno.state &&
                              'El campo "Estado" es obligatorio'
                            }
                            onChange={(e) => {
                              setDatosAlumno({
                                ...datosAlumno,
                                state: e.target.value,
                              });
                              setErrorDataAlumno({
                                ...errorDataAlumno,
                                state: false,
                              });
                            }}
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
                            error={errorDataAlumno.email}
                            helperText={
                              errorDataAlumno.email &&
                              'El campo "Correo" es obligatorio'
                            }
                            onChange={(e) => {
                              setDatosAlumno({
                                ...datosAlumno,
                                email: e.target.value,
                              });
                              setErrorDataAlumno({
                                ...errorDataAlumno,
                                email: false,
                              });
                            }}
                            label="Correo"
                            variant="standard"
                          />
                          <TextField
                            value={Number(datosAlumno.phone)}
                            error={errorDataAlumno.phone}
                            helperText={
                              errorDataAlumno.phone &&
                              'El campo "Telefono" es obligatorio'
                            }
                            onChange={(e) => {
                              setDatosAlumno({
                                ...datosAlumno,
                                phone: Number(e.target.value),
                              });
                              setErrorDataAlumno({
                                ...errorDataAlumno,
                                phone: false,
                              });
                            }}
                            label="Telefono"
                            variant="standard"
                          />

                          <FormControl>
                            <Typography sx={{ color: "gray" }}>
                              Fechan de nacimiento
                            </Typography>
                            <Input
                              type="Date"
                              error={errorDataAlumno.fechaNacimiento}
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
                                setErrorDataAlumno({
                                  ...errorDataAlumno,
                                  fechaNacimiento: false,
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
                                setErrorDataAlumno({
                                  ...errorDataAlumno,
                                  fechaNacimiento: false,
                                });
                                console.log(datosAlumno);
                              }}
                            />
                            {errorDataAlumno.fechaNacimiento && (
                              <Typography
                                sx={{ color: "red", fontSize: ".9rem" }}
                              >
                                {'El campo "Fechan de nacimiento"'} <br />{" "}
                                {" es obligatorio"}
                              </Typography>
                            )}
                          </FormControl>

                          <FormControl>
                            <InputLabel id="demo-simple-select-label">
                              Sexo
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={datosAlumno.sexo}
                              label="Condicion"
                              onChange={handleChangeSexo}
                            >
                              <MenuItem disabled value={"select"}>
                                Sexo
                              </MenuItem>
                              <MenuItem value={"F"}>Femenino</MenuItem>
                              <MenuItem value={"M"}>Masculino</MenuItem>
                            </Select>
                            {errorDataAlumno.sexo && (
                              <Typography
                                sx={{ color: "red", fontSize: ".9rem" }}
                              >
                                {'El campo "Sexo"'} <br /> {" es obligatorio"}
                              </Typography>
                            )}
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
                            value={datosRepresetante.dni}
                            error={errorDataRepresentante.dni}
                            helperText={
                              errorDataRepresentante.dni &&
                              'El campo "Cedula / Pasaporte" es obligatorio'
                            }
                            onChange={(e) => {
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                dni: e.target.value,
                              });
                              setErrorDataRepresentante({
                                ...errorDataRepresentante,
                                dni: false,
                              });
                            }}
                            onKeyUp={() =>
                              validateRepresentanteDNI(datosRepresetante.dni)
                            }
                            label="Cedula / Pasaporte"
                            variant="standard"
                          />
                          <TextField
                            value={datosRepresetante.firstName}
                            error={errorDataRepresentante.firstName}
                            helperText={
                              errorDataRepresentante.firstName &&
                              'El campo "Primer Nombre" es obligatorio'
                            }
                            onChange={(e) => {
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                firstName: e.target.value,
                              });
                              setErrorDataRepresentante({
                                ...errorDataRepresentante,
                                firstName: false,
                              });
                            }}
                            label="Primer Nombre"
                            variant="standard"
                          />
                          <TextField
                            value={datosRepresetante.secondName}
                            error={errorDataRepresentante.SecondName}
                            helperText={
                              errorDataRepresentante.SecondName &&
                              'El campo "Segundo Nombre" es obligatorio'
                            }
                            onChange={(e) => {
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                secondName: e.target.value,
                              });
                              setErrorDataRepresentante({
                                ...errorDataRepresentante,
                                SecondName: false,
                              });
                            }}
                            label="Segundo Nombre"
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
                            value={datosRepresetante.surname}
                            error={errorDataRepresentante.surname}
                            helperText={
                              errorDataRepresentante.surname &&
                              'El campo "Primer Apellido" es obligatorio'
                            }
                            onChange={(e) => {
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                surname: e.target.value,
                              });
                              setErrorDataRepresentante({
                                ...errorDataRepresentante,
                                surname: false,
                              });
                            }}
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
                          <TextField
                            value={datosRepresetante.filiacion}
                            error={errorDataRepresentante.filiacion}
                            helperText={
                              errorDataRepresentante.filiacion &&
                              'El campo "Filiación" es obligatorio'
                            }
                            onChange={(e) => {
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                filiacion: e.target.value,
                              });
                              setErrorDataRepresentante({
                                ...errorDataRepresentante,
                                filiacion: false,
                              });
                            }}
                            label="Filiación"
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
                            value={datosRepresetante.phone}
                            error={errorDataRepresentante.phone}
                            helperText={
                              errorDataRepresentante.phone &&
                              'El campo "Telefono" es obligatorio'
                            }
                            onChange={(e) => {
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                phone: e.target.value,
                              });
                              setErrorDataRepresentante({
                                ...errorDataRepresentante,
                                phone: false,
                              });
                            }}
                            label="Telefono"
                            variant="standard"
                          />
                          <TextField
                            value={datosRepresetante.email}
                            error={errorDataRepresentante.email}
                            helperText={
                              errorDataRepresentante.email &&
                              'El campo "Email" es obligatorio'
                            }
                            onChange={(e) => {
                              setDatosRepresetante({
                                ...datosRepresetante,
                                //@ts-ignore
                                email: e.target.value,
                              });
                              setErrorDataRepresentante({
                                ...errorDataRepresentante,
                                email: false,
                              });
                            }}
                            label="Email"
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
                                  address: datosAlumno.address,
                                  municipality: datosAlumno.municipality,
                                  state: datosAlumno.state,
                                })
                              }
                            />
                          </FormGroup>
                          {!datosRepresetante.alumnoAddress && (
                            <>
                              <TextField
                                value={datosRepresetante.address}
                                error={errorDataRepresentante.address}
                                helperText={
                                  errorDataRepresentante.address &&
                                  'El campo "Direccion" es obligatorio'
                                }
                                onChange={(e) => {
                                  setDatosRepresetante({
                                    ...datosRepresetante,
                                    //@ts-ignore
                                    address: e.target.value,
                                  });
                                  setErrorDataRepresentante({
                                    ...errorDataRepresentante,
                                    address: false,
                                  });
                                }}
                                label="Direccion"
                                variant="standard"
                              />
                              <TextField
                                value={datosRepresetante.municipality}
                                error={errorDataRepresentante.municipality}
                                helperText={
                                  errorDataRepresentante.municipality &&
                                  'El campo "Municipio" es obligatorio'
                                }
                                onChange={(e) => {
                                  setDatosRepresetante({
                                    ...datosRepresetante,
                                    //@ts-ignore
                                    municipality: e.target.value,
                                  });
                                  setErrorDataRepresentante({
                                    ...errorDataRepresentante,
                                    municipality: false,
                                  });
                                }}
                                label="Municipio"
                                variant="standard"
                              />
                              <TextField
                                value={datosRepresetante.state}
                                error={errorDataRepresentante.state}
                                helperText={
                                  errorDataRepresentante.state &&
                                  'El campo "Estado" es obligatorio'
                                }
                                onChange={(e) => {
                                  setDatosRepresetante({
                                    ...datosRepresetante,
                                    //@ts-ignore
                                    state: e.target.value,
                                  });
                                  setErrorDataRepresentante({
                                    ...errorDataRepresentante,
                                    state: false,
                                  });
                                }}
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
                            error={errorDataAlumno.grupoEstable}
                            helperText={
                              errorDataAlumno.grupoEstable &&
                              'El campo "Grupo Estable" es obligatorio'
                            }
                            value={datosAlumno.grupoEstable}
                            onChange={(e) => {
                              setDatosAlumno({
                                ...datosAlumno,
                                //@ts-ignore
                                grupoEstable: e.target.value,
                              });
                              setErrorDataAlumno({
                                ...errorDataAlumno,
                                grupoEstable: false,
                              });
                            }}
                          />
                          <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">
                              Condicion
                            </InputLabel>
                            <Select
                              error={errorDataAlumno.condicion}
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

                  <Button
                    onClick={() => {
                      const FirstStep = validateFirstStep();
                      console.log("FirstStep", FirstStep);
                      if (FirstStep) handleNext();
                    }}
                  >
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
