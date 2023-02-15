/* eslint-disable no-undef */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  Typography,
  Button,
  Tooltip,
  FormGroup,
  TextField,
  Checkbox,
  Input,
} from "@mui/material";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableCustom } from "../table/TableCustom";
import DialogContentText from "@mui/material/DialogContentText";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { CustomModal } from "../modals/customModal";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Moment } from "moment";
import GradeIcon from "@mui/icons-material/Grade";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const SetupYear = ({ idPeriodo }: { idPeriodo: number }): JSX.Element => {
  const [periodos, setPeriodos] = useState([]);
  const [periodo, setPeriodo] = useState();
  const [anios, setAnios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idAnioDelete, setIdAnioDelete] = useState({
    id: 0,
    anio: "",
    periodo: { id: 0 },
  });

  const [value, setValue] = React.useState<{
    yearOne: string | null;
    yearTwo: string | null;
    anio: string | null;
    numberAnio: number | null;
  }>({
    yearOne: "",
    yearTwo: "",
    anio: null,
    numberAnio: null,
  });

  const [openDeleteAnio, setOpenDeleteAnio] = React.useState(false);
  const handleClickOpenDeleteAnio = () => setOpenDeleteAnio(true);
  const handleCloseDeleteAnio = () => setOpenDeleteAnio(false);

  const [openAddPeriodo, setOpenAddPeriodo] = React.useState(false);
  const handleClickOpenAddPeriodo = () => setOpenAddPeriodo(true);
  const handleCloseAddPeriodo = () => {
    setOpenAddPeriodo(false);
    console.log(value);
  };

  const [openAddPeriodoGrade, setOpenAddPeriodoGrade] = React.useState(false);
  const handleClickOpenAddPeriodoGrade = () => setOpenAddPeriodoGrade(true);
  const handleCloseAddPeriodoGrade = () => {
    setOpenAddPeriodoGrade(false);
    console.log(value);
  };

  const [openAddAnio, setOpenAddAnio] = React.useState(false);
  const handleClickOpenAddAnio = () => setOpenAddAnio(true);
  const handleCloseAddAnio = () => {
    setOpenAddAnio(false);
    console.log(value);
  };

  const navigate = useNavigate();
  const getPeriodos = async (filter: any) => {
    // @ts-ignore
    const data = await window.API.getPeriodos(filter);
    const pActive = data[0].find((p) => p.estado === true);
    console.log("pactive", pActive);
    if (pActive) setPeriodo(pActive.periodo);
    console.log(data);
    setPeriodos(data[0]);
    return data[0];
  };

  const getAnios = async (periodoId) => {
    // @ts-ignore
    const data = await window.API.getAnios(periodoId);
    if (data) {
      setAnios(data);
      return data;
    }
    return data;
  };

  const handledDeleteAnio = async () => {
    handleCloseDeleteAnio();
    let deleteAnio;
    try {
      //@ts-ignore
      deleteAnio = await window.API.deleteAnio(idAnioDelete.id);
    } catch (error) {
      Swal.fire({
        title: `Error al borrar ${idAnioDelete.anio}`,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    console.log("delete response", deleteAnio);
    if (deleteAnio === "error") {
      return Swal.fire({
        title: `NO puedes borrar el año. Año en uso `,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    await getAnios(idAnioDelete.periodo.id);

    Swal.fire({
      title: `${idAnioDelete.anio} Borrado`,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const insertPeriodo = async (periodo: any) => {
    const dataPeriodo = {
      periodo: periodo,
      estado: true,
    };
    // @ts-ignore
    const data = await window.API.insertPeriodo(dataPeriodo);
    if (data) {
      idPeriodo += 1;
      getData();
      Swal.fire({
        title: "Periodo creado",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const getData = async () => {
    await getPeriodos({ pageIndex: 1, pageSize: 3 });

    console.log("id idPeriodod", idPeriodo);

    await getAnios(idPeriodo);

    setLoading(false);
  };

  const gradeAlumnos = async (periodoId, newPeriodo) => {
    // @ts-ignore
    const data = await window.API.gradeAlumnos({
      periodo: periodoId,
      newPeriodo,
    });
    console.log(data);
    if (data) {
      Swal.fire({
        title: "Alumnos Grados",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      idPeriodo += 1;
      navigate("/logout");
    }
  };

  const insertAnio = async (anio: any) => {
    anio.periodoId = idPeriodo;

    anio.anio = anio.anio.toUpperCase();
    // @ts-ignore
    const data = await window.API.createAnio(anio);
    if (data) {
      Swal.fire({
        title: "Año creado",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setValue({ yearOne: "", yearTwo: "", anio: null, numberAnio: null });
    // @ts-ignore
    await getAnios(idPeriodo);
  };

  React.useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  return (
    <Box
      className="animate__animated animate__fadeInRight"
      component="main"
      sx={{
        flexGrow: 1,
        p: 4,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DrawerHeader />
      <Button onClick={handleClickOpenAddPeriodoGrade}>
        <GradeIcon sx={{ mr: 1 }} />
        Graduar Alumnos
      </Button>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            sx={{ marginTop: "0.5rem", textAlign: "center" }}
          >
            Lista de Periodos
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <Button
              onClick={handleClickOpenAddPeriodo}
              sx={{
                fontWeight: "bold",
              }}
              variant="outlined"
            >
              Agregar Periodo
            </Button>
          </Box>
          <TableCustom
            rows={periodos}
            loading={loading}
            toolbar={false}
            handleClick={async function (args: any) {
              console.log(args);
              idPeriodo = args.id;
              setPeriodo(args.row.periodo);
              await getAnios(args.id);
            }}
            handleDobleClick={() => {
              console.log("first");
            }}
            columns={[
              {
                field: "id",
                headerName: "ID",
                disableExport: true,
                hide: true,
              },
              {
                field: "periodo",
                headerName: "Periodos",
                headerClassName: "backGround",
                width: 130,
                headerAlign: "center",
                flex: 1,
                align: "center",
                renderCell: (params) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Tooltip
                        title={`Periodo ${
                          params.row.estado ? "Activo" : "Inactivo"
                        } `}
                        arrow
                        placement="right"
                      >
                        <Box>
                          {params.formattedValue}{" "}
                          <Checkbox checked={Boolean(params.row.estado)} />
                        </Box>
                      </Tooltip>
                    </Box>
                  );
                },
              },
            ]}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            sx={{ marginTop: "0.5rem", textAlign: "center" }}
          >
            Lista de Años ({periodo})
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <Button
              onClick={handleClickOpenAddAnio}
              sx={{
                fontWeight: "bold",
              }}
              variant="outlined"
            >
              Agregar Año
            </Button>
          </Box>
          <TableCustom
            rows={anios}
            loading={loading}
            toolbar={false}
            handleClick={() => {
              console.log("first");
            }}
            handleDobleClick={() => {
              console.log("first");
            }}
            columns={[
              {
                field: "id",
                headerName: "ID",
                disableExport: true,
                hide: true,
              },
              {
                field: "anio",
                headerName: "Años",
                headerClassName: "backGround",
                headerAlign: "center",
                flex: 1,
                align: "center",
                renderCell: (params) => {
                  return (
                    <Button
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                      }}
                      onClick={() => {
                        navigate("/anio/" + params.id);
                      }}
                    >
                      <Tooltip
                        title={`Click para ver las secciones de ${params.formattedValue}`}
                        arrow
                        placement="right"
                      >
                        <Typography>{params.formattedValue}</Typography>
                      </Tooltip>
                    </Button>
                  );
                },
              },
              {
                field: "estado",
                headerName: "Opciones",
                width: 150,
                headerClassName: "backGround",
                headerAlign: "center",
                align: "center",
                renderCell: (params) => {
                  return (
                    <Button
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                      }}
                      onClick={() => {
                        handleClickOpenDeleteAnio();
                        setIdAnioDelete(params.row);
                      }}
                    >
                      <Tooltip title="Borrar" arrow placement="right">
                        <RemoveCircleIcon sx={{ color: "red" }} />
                      </Tooltip>
                    </Button>
                  );
                },
              },
            ]}
          />
        </Box>
      </Box>
      <CustomModal
        btnText="Eliminar"
        color="red"
        tittle={"Alerta"}
        openDialog={openDeleteAnio}
        handleCloseDialog={handleCloseDeleteAnio}
        handledConfirm={handledDeleteAnio}
      >
        <DialogContentText>
          Confirma que desea eliminar {idAnioDelete.anio}
        </DialogContentText>
      </CustomModal>
      <CustomModal
        btnText="Agregar"
        color="primary"
        tittle={"Agregar Periodo"}
        openDialog={openAddPeriodo}
        handleCloseDialog={handleCloseAddPeriodo}
        handledConfirm={async () => {
          await insertPeriodo(`${value.yearOne} - ${value.yearTwo}`);
          handleCloseAddPeriodo();
        }}
      >
        <Typography>
          "¡Advertencia! Una vez que ingrese un nuevo periodo, no podrá editarlo
          ni eliminarlo. <br /> Asegúrese de verificar cuidadosamente la
          información antes de guardar. ¿Desea continuar?"
        </Typography>
        <FormGroup
          sx={{
            gap: 2,
            mt: 2,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              views={["year"]}
              label="Desde"
              value={value?.yearOne}
              onChange={(newValue: Moment | null) => {
                setValue({
                  ...value,
                  yearOne: newValue?.format("YYYY") as string,
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              views={["year"]}
              label="Hasta"
              value={value?.yearTwo}
              onChange={(newValue: Moment | null) => {
                setValue({
                  ...value,
                  yearTwo: newValue?.format("YYYY") as string,
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormGroup>
      </CustomModal>
      <CustomModal
        btnText="Agregar"
        color="Primary"
        tittle={"Agregar Año"}
        openDialog={openAddAnio}
        handleCloseDialog={handleCloseAddAnio}
        handledConfirm={async () => {
          await insertAnio({ anio: value.anio, numberAnio: value.numberAnio });
          handleCloseAddAnio();
        }}
      >
        <Typography>
          "¡Atención! Una vez que agregue un nuevo año, no podrá editarlo.
          Además, solo se podrá borrar si no está actualmente en uso.
          <br /> ¿Desea continuar con la acción de agregar un nuevo año?"
        </Typography>
        <FormGroup
          sx={{
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            label="Año (Primer Año)"
            variant="outlined"
            value={value.anio}
            onChange={(e) => {
              setValue({ ...value, anio: e.target.value });
            }}
          />
          <Typography>Ingrese el numero correspondiente al año</Typography>
          <Input
            type="number"
            placeholder="Valor Numerico (1)"
            value={value.numberAnio}
            onChange={(e) => {
              setValue({ ...value, numberAnio: Number(e.target.value) });
            }}
          />
        </FormGroup>
      </CustomModal>
      <CustomModal
        btnText="Agregar"
        color="primary"
        tittle={"Agrega el nuevo periodo"}
        openDialog={openAddPeriodoGrade}
        handleCloseDialog={handleCloseAddPeriodoGrade}
        handledConfirm={async () => {
          await gradeAlumnos(idPeriodo, `${value.yearOne} - ${value.yearTwo}`);
          handleCloseAddPeriodoGrade();
        }}
      >
        <Typography>
          "¡Advertencia! Una vez que ingrese un nuevo periodo, no podrá editarlo
          ni eliminarlo. <br /> Asegúrese de verificar cuidadosamente la
          información antes de guardar. ¿Desea continuar?"
        </Typography>
        <FormGroup
          sx={{
            gap: 2,
            mt: 2,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              views={["year"]}
              label="Desde"
              value={value?.yearOne}
              onChange={(newValue: Moment | null) => {
                setValue({
                  ...value,
                  yearOne: newValue?.format("YYYY") as string,
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              views={["year"]}
              label="Hasta"
              value={value?.yearTwo}
              onChange={(newValue: Moment | null) => {
                setValue({
                  ...value,
                  yearTwo: newValue?.format("YYYY") as string,
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormGroup>
      </CustomModal>
    </Box>
  );
};

export default SetupYear;
