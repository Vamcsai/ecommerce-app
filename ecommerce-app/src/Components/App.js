import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import AuthContextProvider from "./Contexts/AuthContextProvider";
import Home from "./Home";
import ManageBooks from "./ManageBooks";
import Books from "./Books";

export default function App() {
  const AppRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Books />} />
          <Route path="managebooks" element={<ManageBooks />} />
        </Route>
        <Route exact path="/login" element={<Login />} />
      </Routes>
    );
  };
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
}
