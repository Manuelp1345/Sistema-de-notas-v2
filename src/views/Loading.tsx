import { useCallback, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

export const Loading = () => {
  const navigate = useNavigate();

  const getCredentials = useCallback(async () => {
    //@ts-ignore

    const credentials = await window.API.getCredentialsDB();
    console.log(credentials);

    if (!credentials) {
      navigate("/create-user");
    } else {
      navigate("/auth");
    }
  }, [navigate]);

  useEffect(() => {
    getCredentials();
  }, [getCredentials]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
