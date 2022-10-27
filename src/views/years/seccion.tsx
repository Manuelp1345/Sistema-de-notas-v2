import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
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

const Seccion = () => {
  const { id } = useParams();
  const [anio, setAnio] = useState({});
  const [secciones, setSecciones] = useState({ seccion: "loading" });
  const navigate = useNavigate();

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
          sx={{
            fontWeight: "bold",
          }}
          variant="outlined"
        >
          Agregar Alumno
        </Button>
      </Box>
      <Box sx={{ marginTop: "2rem" }} id="Alumnos" component="div"></Box>
    </Box>
  );
};

export default Seccion;
