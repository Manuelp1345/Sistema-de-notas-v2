import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Button, Tooltip, FormGroup, TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Swal from "sweetalert2";
import { GlobalContext } from "../../config/context/GlobalContext";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { TableCustom } from "../table/TableCustom";
import { CustomModal } from "../modals/customModal";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Year = (): JSX.Element => {
  const { id } = useParams();
  const [secciones, setSecciones] = useState([]);

  const [value, setValue] = React.useState<{
    seccion: string | null;
    area: string | null;
  }>({
    seccion: null,
    area: null,
  });

  const [openAddSeccion, setOpenAddSeccion] = React.useState(false);
  const handleClickOpenAddSeccion = () => setOpenAddSeccion(true);
  const handleCloseAddSeccion = () => {
    setOpenAddSeccion(false);
  };

  const [openAddArea, setOpenAddArea] = React.useState(false);
  const handleClickOpenAddArea = () => setOpenAddArea(true);
  const handleCloseAddArea = () => {
    setOpenAddArea(false);
  };

  const navigate = useNavigate();
  const { areas } = useContext(GlobalContext);

  const getData = async () => {
    // @ts-ignore
    const anio = await window.API.getAnio(id);
    console.log(anio);
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
    setSecciones(findSecciones);
    // @ts-ignore
    return { findSecciones };
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

  const insertSeccion = async (seccion) => {
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
    setValue({ seccion: null, area: null });
  };
  const insertArea = async (nombre) => {
    // @ts-ignore
    const data = await window.API.insertArea({ area: nombre, anio: id });

    if (data) {
      getData();
      Swal.fire({
        title: "Área creada",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setValue({ seccion: null, area: null });
  };

  useEffect(() => {
    (async () => {
      await getData();
      console.log("id", id);
      //@ts-ignore
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
          setSecciones([]);
          areas.setAreas([]);
          navigate(-1);
        }}
      >
        <ArrowBack sx={{ mr: 1 }} />
        Volver
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
            Lista de Secciones
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <Button
              onClick={handleClickOpenAddSeccion}
              sx={{
                fontWeight: "bold",
              }}
              variant="outlined"
            >
              Agregar Sección
            </Button>
          </Box>
          <TableCustom
            rows={secciones}
            loading={secciones.length === 0}
            toolbar={false}
            handleClick={async function () {
              console.log("params");
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
                field: "seccion",
                headerName: "Secciones",
                headerClassName: "backGround",
                width: 130,
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
                        navigate("/seccion/" + params.id);
                      }}
                    >
                      <Tooltip
                        title={`Click para ver la seccion ${params.formattedValue}`}
                        arrow
                        placement="right"
                      >
                        <Typography>{params.formattedValue}</Typography>
                      </Tooltip>
                    </Button>
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
            Lista de Areas
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <Button
              onClick={handleClickOpenAddArea}
              sx={{
                fontWeight: "bold",
              }}
              variant="outlined"
            >
              Agregar Area
            </Button>
          </Box>
          <TableCustom
            rows={areas.areas}
            loading={areas?.areas?.length === 0}
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
                field: "nombre",
                headerName: "Areas",
                headerClassName: "backGround",
                headerAlign: "center",
                flex: 1,
                align: "center",
              },
              {
                field: "estado",
                headerName: "Opciones",
                width: 150,
                headerClassName: "backGround",
                headerAlign: "center",
                align: "center",
                renderCell: () => {
                  return (
                    <Button
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                      }}
                      onClick={() => {
                        console.log("params");
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
        btnText="Agregar"
        color="Primary"
        tittle={"Agregar Seccion"}
        openDialog={openAddSeccion}
        handleCloseDialog={handleCloseAddSeccion}
        handledConfirm={async () => {
          await insertSeccion(value.seccion);
          handleCloseAddSeccion();
        }}
      >
        <FormGroup
          sx={{
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            label="Seccion"
            variant="outlined"
            value={value.seccion}
            onChange={(e) => {
              setValue({ ...value, seccion: e.target.value });
            }}
          />
        </FormGroup>
      </CustomModal>
      <CustomModal
        btnText="Agregar"
        color="Primary"
        tittle={"Agregar Area"}
        openDialog={openAddArea}
        handleCloseDialog={handleCloseAddArea}
        handledConfirm={async () => {
          await insertArea(value.area);
          handleCloseAddArea();
        }}
      >
        <FormGroup
          sx={{
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            label="Area"
            variant="outlined"
            value={value.area}
            onChange={(e) => {
              setValue({ ...value, area: e.target.value });
            }}
          />
        </FormGroup>
      </CustomModal>
    </Box>
  );
};

export default Year;
