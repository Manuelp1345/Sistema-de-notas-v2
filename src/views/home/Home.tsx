import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { House } from "@mui/icons-material";
import SchoolIcon from "@mui/icons-material/School";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import { GlobalContext } from "../../config/context/GlobalContext";
import { Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Home() {
  const { user } = React.useContext<any>(GlobalContext);
  const navigate = useNavigate();
  const buttons = [
    "Años",
    "Graduados",
    "Administración",
    "Estadisticas",
    "Salir",
  ];
  const update = async () => {
    //@ts-ignore
    await window.API.createDataFake();
  };
  return (
    <Box
      className="animate__animated animate__fadeInRight"
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        overflow: "auto !important",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <DrawerHeader />

      {/*     <Button onClick={update}>generar data</Button> */}

      <Typography paragraph>
        ¡Bienvenido al sistema de notas automatizado para el área administrativa
        de la U.E Jose Enrique Arias! Este sistema en línea ha sido diseñado
        para mejorar y simplificar el proceso de seguimiento y evaluación del
        progreso académico de los estudiantes. Como miembro del equipo
        administrativo, podrás acceder a las notas de los estudiantes en tiempo
        real, recibir actualizaciones y estar al tanto del desempeño escolar de
        manera más eficiente. Esperamos que este sistema sea una herramienta
        útil para mejorar la comunicación y el éxito educativo de todos los
        estudiantes en la U.E Jose Enrique Arias. ¡Gracias por utilizar nuestro
        sistema de notas automatizado!
      </Typography>

      <Box
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
          mt: 5,
        }}
      >
        {buttons.map((button, index) => (
          <Button
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "10rem",
              height: "10rem",

              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
            //@ts-ignore
            onClick={() =>
              //@ts-ignore
              (index === 0 && user.user.role !== "USER" && navigate("/anos")) ||
              //@ts-ignore

              (index === 1 &&
                user.user.role !== "USER" &&
                navigate("/search")) ||
              //@ts-ignore

              (index === 2 &&
                user.user.role !== "USER" &&
                navigate("/admin")) ||
              //@ts-ignore
              (index === 3 && navigate("/stats")) ||
              //@ts-ignore
              (index === 4 && navigate("/logout"))
            }
          >
            {index === 0 && user.user.role !== "USER" && (
              <Tooltip title={`Años`} arrow placement="right">
                <DateRangeIcon />
              </Tooltip>
            )}
            {index === 1 && user.user.role !== "USER" && (
              <Tooltip title={`Graduados`} arrow placement="right">
                <SchoolIcon />
              </Tooltip>
            )}
            {index === 2 && user.user.role !== "USER" && (
              <Tooltip title={`Administración`} arrow placement="right">
                <AdminPanelSettingsIcon />
              </Tooltip>
            )}
            {index === 3 && (
              <Tooltip title={`stats`} arrow placement="right">
                <QueryStatsIcon />
              </Tooltip>
            )}
            {index === 4 && (
              <Tooltip title={`Salir`} arrow placement="right">
                <LogoutIcon />
              </Tooltip>
            )}
            {button}
          </Button>
        ))}
      </Box>

      {user.user.role === "USER" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            mt: 2,
            gap: 5,
          }}
        >
          <Box>
            <FullCalendar
              height={"27rem"}
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              locale={esLocale}
            />
          </Box>
          <Button variant="contained">Generar Consulta</Button>
          <Button onClick={() => navigate("/logout")} variant="contained">
            <LogoutIcon /> Salir del sistema
          </Button>
        </Box>
      )}
    </Box>
  );
}
