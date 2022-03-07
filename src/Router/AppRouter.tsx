import { Routes, Route, HashRouter } from "react-router-dom";
import { Loading } from "../views/Loading";
import { Setup } from "../views/setup/Setup";
import { CreateUser } from "../views/setup/CreateClient";
import Auth from "../views/auth/Auth";
import Dashboard from "../views/home/Dashboard";

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/home" element={<Dashboard element="home" />} />
        <Route path="/anos" element={<Dashboard element="anos" />} />
        <Route path="/perfil" element={<Dashboard element="perfil" />} />
        <Route path="/admin" element={<Dashboard element="admin" />} />
        <Route path="/logout" element={<Auth />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
