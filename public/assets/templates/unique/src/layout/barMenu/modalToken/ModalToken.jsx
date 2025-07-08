import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { setModalToken } from "../../../store/slices/modal/modalSlice";
import { InputNum } from "../../../components/input/InputNum";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../db/firebase";


export const ModalToken = ({}) => {
  const dispatch = useDispatch();
  const [numToken, setNumToken] = useState(0);
  const {modalToken} = useSelector(state => state.modalReducer);
  
  const handleOk = ()=>{
    
    dispatch(setModalToken(false));
  };

  const handleCancel =()=>{
    dispatch(setModalToken(false));
  };

  const handleNumToken =(val)=>{
    setNumToken(val);
  };

  return (
    <Modal
        title='Comprar Tokens'
        open={modalToken}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{style:{display:'none'}}}
        // okButtonProps={{style:{display:'none'}}}
        okText='Comprar'
      >
       <InputNum 
          label={`Elige la cantidad`}
          name={'comprarTokens'}
          onChange={val => handleNumToken(val)}
        />
        <p>Tokens totales: {numToken * 10 }</p>
      </Modal>
  )
}
