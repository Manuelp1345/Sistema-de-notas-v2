import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { TableCustom } from "../table/TableCustom";
import BackupList from "./backupListComponenet";
import { Button, FormControl, MenuItem, Select, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import { GlobalContext } from "../../config/context/GlobalContext";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { CustomModal } from "../modals/customModal";
import DialogContentText from "@mui/material/DialogContentText";

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
  const [user, setUser] = React.useState<any>(0);
  const [counter, setCounter] = React.useState<number>(0);
  const { user: userContext } = React.useContext<any>(GlobalContext);
  const [idUserDelete, setIdUserDelete] = React.useState({
    id: 0,
  });
  const [openDeleteUser, setOpenUser] = React.useState(false);
  const handleClickOpenDeleteUser = () => setOpenUser(true);
  const handleCloseDeleteUser = () => setOpenUser(false);

  const generateBackup = async () => {
    //@ts-ignore
    const backup = await window.API.generateBackup();
    console.log(backup);
  };

  const fetchUsers = async () => {
    //@ts-ignore
    const response = await window.API.getUsers();

    const mapUsers = response.map((user: any) => {
      delete user.datosBasicos.id;
      user = {
        ...user.datosBasicos,
        ...user,
      };
      return user;
    });

    //filter user not OWNER
    const filterUsers = mapUsers.filter((user: any) => {
      return user.role !== "OWNER";
    });

    setUsers(filterUsers);
  };

  const handledDeleteAnio = async () => {
    handleCloseDeleteUser();
    let deleteUser;
    try {
      //@ts-ignore
      deleteUser = await window.API.deleteUser(idUserDelete);
    } catch (error) {
      Swal.fire({
        title: `Error al borrar el usuario`,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    console.log("delete response", deleteUser);
    if (deleteUser === "error") {
      return Swal.fire({
        title: `NO puedes borrar el usuario `,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    await fetchUsers();

    Swal.fire({
      title: `Usuario Borrado`,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
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
      renderEditCell: () => {
        return (
          <FormControl
            sx={{
              width: "100%",
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dataEdit}
              placeholder="Rol"
              label="Rol"
              onChange={(e) => {
                console.log("e.target.value ", e.target.value);
                setDataEdit(e.target.value);
              }}
            >
              <MenuItem disabled value={"select"}>
                Rol
              </MenuItem>
              <MenuItem value={"USER"}>Usuario</MenuItem>
              <MenuItem value={"ADMIN"}>Administrador</MenuItem>
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
                {params.formattedValue === "USER" && "Usuario"}
                {params.formattedValue === "ADMIN" && " Administrador"}
                &nbsp;&nbsp;&nbsp;&nbsp;
              </Box>
            </Tooltip>
          </Box>
        );
      },
    },
    userContext.user.role !== "ADMIN" && {
      field: "estado",
      headerName: "Opciones",
      width: 150,
      headerClassName: "backGround",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Button
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
            onClick={() => {
              handleClickOpenDeleteUser();
              setIdUserDelete(params.row);
            }}
          >
            <Tooltip title="Borrar" arrow placement="right">
              <RemoveCircleIcon sx={{ color: "red" }} />
            </Tooltip>
          </Button>
        );
      },
    },
  ];

  const editUser = async () => {
    console.log("dataEdit ", dataEdit);
    console.log("user ", user);
    //@ts-ignore
    const response = await window.API.updateUser({
      id: user,
      role: dataEdit,
    });
    console.log("response ", response);
    if (response) {
      Swal.fire({
        title: "Usuario Actualizado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      await fetchUsers();
    } else {
      Swal.fire({
        title: "Error al actualizar el usuario",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
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
          handleClick={(as) => {
            setDataEdit(as.row.role);
            setUser(as.row.id);
          }}
          handleDobleClick={(as) => {
            console.log(as, "EDIT");
          }}
          toolbar={false}
          handleEditCell={async () => await editUser()}
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
            onClick={async () => {
              await generateBackup();
              setCounter(counter + 1);
            }}
          >
            Respaldar base de datos
          </Button>
          <br />
          <div>Lista de respaldos</div>
          <BackupList refresh={counter} />
        </Box>
      </Box>
      <CustomModal
        btnText="Eliminar"
        color="red"
        tittle={"Alerta"}
        openDialog={openDeleteUser}
        handleCloseDialog={handleCloseDeleteUser}
        handledConfirm={handledDeleteAnio}
      >
        <DialogContentText>
          Confirma que desea eliminar el usuario seleccionado
        </DialogContentText>
      </CustomModal>
    </Box>
  );
};

export default Admin;
