import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import React from "react";
import DialogTitle from "@mui/material/DialogTitle";

export const CustomModal = ({
  openDialog,
  handleCloseDialog,
  tittle,
  handledConfirm,
  children,
  color,
  btnText,
}) => {
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{ textAlign: "center", color: color, fontWeight: "bold" }}
      >
        {tittle}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancelar</Button>
        <Button sx={{ color: color }} onClick={handledConfirm} autoFocus>
          {btnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
