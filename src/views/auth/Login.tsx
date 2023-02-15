import styled from "@emotion/styled";
import { Alert, Box, Button, Snackbar, Stack, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../config/context/GlobalContext";

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
      border: "0.13rem solid black",
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

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(GlobalContext);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const navigate = useNavigate();

  const loginUser = async () => {
    //@ts-ignore
    return await window.API.login({
      email: correo,
      password,
    });
  };

  const handledClick = async () => {
    if (correo !== "" && password !== "") {
      const credentials = await loginUser();
      console.log(credentials);
      if (credentials) {
        user.setUser(credentials);
        localStorage.setItem("token", credentials);
        navigate("/Home");
      } else {
        handleClick();
      }
    }
  };
  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCorreo(event.target.value);
  };

  const handlePassChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  return (
    <Box sx={{ width: "28.5rem", display: "flex", flexDirection: "column" }}>
      <CssTextField
        onChange={handleEmailChange}
        type="email"
        sx={{ marginY: "0.3rem" }}
        label="Correo"
        value={correo}
      />
      <CssTextField
        onChange={handlePassChange}
        type="password"
        sx={{ marginY: "0.3rem" }}
        label="Contraseña"
        value={password}
      />
      <ColorButton onClick={handledClick}>Ingresar</ColorButton>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          {/* @ts-ignore */}
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Contraseña o correo incorrecto
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  );
};

export default Login;
