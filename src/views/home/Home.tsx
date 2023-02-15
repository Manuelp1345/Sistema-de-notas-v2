import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import { GlobalContext } from "../../config/context/GlobalContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
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
  return (
    <Box
      className="animate__animated animate__fadeInRight"
      component="main"
      sx={{ flexGrow: 1, p: 3, overflow: "auto !important" }}
    >
      <DrawerHeader />
      <Box>
        <FullCalendar
          height={"27rem"}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale={esLocale}
        />
      </Box>
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
          <Button variant="contained">Generar Consulta</Button>
          <Button onClick={() => navigate("/logout")} variant="contained">
            <LogoutIcon /> Salir del sistema
          </Button>
        </Box>
      )}
    </Box>
  );
}
