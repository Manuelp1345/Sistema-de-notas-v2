import React from "react";
import Box from "@mui/material/Box";
import FullCalendar from "@fullcalendar/react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ArrowBack, ArrowForwardIosTwoTone } from "@mui/icons-material";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Year = () => {
  const { id } = useParams();
  const [anio, setAnio] = useState([{}]);
  const navigate = useNavigate();

  const getData = async () => {
    // @ts-ignore
    const data = await window.API.getAnios(id);
    console.log(data);
    setAnio(data);
  };

  useEffect(() => {
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
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBack sx={{ mr: 1 }} />
          Volver
        </Button>
        <Typography
          width="100%"
          textAlign="center"
          variant="h4"
          component="h1"
          gutterBottom
        >
          {
            // @ts-ignore
            anio[0].anio
          }
        </Typography>
      </Box>
    </Box>
  );
};

export default Year;
