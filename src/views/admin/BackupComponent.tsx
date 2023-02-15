import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

export default function GenerateBackup() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>Generar respaldo</div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Respaldar base de datos
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">¡Advertencia!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            La restauración de un respaldo reemplazará todos los datos actuales
            en la base de datos con los datos del respaldo. Asegúrese de que
            desea continuar y que tiene una copia de seguridad actualizada de
            sus datos antes de continuar. ¿Desea continuar con la restauración
            de respaldo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Sí
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
