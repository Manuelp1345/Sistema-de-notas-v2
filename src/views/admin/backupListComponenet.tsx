import {
  Button,
  List,
  ListItem,
  ListItemText,
  Pagination,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { CustomModal } from "../modals/customModal";
import moment from "moment";

const BackupList = ({ refresh }) => {
  const [selectedBackup, setSelectedBackup] = useState(null);
  const [page, setPage] = useState(1);
  const [backups, setBackups] = useState([]);
  const [open, setOpen] = React.useState(false);

  const getBackups = async () => {
    //@ts-ignore
    const backups = await window.API.getBackup();
    //delete extension
    backups.forEach((backup, index) => {
      backups[index] = backup.replace(".json", "");
    });

    //sort backups by date using moment
    backups.sort((a, b) => {
      const dateA = moment(a, "DD-MM-YYYY");
      const dateB = moment(b, "DD-MM-YYYY");
      return dateB.diff(dateA);
    });

    setBackups(backups);
  };

  const restoreBackup = async (backup) => {
    //add extension
    backup = backup + ".json";
    //@ts-ignore
    const result = await window.API.restoreBackup(backup);
    console.log(result);
  };

  const itemsPerPage = 5;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleListItemClick = (event, backup) => {
    setSelectedBackup(backup);
  };

  const handleApplyBackup = () => {
    restoreBackup(selectedBackup);
    handleClose();
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    (async () => {
      await getBackups();
    })();
  }, [refresh]);

  return (
    <div>
      <List component="nav">
        {backups.slice(startIndex, endIndex).map((backup) => (
          <ListItem
            button
            selected={backup === selectedBackup}
            onClick={(event) => handleListItemClick(event, backup)}
            key={backup}
          >
            <ListItemText primary={backup} />
          </ListItem>
        ))}
      </List>
      <Button
        disabled={!selectedBackup}
        onClick={handleOpen}
        variant="contained"
        color="primary"
      >
        Aplicar respaldo: {selectedBackup}
      </Button>
      <div
        style={{
          marginTop: "1rem",
        }}
      >
        <Pagination
          count={Math.ceil(backups.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </div>
      <CustomModal
        openDialog={open}
        tittle="¡Advertencia!"
        btnText="si"
        handleCloseDialog={handleClose}
        handledConfirm={handleApplyBackup}
        color={"secondary"}
      >
        <div>
          <p id="transition-modal-description">
            La restauración de un respaldo reemplazará todos los datos actuales
            en la base de datos con los datos del respaldo. Asegúrese de que
            desea continuar y que tiene una copia de seguridad actualizada de
            sus datos antes de continuar.
          </p>
          <p>¿Desea continuar con la restauración de respaldo?</p>
        </div>
      </CustomModal>
    </div>
  );
};

export default BackupList;
