// ✅ Paso a paso para detectar clics fuera del componente:
// 1. Envuelve el Resultados con un ref.
// 2. Usa un useEffect para escuchar clics globales.
// 3. Si el clic ocurre fuera del ref, se oculta Resultados.

import { useEffect, useState, useRef } from "react";
import { Col, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { startGetResultadoBusqueda } from "../../store/slices/busqueda/thunks";
import { useNavigate } from "react-router";
import { Resultados } from "./Resultados";

export const Busqueda = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resultado } = useSelector((state) => state.busquedaReducer);

  const [texto, setTexto] = useState(null);
  const [options, setOptions] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const resultadosRef = useRef(null);

  useEffect(() => {
    if (texto === null || texto.trim() === "" || texto.length < 3) return;
    dispatch(startGetResultadoBusqueda(texto, 1, 10));
    setMostrarResultados(true);
  }, [texto]);

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

  useEffect(() => {
    const arr = resultado.map((res) => ({
      torreID: res.torreID,
      nombre: res.articulo.nombre,
      img: res.articulo.urlImgPrincipal,
    }));
    setOptions(arr);
  }, [resultado]);

  const onChangeTexto = (e) => {
    const { value } = e.target;
    setTexto(value);
  };

  const handleClick = (opt) => {
    navigate(`/detalles/${opt.torreID}`);
    setMostrarResultados(false);
  };

  return (
    <Col>
      <Input
        size="small"
        placeholder="Buscar"
        onChange={onChangeTexto}
        style={{ maxWidth: 200 }}
        onFocus={() => {
          if (options.length > 0) setMostrarResultados(true);
        }}
      />
      {mostrarResultados && options.length > 0 && (
        <div ref={resultadosRef}>
          <Resultados options={options} onClick={handleClick} />
        </div>
      )}
    </Col>
  );
};
