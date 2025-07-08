import { Alert, Button, Input } from "antd";
import logo from "../../../../assets/Logo.jpg";
import InputSelect from "../../../../components/input/InputSelect";
import { useRegistro } from "./useRegistro";
import { opcSelectRegistro } from "../../../../const/options";
import { useSelector } from "react-redux";

export const Registro = () => {
  const {registroRespuesta, registroError} = useSelector(state => state.registroReducer);
  const {data, changeData, formSubmit,isDiabled, changeSelect} = useRegistro();

  return (
    <div className="Login_loginPage">
      <div className="Login_loginCaja">
        <div className="Login_cajaLogo">
          <img className="Login_logo" src={logo} />
        </div>
        <div className="Login_input">
          <Input
            autoComplete="none"
            onChange={changeData}
            name="email"
            value={data.email}
            placeholder="Email"
          />
        </div>
        <div className="Login_input">
          <Input
            autoComplete="none"
            onChange={changeData}
            name="confirmaEmail"
            value={data.confirmaEmail}
            placeholder="Confirma Email"
          />
        </div>
         <div className="Login_input">
          <InputSelect
            onChange={(value)=>changeSelect({value, name:'comoSeEntero'})}
            name="comoSeEntero"
            value={data.comoSeEntero}
            options={opcSelectRegistro}
            placeholder="Como se entero de nosotros"
          />
        </div>
        <div className="Login_submit">
          <Button
            // loading={loadingLogin}
            disabled={isDiabled()}
            onClick={formSubmit}
            type="primary"
          >
            Registro
          </Button>
        </div>
        <div className="Login_input" style={{ height: 45 }}>
          {registroError && <Alert type="error" message={registroError} />}
          {registroRespuesta && <Alert type="success" message={registroRespuesta} />}
        </div>
      </div>
    </div>
  );
};
