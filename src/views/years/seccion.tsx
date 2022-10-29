import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Swal from "sweetalert2";
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

const steps = ["Datos del Alumno", "Datos de representantes", "Finalizar"];

const Seccion = () => {
  const { id } = useParams();
  const [anio, setAnio] = useState({});
  const [secciones, setSecciones] = useState({ seccion: "loading" });
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getData = async () => {
    // @ts-ignore
    const findSecciones = await getSecciones(id);
    console.log(findSecciones);

    // @ts-ignore
    const anio = await window.API.getAnio(findSecciones.data.anio.id);
    console.log(anio);
    setAnio(anio);
    // @ts-ignore
    $("#Secciones").jsGrid("loadData", findSecciones);
    // @ts-ignore
    $("#Secciones").jsGrid("refresh");
  };

  const getSecciones = async (id) => {
    console.log("id anio", id);
    // @ts-ignore
    const findSecciones = await window.API.getSeccion(id);
    console.log(findSecciones);
    setSecciones(findSecciones);
    // @ts-ignore
    return { data: findSecciones, itemsCount: 0 };
  };

  const insertSeccion = async ({ seccion }: any) => {
    console.log("seccion", seccion);
    // @ts-ignore
    const data = await window.API.insertSeccion({ seccion, anio: id });

    if (data) {
      getData();
      Swal.fire({
        title: "Sección creada",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    // @ts-ignore

    $("#Alumnos").jsGrid({
      width: "100%",
      paging: true,
      autoload: false,
      pageLoading: true,
      pageSize: 3,
      pageIndex: 1,
      heading: true,
      inserting: false,
      loadIndication: true,
      loadMessage: "Por favor espere",
      loadShading: true,
      noDataContent: "No hay Alumnos",
      pagerFormat: "{prev} {pages} {next} {pageIndex} de {pageCount}",
      pagePrevText: "Anterior",
      pageNextText: "Siguiente",
      pageFirstText: "Primera",
      pageLastText: "Ultima",
      pageNavigatorNextText: "...",
      pageNavigatorPrevText: "...",
      invalidMessage: "Por favor ingreser un valor valido",
      rowClick: async function (args: any) {
        console.log("");
        navigate("/seccion/" + args.item.id);
      },
      controller: {
        loadData: async (filter: any) => {
          return await getSecciones(id);
        },
        insertItem: async function (item: any) {
          await insertSeccion(item);
          // @ts-ignore

          $("#periodo").jsGrid("refresh");
        },
      },
      // @ts-ignore
      invalidNotify: ({ errors, item }) => {
        console.log(item);
        if (item.periodo === "") {
          Swal.fire({
            title: "Error",
            text: "Ingrese un Alumno",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
          return;
        }
      },
      fields: [
        {
          name: "cedula",
          title: "C.I",
          align: "center",
          type: "text",
          validate: "required",
        },
        {
          name: "nombre",
          title: "Nombres",
          align: "center",
          type: "text",
          validate: "required",
        },
        {
          name: "apellido",
          title: "Apellidos",
          align: "center",
          type: "text",
          validate: "required",
        },
        {
          name: "id",
          title: "ids",
          align: "center",
          type: "text",
          visible: false,
        },

        { type: "control", editButton: false, deleteButton: false },
      ],
    });

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
          setSecciones({ seccion: "loading" });
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
      <Box sx={{ marginTop: "2rem" }} id="Alumnos" component="div"></Box>
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
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
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
                            id="nameAlumno"
                            label="Primer Nombre"
                            variant="standard"
                          />
                          <TextField
                            id="nameAlumno"
                            label="Segundo Nombre"
                            variant="standard"
                          />
                          <TextField
                            id="nameAlumno"
                            label="Primer Apellido"
                            variant="standard"
                          />
                          <TextField
                            id="nameAlumno"
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
                            id="nameAlumno"
                            label="Cedula /Pasaporte /Cedula Escolar"
                            variant="standard"
                          />
                          <TextField
                            id="nameAlumno"
                            label="Direccion"
                            variant="standard"
                          />
                          <TextField
                            id="nameAlumno"
                            label="Municipio"
                            variant="standard"
                          />
                          <TextField
                            id="nameAlumno"
                            label="Estado"
                            variant="standard"
                          />
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
                              label="Cedula"
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Pasaporte"
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Partida de nacimiento"
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Fotos tipo carnet"
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Notas Escolares"
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
                            id="nameAlumno"
                            label="Nota ( Opcional )"
                            variant="standard"
                            sx={{
                              width: "100%",
                            }}
                          />
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
                            id="nameAlumno"
                            label="Primer Nombre"
                            variant="standard"
                          />
                          <TextField
                            id="nameAlumno"
                            label="Segundo Nombre"
                            variant="standard"
                          />
                          <TextField
                            id="nameAlumno"
                            label="Primer Apellido"
                            variant="standard"
                          />
                          <TextField
                            id="nameAlumno"
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
                            id="nameAlumno"
                            label="Parentesco"
                            variant="standard"
                          />
                          <TextField
                            id="nameAlumno"
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
                            />
                          </FormGroup>
                          <TextField
                            id="nameAlumno"
                            label="Direccion"
                            variant="standard"
                          />
                          <TextField
                            id="nameAlumno"
                            label="Municipio"
                            variant="standard"
                          />
                          <TextField
                            id="nameAlumno"
                            label="Estado"
                            variant="standard"
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
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
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
