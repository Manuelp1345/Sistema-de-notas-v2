import { SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
      color: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
    "& input:focus": {
      color: "white",
    },
  },
});
const ColorButton = styled(Button)(() => ({
  color: "white",
  backgroundColor: blue[500],
  marginTop: "2.5rem",
  "&:hover": {
    backgroundColor: blue[700],
  },
}));

export function Setup() {
  const [host, setHost] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [port, setPort] = useState("3306");
  const navigate = useNavigate();

  const createCredentials = async () => {
    //@ts-ignore
    return await window.API.createCredentialsDB({
      host,
      user,
      pass: password,
      port: Number(port),
    });
  };

  const handledClick = async () => {
    if (host !== "" && user !== "" && password !== "" && port !== "") {
      const credentials = await createCredentials();
      console.log(credentials);
      if (credentials) {
        navigate("/create-user");
      }
    }
  };

  const handleHostChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setHost(event.target.value);
  };

  const handleUserChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUser(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handlePortChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPort(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "info.main",
          color: "info.contrastText",
          height: "80%",
          width: "50%",
          boxShadow: "-5px 10px 20px rgba(0, 0, 0, 0.8)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ textAlign: "center", marginTop: "1rem" }}
          variant="h3"
        >
          Bienvenido
        </Typography>
        <Typography sx={{ textAlign: "center" }} variant="h5">
          sigue todos los pasos para configurar el sistema
        </Typography>
        <Typography
          sx={{ textAlign: "center", marginTop: "3rem", marginBottom: "1rem" }}
          variant="h6"
        >
          Datos de ingresos de la base de datos
        </Typography>
        <CssTextField
          onChange={handleHostChange}
          sx={{ marginY: "0.3rem" }}
          id="setupHost"
          label="Host"
          value={host}
        />
        <CssTextField
          onChange={handlePortChange}
          sx={{ marginY: "0.3rem" }}
          id="setupHost"
          label="Puerto"
          value={port}
          type="number"
        />
        <CssTextField
          sx={{ marginY: "0.3rem" }}
          id="setupUser"
          label="Usuario"
          value={user}
          onChange={handleUserChange}
        />
        <CssTextField
          onChange={handlePasswordChange}
          type="password"
          sx={{ marginY: "0.3rem" }}
          id="setupPass"
          label="contraseña"
          value={password}
        />
        <ColorButton onClick={handledClick}>Continuar</ColorButton>
      </Box>
    </Box>
  );
}
