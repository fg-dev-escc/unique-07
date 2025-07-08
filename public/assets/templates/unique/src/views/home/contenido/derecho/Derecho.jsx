import { Baner } from "./_Baner";
import { FotoGrid } from "./_FotoGrid";
import { useWindowSize } from "../../../../hooks/useWindowSize";

export const Derecho = () => {
  const {large} = useWindowSize();
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center' }}>
      {large && <Baner />}
      
      <FotoGrid />
    </div>
  );
};
