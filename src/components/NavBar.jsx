import { useSelector, useDispatch } from "react-redux";
import { ArrowRightFromSquare } from "@gravity-ui/icons";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { Button } from "@heroui/react";
import Menu from "./Menu";
const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });

      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu />
          <h2 className="text-xl font-bold text-gray-800">Resume Generator</h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-md">
            Welcome, <span className="font-semibold">{user?.lastName}</span>
          </span>

          <Button
            className="hover:bg-red-100 hover:text-red-500"
            isIconOnly
            variant="secondary"
            onClick={handleLogout}
          >
            <ArrowRightFromSquare style={{ width: "18px" }} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
