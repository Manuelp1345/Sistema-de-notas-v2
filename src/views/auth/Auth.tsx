/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  ElementType,
  FocusEventHandler,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  Ref,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import {
  ButtonBaseActions,
  ButtonBaseClasses,
  SxProps,
  Tab,
  TabClasses,
  Tabs,
  Theme,
} from "@mui/material";
import styled from "@emotion/styled";
import Register from "./Register";
import Login from "./Login";
import {
  TouchRippleProps,
  TouchRippleActions,
} from "@mui/material/ButtonBase/TouchRipple";
import { CommonProps } from "@mui/material/OverridableComponent";

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid gray",
  "& .MuiTabs-indicator": {
    backgroundColor: "white",
  },
});
const AntTab = styled(
  (
    props: JSX.IntrinsicAttributes & { href: string } & {
      children?: null;
      classes?: Partial<TabClasses>;
      disabled?: boolean;
      disableFocusRipple?: boolean;
      icon?: string | ReactElement<any, string | JSXElementConstructor<any>>;
      iconPosition?: "bottom" | "top" | "end" | "start";
      label?: ReactNode;
      sx?: SxProps<Theme>;
      value?: any;
      wrapped?: boolean;
    } & Omit<
        {
          action?: Ref<ButtonBaseActions>;
          centerRipple?: boolean;
          children?: ReactNode;
          classes?: Partial<ButtonBaseClasses>;
          disabled?: boolean;
          disableRipple?: boolean;
          disableTouchRipple?: boolean;
          focusRipple?: boolean;
          focusVisibleClassName?: string;
          LinkComponent?: ElementType<any>;
          onFocusVisible?: FocusEventHandler<any>;
          sx?: SxProps<Theme>;
          tabIndex?: number;
          TouchRippleProps?: Partial<TouchRippleProps>;
          touchRippleRef?: Ref<TouchRippleActions>;
        },
        "classes"
      > &
      CommonProps &
      Omit<
        Pick<
          DetailedHTMLProps<
            AnchorHTMLAttributes<HTMLAnchorElement>,
            HTMLAnchorElement
          >,
          "key" | keyof AnchorHTMLAttributes<HTMLAnchorElement>
        > & { ref?: Ref<HTMLAnchorElement> },
        | "label"
        | keyof CommonProps
        | "tabIndex"
        | "children"
        | "action"
        | "centerRipple"
        | "disabled"
        | "disableRipple"
        | "disableTouchRipple"
        | "focusRipple"
        | "focusVisibleClassName"
        | "LinkComponent"
        | "onFocusVisible"
        | "sx"
        | "TouchRippleProps"
        | "touchRippleRef"
        | "value"
        | "icon"
        | "disableFocusRipple"
        | "iconPosition"
        | "wrapped"
      >
  ) => <Tab disableRipple {...props} />
)(({ theme }) => ({
  color: "white",
  "&.Mui-selected": {
    color: "white",
  },
}));

function TabPanel(props: {
  [x: string]: any;
  children: any;
  value: any;
  index: any;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ display: "flex", flexDirection: "column" }}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            width: "100%",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Auth = () => {
  const [value, setValue] = useState(0);

  const setBgImg = () => {
    //@ts-ignore
    window.API.imgLogin();
  };

  useEffect(setBgImg, []);

  const handleChange = (_event: any, newValue: SetStateAction<number>) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0,155,221,0.95)",
          color: "info.contrastText",
          height: "76%",
          width: "60%",
          boxShadow: "-5px 10px 20px rgba(0, 0, 0, 0.8)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "-10rem",
          }}
        >
          <Box sx={{ height: "5rem", padding: "1rem" }}>
            <Box sx={{ height: "8rem" }} component="img" src="/img/logo.png" />
          </Box>
          <Box>
            <Typography
              sx={{ textAlign: "center", marginTop: "1rem" }}
              variant="h3"
            >
              Bienvenido
            </Typography>
            <Typography sx={{ textAlign: "center" }} variant="h5">
              ¿Desea ingresar al sistema?
            </Typography>
          </Box>
        </Box>

        <AntTabs value={value} onChange={handleChange}>
          <AntTab href="" value={0} label="Ingresar"></AntTab>

          <AntTab href="" value={1} label="Registrarse" />
        </AntTabs>
        <TabPanel value={value} index={0}>
          <Login />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Register />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Auth;
