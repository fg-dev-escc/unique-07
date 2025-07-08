import { useState, useEffect } from "react";
import { Menu2 } from "./_Menu2";
import imgLetra from "../../assets/LogoLetra.png";

export const BarMenu = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const menu = document.getElementById("menu");
      if (menu) {
        const offsetTop = menu.offsetTop;
        setIsSticky(window.pageYOffset > offsetTop);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav id="menu" className={`menu ${isSticky ? "fixed" : ""}`}>
        {isSticky && <img className="logoSmall" src={imgLetra} alt="logo" />}

        <Menu2 isSticky={isSticky}/>
      </nav>
    </>
  );
}
