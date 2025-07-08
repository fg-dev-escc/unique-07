import { useEffect, useRef, useState } from "react";
import { Col, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { startGetResultadoBusqueda } from "../../store/slices/busqueda/thunks";
import { useNavigate, useParams } from "react-router";
import { Resultados } from "./Resultados";

export const Busqueda = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resultado } = useSelector((state) => state.busquedaReducer);
  const resultadosRef = useRef(null);
    const [mostrarResultados, setMostrarResultados] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resultadosRef.current &&
        !resultadosRef.current.contains(event.target)
      ) {
        setMostrarResultados(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getPanelValue = () => {
    const arr = resultado.map((res) => {
      return {
        torreID: res.torreID,
        nombre: res.articulo.nombre,
        img: res.articulo.urlImgPrincipal,
      };
    });
    setOptions(arr);
  };

  const onChangeTexto = (e) => {
    const { value } = e.target;
    if (value.trim() === "" || value.length < 2) {
      return;
    }
    dispatch(startGetResultadoBusqueda(value, 1, 10));
    getPanelValue();
    setMostrarResultados(true);
  };

  const handleClick = (opt) => {
    setOptions([]);
    navigate(`/detalles/${opt.torreID}`);
  };

  return (
    <Col>
      <Input
        size="small"
        placeholder="Buscar"
        onChange={onChangeTexto}
        onMouseEnter={onChangeTexto}
        style={{ maxWidth: 200 }}
      />
      {mostrarResultados && options.length > 0 && (
        <div ref={resultadosRef}>
          <Resultados options={options} onClick={handleClick} />
        </div>
      )}
    </Col>
  );
};
