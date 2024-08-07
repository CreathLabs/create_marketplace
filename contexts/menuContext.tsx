import React, { useState, createContext, useEffect } from "react";

type menuProps = {
  open: boolean;
  toggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuContext = createContext<menuProps>({
  open: false,
  toggleMenu: () => {
    // do nothing.
  },
});

const MenuContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, toggleMenu] = useState(false);

  useEffect(() => {
    const body = document?.getElementById("body");

    if (!body) {
      return;
    }

    if (open) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [open]);

  const handleResize = () => {
    if (window.screen.width >= 1023) {
      toggleMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <MenuContext.Provider
      value={{
        open,
        toggleMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;
