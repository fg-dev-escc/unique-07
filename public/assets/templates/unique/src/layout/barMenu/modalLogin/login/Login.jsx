
import logo from "../../../../assets/Logo.jpg";
import { Alert, Button, Input } from "antd";

import { useLogin } from "./useLogin";

export const Login = () => {
 
  const {data, loginErr, loadingLogin, changeData, formSubmit,isDiabled} = useLogin()

  ////
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
            placeholder="user@aa.com"
          />
        </div>
        <div className="Login_input">
          <Input.Password
            onChange={changeData}
            name="password"
            value={data.password}
            placeholder="password"
          />
        </div>
        <div className="Login_submit">
          <Button
            loading={loadingLogin}
            disabled={isDiabled()}
            onClick={formSubmit}
            type="primary"
          >
            Login
          </Button>
        </div>
        <div className="Login_input" style={{ height: 45 }}>
          {loginErr && <Alert type="error" message={loginErr} />}
        </div>
      </div>
    </div>
  );
};
