import React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

function CustomToolbar() {
  return (
    <GridToolbarContainer
      sx={{
        gap: "2rem",
        justifyContent: "space-between",
        color: "white",
        marginBottom: "1rem",
        /*         background: "#1976d2", */
      }}
    >
      <Box sx={{ gap: "1rem", display: "flex" }}>
        <GridToolbarColumnsButton sx={{ color: "black" }} />
        <GridToolbarFilterButton sx={{ color: "black" }} />
      </Box>
      <GridToolbarExport sx={{ color: "black" }} />
    </GridToolbarContainer>
  );
}
export const TableCustom = ({ rows, columns, loading, handleClick }) => {
  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        "& .backGround": {
          background: "#1976d2",
          color: "white",
          textAlign: "center",
          width: "100%",
        },
      }}
    >
      <DataGrid
        loading={loading}
        localeText={{
          toolbarExport: "Exportar",
          toolbarExportCSV: "Descargar CSV",
          toolbarExportPrint: "Imprimir",
          toolbarFilters: "Filtrar",
          filterPanelColumns: "Columna",
          filterPanelOperators: "Filtro",
          filterOperatorContains: "Contiene",
          filterOperatorEquals: "Igual A",
          filterOperatorStartsWith: "Inicia Con",
          filterOperatorEndsWith: "Termina Con",
          filterOperatorIsEmpty: "Es Vacio",
          filterOperatorIsNotEmpty: "No esta vacio",
          filterOperatorIsAnyOf: "Cualquiera de",
          filterPanelInputPlaceholder: "valor",
          filterPanelInputLabel: "Valor",
          toolbarColumns: "Columnas",
          columnsPanelTextFieldLabel: "Buscar Columna",
          columnsPanelTextFieldPlaceholder: "",
          columnsPanelHideAllButton: "Ocultar todas",
          columnsPanelShowAllButton: "Mostrar todas",
        }}
        rows={rows}
        columns={columns}
        onRowClick={handleClick}
        pageSize={10}
        autoHeight
        rowsPerPageOptions={[5]}
        components={{ Toolbar: CustomToolbar }}
      />
    </Box>
  );
};
