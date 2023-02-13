import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { TableCustom } from "../table/TableCustom";
import GenerateBackup from "./BackupComponent";
import BackupList from "./backupListComponenet";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Admin = (): JSX.Element => {
  const [users, setUsers] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [dataEdit, setDataEdit] = React.useState<string>("");

  const generateBackup = async () => {
    //@ts-ignore
    const backup = await window.API.generateBackup();
    console.log(backup);
  };

  const fields = [
    {
      field: "id",
      headerName: "ID",
      disableExport: true,
      hide: true,
    },
    {
      field: "firstName",
      headerName: "Nombre",
      headerClassName: "backGround",
      width: 130,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "Surname",
      headerName: "Apellido",
      width: 130,
      headerClassName: "backGround",
      headerAlign: "center",
      flex: 1,
      type: "number",

      align: "center",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 130,
      headerClassName: "backGround",
      headerAlign: "center",
      flex: 1,
      type: "number",
      align: "center",
      editable: true,
    },
    {
      field: "role",
      headerName: "Rol",
      width: 130,
      headerClassName: "backGround",
      headerAlign: "center",
      flex: 1,
      type: "select",
      align: "center",
      editable: true,
      renderEditCell: (params) => {
        console.log("Params edirt componenet ", params);
        return (
          <FormControl
            sx={{
              width: "100%",
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={params.row.role}
              placeholder="Rol"
              label="Rol"
            >
              <MenuItem disabled value={"select"}>
                Rol
              </MenuItem>
              <MenuItem value={"user"}>Usuario</MenuItem>
              <MenuItem value={"Admin"}>Administrador</MenuItem>
              <MenuItem value={"OWNER"}>Super Administrador</MenuItem>
            </Select>
            {/*               {errorDataAlumno.sexo && (
            <Typography sx={{ color: "red", fontSize: ".9rem" }}>
              {'El campo "Sexo"'} <br /> {" es obligatorio"}
            </Typography>
          )} */}
          </FormControl>
        );
      },

      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              width: "1rem",
              justifyContent: "center",
              alignItems: "center",
              padding: "0.5rem",
            }}
          >
            <Tooltip title="Doble click para editar" arrow placement="right">
              <Box>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {params.formattedValue === "OWNER" && "Super Administrador"}
                {params.formattedValue === "user" && "usuario"}
                {params.formattedValue === "admin" && " Administrador"}
                &nbsp;&nbsp;&nbsp;&nbsp;
              </Box>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  const fetchUsers = async () => {
    //@ts-ignore
    const response = await window.API.getUsers();

    const mapUsers = response.map((user: any) => {
      user = {
        ...user,
        ...user.datosBasicos,
      };
      return user;
    });

    setUsers(mapUsers);
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      await fetchUsers();
    })();
    setLoading(false);
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
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <Typography
          width={"100%"}
          textAlign={"center"}
          variant="h4"
          gutterBottom
          component="div"
        >
          Administración
        </Typography>

        <br />
        <Typography
          width={"100%"}
          textAlign={"center"}
          variant="h5"
          gutterBottom
          component="div"
        >
          Lista de usuarios
        </Typography>

        <TableCustom
          columns={fields}
          rows={users}
          loading={loading}
          handleClick={(as) => console.log()}
          handleDobleClick={(as) => console.log()}
          handleEditCell={(as) => console.log()}
          toolbar
        />
      </Box>
      <br />
      <Typography
        width={"100%"}
        textAlign={"center"}
        variant="h5"
        gutterBottom
        component="div"
      >
        Respaldo de base de datos
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div>Generar respaldo</div>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => await generateBackup()}
          >
            Respaldar base de datos
          </Button>
          <br />
          <div>Lista de respaldos</div>
          <BackupList />
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
