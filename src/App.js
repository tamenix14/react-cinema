import "./App.css";
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { history } from "./utils/history/history";
import SharedLayout from "./templates/SharedLayout/SharedLayout";
import "antd/dist/reset.css";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Details from "./pages/Details/Details";
import Checkout from "./pages/Checkout/Checkout";
import CheckoutLayout from "./templates/CheckoutLayout/CheckoutLayout";
import Error from "./pages/Error/Error";
import Loading from "./components/Loading/Loading";
import AdminLayout from "./templates/Admin/AdminLayout";
import Admin from "./pages/Admin/Admin";
import Films from "./components/Admin/Films/Films";
import Users from "./components/Admin/Users/Users";
import AddFilm from "./components/Admin/Films/AddFilm";
import AddUser from "./components/Admin/Users/AddUser";
import EditFilm from "./components/Admin/Films/EditFilm";
import EditUser from "./components/Admin/Users/EditUser";
import AddScheduleFilm from "./components/Admin/Films/AddCalendar";

function App() {
  return (
    <HistoryRouter history={history}>
      <Loading />
      <Routes>
        {/* Home Layout */}
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Details />} />
        </Route>
        {/* Checkout Layout */}
        <Route element={<CheckoutLayout />}>
          <Route path="/checkout/:id" element={<Checkout />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="/admin/films" element={<Films />} />
          <Route path="/admin/films/addfilm" element={<AddFilm />} />
          <Route path="/admin/films/editfilm/:id" element={<EditFilm />} />
          <Route path="/admin/films/addschedule/:id" element={<AddScheduleFilm />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/users/adduser" element={<AddUser />} />
          <Route path="/admin/users/edit" element={<EditUser />} />
        </Route>

        {/* Error page */}
        <Route path="*" element={<Error />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
