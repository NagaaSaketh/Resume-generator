import { ComponentType, SVGProps } from "react";
import {
  Bars,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  File,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="flex items-center m-3">
      <Drawer>
        <Button variant="primary">
          <Bars />
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Body>
                <nav className="flex flex-col gap-1 mt-3">
                  <Link to="/" className="flex items-center gap-2 m-3">
                    <House style={{ width: 18, height: 18 }} />{" "}
                    <span>Home</span>
                  </Link>
                  
                  <Link to="/resumes" className="flex items-center gap-2 m-3">
                    <File style={{ width: 18, height: 18 }} />{" "}
                    <span>My Resumes</span>
                  </Link>
                </nav>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div>
  );
};

export default Menu;
