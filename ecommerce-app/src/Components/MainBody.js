import { Outlet } from "react-router-dom";
import "./MainBody.scss";
export default function MainBody() {
  return (
    <div className="main-body-container">
      <Outlet />
    </div>
  );
}
