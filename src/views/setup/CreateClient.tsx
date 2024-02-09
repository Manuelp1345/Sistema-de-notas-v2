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

export function CreateUser() {
  const [nombre, setHost] = useState("");
  const [correo, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [apellido, setApellido] = useState("");
  const navigate = useNavigate();

  const createUser = async () => {
    //@ts-ignore
    await window.API.createCredentialsDB();

    //@ts-ignore
    return await window.API.createUserDB({
      nombre,
      apellido,
      email: correo,
      password,
      role: "OWNER",
    });
  };

  const handledClick = async () => {
    if (nombre !== "" && correo !== "" && password !== "" && correo !== "") {
      const credentials = await createUser();
      console.log(credentials);
      if (credentials) {
        navigate("/home");
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
    setApellido(event.target.value);
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
          Crea tu usuario
        </Typography>
        <CssTextField
          onChange={handleHostChange}
          sx={{ marginY: "0.3rem" }}
          id="setupHost"
          label="Nombre"
          value={nombre}
        />
        <CssTextField
          onChange={handlePortChange}
          sx={{ marginY: "0.3rem" }}
          id="setupHost"
          label="Apellido"
          value={apellido}
          type="text"
        />
        <CssTextField
          sx={{ marginY: "0.3rem" }}
          id="setupUser"
          label="Correo"
          value={correo}
          onChange={handleUserChange}
          type="email"
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
