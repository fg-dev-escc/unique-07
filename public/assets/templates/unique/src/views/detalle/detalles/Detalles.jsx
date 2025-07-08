import { Preguntas } from "./_Preguntas";
import { Descripcion } from "./_Descripcion";
import { Video } from "./_Video";
import { Documentos } from "./_Documentos";
import { Comentarios } from "./_Comentarios";

export const Detalles = ({valores, descripcion}) => {
  
  return (
    <div>
      <Preguntas valores={valores} />
      <Descripcion descripcion={descripcion} />
      {/* <Video /> */}
      {/* <Documentos /> */}
      <Comentarios />
    </div>
  );
};
