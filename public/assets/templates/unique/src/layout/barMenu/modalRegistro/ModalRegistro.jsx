import { Modal } from "antd";
import { Registro } from "./registro/Registro";
import { useDispatch, useSelector } from "react-redux";
import { setModalRegistro } from "../../../store/slices/modal/modalSlice";
import { setRegistroNull } from "../../../store/slices/registro/registroSlice";

export const ModalRegistro = ({}) => {
  const dispatch = useDispatch();
  const {modalRegistro} = useSelector(state => state.modalReducer);

  const handleOk = ()=>{
    
    dispatch(setModalRegistro(false));
  };

  const handleCancel =()=>{
    dispatch(setModalRegistro(false));
    dispatch(setRegistroNull());
  };

  return (
    <Modal
        open={modalRegistro}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{style:{display:'none'}}}
        okButtonProps={{style:{display:'none'}}}
      >
        <Registro />
      </Modal>
  )
}
