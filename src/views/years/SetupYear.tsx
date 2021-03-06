/* eslint-disable no-undef */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { ArrowForwardIosTwoTone } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useState } from "react";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const SetupYear = ({ idPedioro }) => {
  const getPeriodos = async (filter: any) => {
    // @ts-ignore
    const data = await window.API.getPeriodos(filter);
    console.log(data);
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
    // @ts-ignore
    const data = await window.API.createAnio(anio);
    if (data) {
      Swal.fire({
        title: "A??o creado",
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
      noDataContent: "No hay a??os registrados",
      pagerFormat: "{prev} {pages} {next} {pageIndex} de {pageCount}",
      pagePrevText: "Anterior",
      pageNextText: "Siguiente",
      pageFirstText: "Primera",
      pageLastText: "Ultima",
      pageNavigatorNextText: "...",
      pageNavigatorPrevText: "...",
      invalidMessage: "Por favor ingreser un valor valido",

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
        console.log(args);
      },
      fields: [
        {
          name: "anio",
          title: "A??os",
          align: "center",
          type: "text",
        },
        { type: "control", width: 10 },
      ],
    });
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
      rowClick: function (args: any) {
        console.log(args);
      },
      controller: {
        loadData: (filter: any) => {
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
        p: 3,
        alignItems: "center",
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <DrawerHeader />
      <Box sx={{ marginTop: "0.5rem" }} id="periodo" component="div"></Box>
      <Typography variant="h4" sx={{ marginTop: "1rem", textAlign: "center" }}>
        Lista de A??os
      </Typography>
      <Box sx={{ marginTop: "2.5rem" }} id="jsGrid" component="div"></Box>
    </Box>
  );
};

export default SetupYear;
