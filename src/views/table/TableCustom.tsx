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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const TableCustom = ({
  rows,
  columns,
  loading,
  handleClick,
  handleDobleClick,
  toolbar,
}): JSX.Element => {
  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",
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
        onRowDoubleClick={handleDobleClick}
        pageSize={6}
        autoHeight
        rowsPerPageOptions={[6]}
        components={toolbar && { Toolbar: CustomToolbar }}
      />
    </Box>
  );
};
