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

const Year = (): JSX.Element => {
  const { id } = useParams();
  const [anio, setAnio] = useState([{}]);
  const [secciones, setSecciones] = useState({});
  const navigate = useNavigate();

  const getData = async () => {
    // @ts-ignore
    const anio = await window.API.getAnio(id);
    console.log(anio);
    setAnio(anio);
    // @ts-ignore
    const findSecciones = await getSecciones(anio.id);
    console.log(findSecciones);
    // @ts-ignore
    $("#Secciones").jsGrid("loadData", findSecciones);
    // @ts-ignore
    $("#Secciones").jsGrid("refresh");
  };

  const getSecciones = async (id) => {
    console.log("id anio", id);
    // @ts-ignore
    const findSecciones = await window.API.getSecciones(id);
    console.log(findSecciones);
    setSecciones({ data: findSecciones, itemsCount: 0 });
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
    $("#Areas").jsGrid({
      width: "100%",
      height: "100%",
      paging: true,
      pageLoading: true,
      pageSize: 3,
      pageIndex: 1,
      heading: true,
      inserting: true,
      loadMessage: "Por favor espere",
      loadShading: true,
      noDataContent: "No hay Áreas",
      pagerFormat: "{prev} {pages} {next} {pageIndex} de {pageCount}",
      pagePrevText: "Anterior",
      pageNextText: "Siguiente",
      pageFirstText: "Primera",
      pageLastText: "Ultima",
      pageNavigatorNextText: "...",
      pageNavigatorPrevText: "...",
      invalidMessage: "Por favor ingreser un valor valido",
      data: [
        {
          area: "Matematica",
        },
        {
          area: "Ingles",
        },
        {
          area: "Ingles",
        },
        {
          area: "Ingles",
        },
        {
          area: "Ingles",
        },
        {
          area: "Ingles",
        },
        {
          area: "Ingles",
        },
        {
          area: "Ingles",
        },
        {
          area: "Ingles",
        },
        {
          area: "Ingles",
        },
        {
          area: "Inglesss",
        },
      ],
      controller: {
        loadData: () => {
          console.log("");
        },

        insertItem: async () => {
          // await insertAnio(item);
          // @ts-ignore
          $("#Areas").jsGrid("refresh");
        },
      },

      rowClick: function () {
        //
      },
      fields: [
        {
          name: "area",
          title: "Área",
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
    $("#Secciones").jsGrid({
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
      noDataContent: "No hay Secciones",
      pagerFormat: "{prev} {pages} {next} {pageIndex} de {pageCount}",
      pagePrevText: "Anterior",
      pageNextText: "Siguiente",
      pageFirstText: "Primera",
      pageLastText: "Ultima",
      pageNavigatorNextText: "...",
      pageNavigatorPrevText: "...",
      invalidMessage: "Por favor ingreser un valor valido",
      rowClick: async function (args: any) {
        console.log(args.item.id);
        navigate("/seccion/" + args.item.id);
      },
      controller: {
        loadData: async () => {
          return await getSecciones(id);
        },
        insertItem: async function (item: any) {
          await insertSeccion(item);
          // @ts-ignore

          $("#periodo").jsGrid("refresh");
        },
      },
      // @ts-ignore
      invalidNotify: ({ item }) => {
        console.log(item);
        if (item.periodo === "") {
          Swal.fire({
            title: "Error",
            text: "Ingrese una seccion",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
          return;
        }
      },
      fields: [
        {
          name: "seccion",
          title: "Secciones",
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
          setSecciones({});
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
            anio.anio
          }
        </Typography>
      </Box>

      <Box sx={{ marginTop: "2.5rem" }} id="Secciones" component="div"></Box>
      <Box>
        <Typography
          variant="h4"
          sx={{ marginTop: "0.5rem", textAlign: "center" }}
        >
          Áreas
        </Typography>
        <Box id="Areas" component="div"></Box>
      </Box>
    </Box>
  );
};

export default Year;
