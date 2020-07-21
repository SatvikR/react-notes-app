import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("home");

  return (
    <Menu pointing secondary color="blue" size="large">
      <Menu.Item
        as={Link}
        to="/"
        name="home"
        active={activeItem === "home"}
        onClick={() => setActiveItem("home")}
      />
      <Menu.Item
        as={Link}
        to="/notes"
        name="your notes"
        active={activeItem === "your notes"}
        onClick={() => setActiveItem("your notes")}
      />
      <Menu.Menu position="right">
        <Menu.Item
          as={Link}
          to="/login"
          name={localStorage.getItem("uid") ? "logout" : "login"}
          active={activeItem === "login"}
          onClick={() => setActiveItem("login")}
        />
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
