import { Modal } from "antd";
import { Login } from "./login/Login";
import { useDispatch, useSelector } from "react-redux";
import { setModalLogin } from "../../../store/slices/modal/modalSlice";
import { setLoginErr } from "../../../store/slices/auth/userSlice";


export const ModalLogin = ({}) => {
  const dispatch = useDispatch();
  const {modalLogin} = useSelector(state => state.modalReducer);

  const handleOk = ()=>{
    
    dispatch(setModalLogin(false));
  };

  const handleCancel =()=>{
    dispatch(setModalLogin(false));
    dispatch(setLoginErr(null));
  };

  return (
    <Modal
        open={modalLogin}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{style:{display:'none'}}}
        okButtonProps={{style:{display:'none'}}}
      >
        <Login />
      </Modal>
  )
}
