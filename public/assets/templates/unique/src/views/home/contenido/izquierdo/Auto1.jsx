import { Item } from "./_Item";
import img from "../../../../assets/carrosGrid/6.webp";

export const Auto1 = ({auto}) => {

  return (
      <Item
        titulo={auto?.nombre || "Auto en subasta"}
        img={auto.urlImgPrincipal}
        descripcion={auto?.descripcion || "Descripción del auto en subasta"}
        torreId={auto?.torreID}
        fecha={auto.fechaFin}
      />
  );
};
