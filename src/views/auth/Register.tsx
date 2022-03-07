import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
    marginBottom: "4rem",
    borderRadius: "0.1rem",
    top: "0.4rem",
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
      borderColor: "black",
    },
    "& input:focus": {
      color: "black",
    },
    "& input": {
      backgroundColor: "white",
      borderRadius: "0.3rem",
      padding: "1rem",
    },
  },
});
const ColorButton = styled(Button)(() => ({
  color: "white",
  backgroundColor: blue[800],
  marginTop: "2.5rem",
  "&:hover": {
    backgroundColor: blue[900],
  },
}));

const Register = () => {
  const [nombre, setHost] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const createCredentials = async () => {
    //@ts-ignore
    return await window.API.createUserDB({
      nombre: nombre,
      apellido: apellido,
      email: correo,
      password: password,
      role: "USER",
    });
  };

  const handledClick = async () => {
    if (nombre !== "" && correo !== "" && password !== "" && password2 !== "") {
      if (password === password2) {
        const credentials = await createCredentials();
        console.log(credentials);
        if (credentials) {
          navigate("/home");
        }
      }
    }
  };
  const handleHostChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setHost(event.target.value);
  };

  const handleUserChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUser(event.target.value);
  };
  const handleApellidoChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setApellido(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handlePassword2Change = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword2(event.target.value);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box>
        <CssTextField
          onChange={handleHostChange}
          sx={{ marginY: "0.3rem", marginRight: "0.3rem" }}
          id="setupHost"
          label="Nombre"
          value={nombre}
        />
        <CssTextField
          onChange={handleApellidoChange}
          sx={{ marginY: "0.3rem", marginLeft: "0.3rem" }}
          id="setupHost"
          label="Apellido"
          value={apellido}
        />
      </Box>
      <CssTextField
        sx={{ marginY: "0.3rem" }}
        id="setupUser"
        label="Correo"
        value={correo}
        onChange={handleUserChange}
      />
      <CssTextField
        onChange={handlePasswordChange}
        type="password"
        sx={{ marginY: "0.3rem" }}
        id="setupPass"
        label="Contraseña"
        value={password}
      />
      <CssTextField
        onChange={handlePassword2Change}
        type="password"
        sx={{ marginY: "0.3rem" }}
        id="setupPass"
        label="Confirmar contraseña"
        value={password2}
      />
      <ColorButton onClick={handledClick}>Registrarse</ColorButton>
    </Box>
  );
};

export default Register;
