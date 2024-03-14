import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
  ResponsiveContainer,
  BarChart,
  Rectangle,
  Pie,
  PieChart,
  Cell,
  Scatter,
} from "recharts";

import Typography from "@mui/material/Typography";
import { GlobalContext } from "../../config/context/GlobalContext";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import moment from "moment";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Bitacora() {
  const [bitacora, setBitacora] = React.useState([]);
  const getBitacora = async (filter = 0) => {
    // @ts-ignore
    const data = await window.API.getBitacora(filter);
    console.log(data);
    const mapData = data.map((item: any) => {
      return {
        ...item,
        fecha: moment(item.fecha).format("DD/MM/YYYY"),
        hora: moment(item.fecha).format("HH:mm:ss"),
      };
    });
    setBitacora(mapData);
    return data[0];
  };

  React.useEffect(() => {
    getBitacora(0);
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20, hide: true },
    { field: "accion", headerName: "Acción", width: 100 },
    { field: "usuario", headerName: "Usuario", width: 200 },
    { field: "descripcion", headerName: "Descripción", width: 300, flex: 1 },
    { field: "fecha", headerName: "Fecha", width: 150 },
    { field: "hora", headerName: "Hora", width: 150 },
  ];

  return (
    <Box
      className="animate__animated animate__fadeInRight"
      component="main"
      sx={{ flexGrow: 1, p: 3, overflow: "auto !important" }}
    >
      <DrawerHeader />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 5,
          }}
          variant="h4"
          component="div"
          gutterBottom
        >
          Bitacora
        </Typography>

        <div style={{ height: "80vh", width: "100%" }}>
          <DataGrid
            rows={bitacora}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            localeText={{
              noRowsLabel: "No hay registros",
              footerRowSelected: (count) =>
                `${count.toLocaleString()} fila(s) seleccionada(s)`,
              rowReorderingHeaderName: "Orden",
              footerTotalRows: "Total de filas:",
              footerTotalVisibleRows: (visibleCount, totalCount) =>
                `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,
              filterOperatorAfter: "Después",
              filterOperatorBefore: "Antes",
              MuiTablePagination: {
                labelRowsPerPage: "Filas por página",
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`,
              },
            }}
          />
        </div>
      </Box>
    </Box>
  );
}
