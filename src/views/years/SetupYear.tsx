/* eslint-disable no-undef */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { ArrowForwardIosTwoTone } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const SetupYear = ({ idPedioro }) => {
  const [periodos, setPeriodos] = useState({});
  const navigate = useNavigate();
  const getPeriodos = async (filter: any) => {
    // @ts-ignore
    const data = await window.API.getPeriodos(filter);
    console.log(data);
    setPeriodos({ data: data[0], itemsCount: data[1] });
    return { data: data[0], itemsCount: data[1] };
  };

  const getAnios = async (periodoId) => {
    // @ts-ignore
    const data = await window.API.getAnios(periodoId);
    if (data && data.length > 0) {
      return { data: data, itemsCount: 0 };
    }
    return { data: [], itemsCount: 0 };
  };

  const insertPeriodo = async (periodo: any) => {
    // @ts-ignore
    const data = await window.API.insertPeriodo(periodo);
    if (data) {
      idPedioro += 1;
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
    anio.periodoId = idPedioro;
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

    $("#periodo").jsGrid({
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
      noDataContent: "No hay periodos registrados",
      pagerFormat: "{prev} {pages} {next} {pageIndex} de {pageCount}",
      pagePrevText: "Anterior",
      pageNextText: "Siguiente",
      pageFirstText: "Primera",
      pageLastText: "Ultima",
      pageNavigatorNextText: "...",
      pageNavigatorPrevText: "...",
      invalidMessage: "Por favor ingreser un valor valido",
      rowClick: async function (args: any) {
        idPedioro = args.item.id;
        const anios = await getAnios(args.item.id);
        console.log("anios", anios);
        // @ts-ignore
        $("#jsGrid").jsGrid("loadData", anios);
        // @ts-ignore
      },

      controller: {
        loadData: async (filter: any) => {
          try {
            // @ts-ignore
            $("#jsGrid").jsGrid("loadData", periodos);
            // @ts-ignore
            $("#jsGrid").jsGrid("refresh");
          } catch (error) {
            console.log(error);
          }
          return getPeriodos(filter);
        },
        insertItem: async function (item: any) {
          await insertPeriodo(item);
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
            text: "Ingrese un periodo",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
          return;
        }
        if (item.estado === false) {
          Swal.fire({
            title: "Error",
            text: "Ingrese el estado del periodo",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
          return;
        }
      },
      fields: [
        {
          name: "periodo",
          title: "Periodos",
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
        {
          name: "estado",
          title: "Actual",
          align: "center",
          type: "checkbox",
          validate: (e: { estado: boolean }) => {
            if (e.estado === false) {
              return false;
            }
            return true;
          },
        },
        { type: "control", editButton: false, deleteButton: false },
      ],
    });

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
        loadData: (filter: any) => {
          return getAnios(idPedioro);
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
      noDataContent: "No hay Areas",
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
        loadData: (filter: any) => {
          console.log("");
        },

        insertItem: async (item: any) => {
          await insertAnio(item);
          // @ts-ignore
          $("#Areas").jsGrid("refresh");
        },
      },

      rowClick: function (args: any) {
        //
      },
      fields: [
        {
          name: "area",
          title: "Area",
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
      <Box>
        <Box id="periodo" component="div"></Box>
      </Box>

      <Box>
        <Typography
          variant="h4"
          sx={{ marginTop: "0.5rem", textAlign: "center" }}
        >
          Lista de Años
        </Typography>
        <Box id="jsGrid" component="div"></Box>
      </Box>
      <Box>
        <Typography
          variant="h4"
          sx={{ marginTop: "0.5rem", textAlign: "center" }}
        >
          Lista de Areas
        </Typography>
        <Box id="Areas" component="div"></Box>
      </Box>
    </Box>
  );
};

export default SetupYear;
