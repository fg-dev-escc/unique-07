import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Divider } from "antd";
import { startGetCars, startGetGridCars } from "../../store/slices/slideshow/thunks";
import { startGetSubastaTorres } from "../../store/slices/subastaSlice/thunks";
import { Slideshow } from "./slideshow/Slideshow";
import { Contenido } from "./contenido/Contenido";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetCars());
    dispatch(startGetGridCars());
    dispatch(startGetSubastaTorres('1-250616'))
  }, []);
  
  return (
    <div>
      <Slideshow />
      <Divider className="divider"/>
      <Contenido />
    </div>
  );
};
