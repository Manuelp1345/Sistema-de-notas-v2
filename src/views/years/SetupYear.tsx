/* eslint-disable no-undef */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  Switch,
  Typography,
  Button,
  Tooltip,
  FormGroup,
  TextField,
  Radio,
  Checkbox,
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
  const [idAnioDelete, setIdAnioDelete] = useState({
    id: 0,
    anio: "",
    periodo: { id: 0 },
  });

  const [value, setValue] = React.useState<{
    yearOne: string | null;
    yearTwo: string | null;
  }>({
    yearOne: "",
    yearTwo: "",
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
    let periodos;
    try {
      periodos = await getPeriodos({ pageIndex: 1, pageSize: 3 });
      console.log("periodos", periodos);

      // @ts-ignore
      $("#periodo").jsGrid("loadData", periodos);
      // @ts-ignore
      $("#periodo").jsGrid("refresh");
    } catch (error) {
      console.log(error);
    }

    let anios;
    try {
      anios = await getAnios(periodos.data[0].id);
      console.log("anios", anios);
      // @ts-ignore
      $("#jsGrid").jsGrid("loadData", anios);
      // @ts-ignore
      $("#jsGrid").jsGrid("refresh");
    } catch (error) {
      console.log(error);
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
  };

  React.useEffect(() => {
    // @ts-ignore
    $("#jsGrid").jsGrid({
      width: "100%",

      paging: true,
      autoload: false,
      pageLoading: true,
      pageSize: 3,
      pageIndex: 1,
      heading: true,
      inserting: true,
      loadIndication: true,
      loadMessage: "Por favor espere",
      loadShading: true,
      noDataContent: "No hay años registrados",
      pagerFormat: "{prev} {pages} {next} {pageIndex} de {pageCount}",
      pagePrevText: "Anterior",
      pageNextText: "Siguiente",
      pageFirstText: "Primera",
      pageLastText: "Ultima",
      pageNavigatorNextText: "...",
      pageNavigatorPrevText: "...",
      invalidMessage: "Por favor ingreser un valor valido",

      confirmDeleting: true,
      deleteConfirm: (item) => {
        return `seguro sea eliminar "${item.anio}"`;
      },
      onItemDeleting: async (element) => {
        console.log("item delete", element);
        let deleteAnio;
        try {
          //@ts-ignore
          deleteAnio = await window.API.deleteAnio(element.item.id);
        } catch (error) {
          Swal.fire({
            title: `Error al borrar ${element.item.anio}`,
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log("delete response", deleteAnio);
        if (deleteAnio === "error") {
          return Swal.fire({
            title: `NO puedes borrar la sección. Sección en uso `,
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }

        Swal.fire({
          title: `${element.item.anio} Borrado`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        // @ts-ignore

        $("#jsGrid").jsGrid("refresh");
        // @ts-ignore

        $("#jsGrid").jsGrid("reset");
      },

      controller: {
        loadData: () => {
          return getAnios(idPeriodo);
        },

        insertItem: async (item: any) => {
          await insertAnio(item);
          // @ts-ignore
          $("#jsGrid").jsGrid("refresh");
        },
      },

      rowClick: function (args: any) {
        navigate("/anio/" + args.item.id);
      },
      fields: [
        {
          name: "anio",
          title: "Años",
          align: "center",
          type: "text",
        },
        {
          name: "id",
          title: "ids",
          align: "center",
          type: "text",
          visible: false,
        },
        { type: "control", width: 10, editButton: false },
      ],
    });
    // @ts-ignore

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
            loading={periodos.length === 0}
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
              onClick={() => {
                console.log("first");
              }}
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
            loading={anios.length === 0}
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
                  console.log("params", params);
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
        color="green"
        tittle={"Agregar Periodo"}
        openDialog={openAddPeriodo}
        handleCloseDialog={handleCloseAddPeriodo}
        handledConfirm={async () => {
          await insertPeriodo(`${value.yearOne} - ${value.yearTwo}`);
          handleCloseAddPeriodo();
        }}
      >
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
