import * as React from "react";
import { styled, Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import Home from "./Home";
import { House, SearchOffOutlined, SearchOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SetupYear from "../years/SetupYear";
import Year from "../years/Year";
import Seccion from "../years/seccion";
import Alumno from "../years/alumno";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import { Tooltip } from "@mui/material";
const drawerWidth = 240;

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
  //@ts-ignore
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
  //@ts-ignore
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Dashboard({ element }: { element: string }) {
  //@ts-ignore
  document.querySelector("html").style.removeProperty("overflow");

  const [open, setOpen] = React.useState(false);
  const [periodo, setPeriodo] = React.useState({ periodo: "", id: 0 });
  const navigate = useNavigate();
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const getPeriodos = async (filter: number) => {
    console.log("getPeriodos");
    //@ts-ignore
    const data = await window.API.getPeriodos(filter);
    console.log(data);
    console.log(data[0][0]);
    data[0].find((item) => {
      console.log(item);
      if (item.estado) {
        setPeriodo({ periodo: item.periodo, id: item.id });
      }
    });
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const setBgColor = () => {
    //@ts-ignore

    window.API.background();
  };

  React.useEffect(() => {
    //@ts-ignore

    setBgColor();
    if (periodo.id === 0) {
      getPeriodos(1);
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      {/* @ts-ignore */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            U.E | Jose Enrique Arias | Sistema de Notas
          </Typography>
          <Typography
            sx={{ marginLeft: "10rem" }}
            variant="h6"
            noWrap
            component="div"
          >
            Periodo Actual: {periodo.periodo}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            "Inicio",
            "Años",
            "Buscar",
            "Administración",
            "Perfil",
            "Salir",
          ].map((text, index) => (
            <ListItem
              button
              selected={
                (element === "home" && index === 0) ||
                (element === "anos" && index === 1) ||
                (element === "perfil" && index === 4) ||
                (element === "search" && index === 2) ||
                (element === "admin" && index === 3)
              }
              //@ts-ignore
              onClick={() =>
                //@ts-ignore
                (index === 0 && navigate("/home")) ||
                //@ts-ignore

                (index === 1 && navigate("/anos")) ||
                //@ts-ignore

                (index === 2 && navigate("/search")) ||
                //@ts-ignore

                (index === 3 && navigate("/admin")) ||
                //@ts-ignore
                (index === 4 && navigate("/perfil")) ||
                //@ts-ignore
                (index === 5 && navigate("/logout"))
              }
              key={text}
            >
              <ListItemIcon>
                {index === 0 && (
                  <Tooltip title={`inicio`} arrow placement="right">
                    <House />
                  </Tooltip>
                )}
                {index === 1 && (
                  <Tooltip title={`Años`} arrow placement="right">
                    <DateRangeIcon />
                  </Tooltip>
                )}
                {index === 2 && (
                  <Tooltip title={`Buscador`} arrow placement="right">
                    <SearchOutlined />
                  </Tooltip>
                )}
                {index === 3 && (
                  <Tooltip title={`Administración`} arrow placement="right">
                    <AdminPanelSettingsIcon />
                  </Tooltip>
                )}
                {index === 4 && (
                  <Tooltip title={`Perfil`} arrow placement="right">
                    <AccountCircleIcon />
                  </Tooltip>
                )}
                {index === 5 && (
                  <Tooltip title={`Salir`} arrow placement="right">
                    <LogoutIcon />
                  </Tooltip>
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      {element === "home" && <Home />}
      {element === "anos" && <SetupYear idPeriodo={periodo.id} />}
      {element === "Year" && <Year />}
      {element === "seccion" && <Seccion />}
      {element === "alumno" && <Alumno />}
    </Box>
  );
}
