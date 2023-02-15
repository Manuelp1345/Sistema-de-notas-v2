import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../config/context/GlobalContext";
import { useContext } from "react";
import Swal from "sweetalert2";

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
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [error, setError] = useState({
    correo: false,
    password: false,
    password2: false,
    nombre: false,
    apellido: false,
  });

  const validateData = () => {
    if (nombre === "") {
      setError({ ...error, nombre: true });
      return true;
    }
    if (apellido === "") {
      setError({ ...error, apellido: true });
      return true;
    }
    if (correo === "") {
      setError({ ...error, correo: true });
      if (correo.includes("@")) {
        setError({ ...error, correo: true });
      }
      if (correo.includes(".")) {
        setError({ ...error, correo: true });
      }

      return true;
    }
    if (password === "") {
      setError({ ...error, password: true });
      return true;
    }
    if (password2 === "") {
      setError({ ...error, password2: true });
      return true;
    }
    setError({
      correo: false,
      password: false,
      password2: false,
      nombre: false,
      apellido: false,
    });
    return false;
  };

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
    if (
      error.correo === false &&
      error.password === false &&
      error.password2 === false &&
      error.nombre === false &&
      error.apellido === false
    ) {
      if (password === password2) {
        const credentials = await createCredentials();

        console.log(credentials);
        if (credentials) {
          user.setUser(credentials);
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
          error={error.nombre}
          onKeyUp={validateData}
          onBlur={validateData}
          helperText={error.nombre ? "Campo requerido" : ""}
        />
        <CssTextField
          onChange={handleApellidoChange}
          sx={{ marginY: "0.3rem", marginLeft: "0.3rem" }}
          id="setupHost"
          label="Apellido"
          value={apellido}
          onBlur={validateData}
          onKeyUp={validateData}
          error={error.apellido}
          helperText={error.apellido ? "Campo requerido" : ""}
        />
      </Box>
      <CssTextField
        sx={{ marginY: "0.3rem" }}
        id="setupUser"
        label="Correo"
        value={correo}
        onKeyUp={validateData}
        onChange={handleUserChange}
        error={error.correo}
        onBlur={validateData}
        helperText={error.correo ? "Campo requerido" : ""}
      />
      <CssTextField
        onChange={handlePasswordChange}
        type="password"
        sx={{ marginY: "0.3rem" }}
        id="setupPass"
        label="Contraseña"
        value={password}
        onKeyUp={validateData}
        error={error.password}
        onBlur={validateData}
        helperText={error.password ? "Campo requerido" : ""}
      />
      <CssTextField
        onChange={handlePassword2Change}
        type="password"
        sx={{ marginY: "0.3rem" }}
        id="setupPass"
        onKeyUp={validateData}
        onBlur={validateData}
        label="Confirmar contraseña"
        value={password2}
        error={error.password2}
        helperText={error.password2 ? "Campo requerido" : ""}
      />
      <ColorButton
        onClick={() => {
          const valid = validateData();
          if (!valid) handledClick();
        }}
      >
        Registrarse
      </ColorButton>
    </Box>
  );
};

export default Register;
