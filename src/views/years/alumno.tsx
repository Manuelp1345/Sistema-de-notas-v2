import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
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
import { GlobalContext } from "../../config/context/GlobalContext";
import { TableCustom } from "../table/TableCustom";
import { Tooltip, FormGroup, CircularProgress } from "@mui/material";
import { CustomModal } from "../modals/customModal";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import moment from "moment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Anio } from "../../config/entitys/anios";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

const Alumno = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleClickOpen = () => setOpenSeccionAnio(true);
  const handleClickClose = () => setOpenSeccionAnio(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openSeccionAnio, setOpenSeccionAnio] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [skipped, setSkipped] = useState(new Set());
  const [loading, setloading] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const [existAlumno, setExistAlumno] = useState();
  const [currentYear, setCurrentYear] = React.useState(0);
  const [aniosAndSecciones, setAniosAndSecciones] = useState<Anio[]>([]);
  const { areas, alumno } = useContext(GlobalContext);
  const { alumno: alumnoDb } = alumno.alumnoId;
  const { representante } = alumnoDb;
  const [updateAlumno, setUpdateAlumno] = useState(false);
  const [newAnio, setNewAnio] = useState(0);
  const [newSeccion, setNewSeccion] = useState("");
  console.log("ALUMNO ID", alumno);
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

  const [datosAlumno, setDatosAlumno] = useState<AlumnoData>({
    firsName: alumno.alumnoId.alumno.DatosPersonales.firstName,
    SecondName: alumno.alumnoId.alumno.DatosPersonales.secondName,
    surname: alumno.alumnoId.alumno.DatosPersonales.Surname,
    secondSurname: alumno.alumnoId.alumno.DatosPersonales.secondSurname,
    dni: alumno.alumnoId.alumno.DatosPersonales.dni,
    address: alumno.alumnoId.alumno.DatosPersonales.address,
    municipality: alumno.alumnoId.alumno.DatosPersonales.municipality,
    state: alumno.alumnoId.alumno.DatosPersonales.state,
    cedula: Boolean(
      alumno.alumnoId.alumno.DatosPersonales?.Documents?.cedula || false
    ),
    pasaporte: Boolean(
      alumno.alumnoId.alumno.DatosPersonales?.Documents?.pasaporte || false
    ),
    partidaDeNacimiento: Boolean(
      alumno.alumnoId.alumno.DatosPersonales?.Documents?.partida_nacimiento ||
        false
    ),
    fotos: Boolean(
      alumno.alumnoId.alumno.DatosPersonales?.Documents?.fotos_carnet || false
    ),
    notasEscolares: Boolean(
      alumno.alumnoId.alumno.DatosPersonales?.Documents?.notas_escuela || false
    ),
    observacion: alumno.alumnoId.alumno.observacion,
    condicion: alumno.alumnoId.alumno.condicion,
    grupoEstable: alumno.alumnoId.alumno.grupoEstable,
    fechaNacimiento: moment(
      alumno.alumnoId.alumno.DatosPersonales.DateOfBirth
    ).toDate(),
    phone: Number(alumno.alumnoId.alumno.DatosPersonales.Phone),
    sexo: alumno.alumnoId.alumno.DatosPersonales.sexo,
    email: alumno.alumnoId.alumno.DatosPersonales.email,
  });

  const [datosRepresetante, setDatosRepresetante] = useState({
    firstName: representante.DatosPersonales.firstName,
    secondName: representante.DatosPersonales.secondName,
    surname: representante.DatosPersonales.Surname,
    secondSurname: representante.DatosPersonales.secondSurname,
    dni: representante.DatosPersonales.dni,
    address: representante.DatosPersonales.address,
    municipality: representante.DatosPersonales.municipality,
    state: representante.DatosPersonales.state,
    filiacion: representante.parentesco,
    phone: Number(representante.DatosPersonales.Phone),
    alumnoAddress: false,
    email: representante.DatosPersonales.email,
  });

  const isStepSkipped = (step) => {
    return skipped.has(step);
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
      console.log(existAlumno, "existAlumno");
      if (
        datosAlumno.dni === "" ||
        // @ts-ignore
        (existAlumno && existAlumno.id !== alumno.alumnoId.alumno.id)
      ) {
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
        datosRepresetante.phone > 0 &&
        datosRepresetante.phone.toString().length < 10
      ) {
        setErrorDataRepresentante({ ...errorDataRepresentante, phone: true });
        return false;
      }
      if (datosRepresetante.email !== "")
        if (
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

      console.log("completado");
      await update();
    }
  };

  const update = async () => {
    const data = {
      seccion: alumno.alumnoId.seccione.id,
      alumno: datosAlumno,
      representante: datosRepresetante,
      usuario: user.email,
      dni: alumno.alumnoId.alumno.DatosPersonales.dni,
    };

    console.log(data);
    //@ts-ignore
    const response = await window.API.updateAlumno(data);
    setloading(false);

    if (response === true) {
      setUpdateAlumno(response);
    } else {
      setUpdateAlumno(false);
    }

    return response;
  };

  const getAniosAndSecciones = async () => {
    //@ts-ignore
    const response = await window.API.getAniosAndSecciones(
      alumno.alumnoId.anio.periodo.id
    );
    setAniosAndSecciones(response);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setloading(true);
    setActiveStep(0);
  };

  const validateDniAlumno = async (dni: string) => {
    //@ts-ignore
    const response = await window.API.getAlumnoByDni(dni);
    console.log(response);
    setExistAlumno(response);

    return response;
  };

  const user = JSON.parse(localStorage.getItem("token") || "{}");

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
    console.log("data", data);
    // @ts-ignore
    data.alumnoId = alumno.alumnoId.alumno.id;
    data.alumno = `${datosAlumno.firsName.toUpperCase()} ${datosAlumno.firsName.toUpperCase()} ${
      datosAlumno.dni
    }`;
    data.usuario = user.email;

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
      alumnoId: alumno.alumnoId.alumno.id,
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

    await getAniosAndSecciones();
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
      anioId: alumno.alumnoId.anio.id,
      periodoId: alumno.alumnoId.anio.periodo.id,
    });
    console.log(res);
    if (res && res !== "cancelado") {
      Swal.fire({
        title: "Boletin generado",
        text: "El boletin se ha generado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    }
  };

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

  const validateRepresentanteDNI = async (dni: string) => {
    //@ts-ignore
    const response = await window.API.getRepresentanteByDni(dni);

    if (response) {
      Swal.fire({
        title: "El Rrepresentante ya existe",
        text: "Desea cargar los datos del representante?",
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

  const updateAnioAndSeccion = async () => {
    console.log("new anio", newAnio);
    console.log("new seccion", newSeccion);

    const seccionId = aniosAndSecciones
      .find((anio) => anio.numberAnio === newAnio)
      ?.secciones.find((seccion) => seccion.seccion === newSeccion);

    const anioId = aniosAndSecciones.find(
      (anio) => anio.numberAnio === newAnio
    );

    console.log(seccionId, "seccionId");

    const data = {
      alumno: {
        dni: alumno.alumnoId.alumno.DatosPersonales.dni,
      },
      etapa: alumno.alumnoId.id,
      seccion: seccionId?.id,
      anio: anioId,
      usuario: user.email,
    };
    console.log(data);

    // @ts-ignore
    const res = await window.API.updateAlumnoSeccionAndAnio(data);
    console.log(res);
    if (res) {
      Swal.fire({
        title: "Sección y año actualizados",
        text: "Se ha actualizado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      navigate("/anos");
    } else {
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  useEffect(() => {
    (async () => {
      await getData();
      console.log("id", id);
      setNewAnio(alumno.alumnoId.anio.numberAnio);
      setNewSeccion(alumno.alumnoId.seccione.seccion);
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
          {datosAlumno.firsName.toUpperCase()}{" "}
          {datosAlumno.SecondName.toUpperCase()}{" "}
          {datosAlumno.surname.toUpperCase()}{" "}
          {datosAlumno.secondSurname.toUpperCase()} |{" "}
          {alumno.alumnoId.anio.anio} "{alumno.alumnoId.seccione.seccion}"
          <br />
        </Typography>
        <Button variant="contained" onClick={handleOpen}>
          Informacion del Alumno
        </Button>

        {alumno.alumnoId.alumno.condicion !== "Graduado" && (
          <Button variant="contained" onClick={handleClickOpen}>
            Cambiar Seccion / Año
          </Button>
        )}
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
                      {updateAlumno ? (
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
                              if (response.id !== alumno.alumnoId.alumno.id)
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
                              value={
                                alumno.alumnoId.alumno.DatosPersonales
                                  .DateOfBirth
                              }
                              error={errorDataAlumno.fechaNacimiento}
                              onBlur={(e) => {
                                //@ts-ignore
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
                              <MenuItem value={"Retirado"}>Retirado</MenuItem>
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
                              checked={datosAlumno.cedula}
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
                              checked={datosAlumno.pasaporte}
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
                              checked={datosAlumno.partidaDeNacimiento}
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
                              checked={datosAlumno.fotos}
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
                              checked={datosAlumno.notasEscolares}
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
                      ? "Actualizar Datos"
                      : "Siguiente"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Box>
      </Modal>
      <CustomModal
        btnText="Actualizar"
        handleCloseDialog={handleClickClose}
        openDialog={openSeccionAnio}
        handledConfirm={async () => {
          await updateAnioAndSeccion();
          handleClickClose();
        }}
        tittle={"Actualizar Datos"}
        color={"primary"}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
            rowGap: "3rem",
            width: "500px",
            mt: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
              rowGap: "3rem",
              mt: 5,
            }}
          >
            <Typography
              textAlign="center"
              width="100%"
              fontWeight="bold"
              fontSize="1.5rem"
            >
              Año
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Año</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Año"
                  value={newAnio}
                  onChange={(e) => {
                    setNewAnio(e.target.value as number);
                  }}
                >
                  {aniosAndSecciones.map((anio) => {
                    return (
                      <MenuItem value={anio.numberAnio}>{anio.anio}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
              rowGap: "3rem",
              mt: 5,
            }}
          >
            <Typography
              textAlign="center"
              width="100%"
              fontWeight="bold"
              fontSize="1.5rem"
            >
              Seccion
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Seccion</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Seccion"
                  value={newSeccion}
                  onChange={(e) => {
                    setNewSeccion(e.target.value as string);
                  }}
                >
                  {
                    //@ts-ignore
                    aniosAndSecciones
                      .find((anio) => anio.numberAnio === newAnio)
                      ?.secciones.map((seccion) => {
                        return (
                          <MenuItem value={seccion.seccion}>
                            {seccion.seccion}
                          </MenuItem>
                        );
                      })
                  }
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default Alumno;
