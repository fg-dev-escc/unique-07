import { useEffect, useState } from 'react';
import { formValidationsDatosVendedor } from '../../../../utils/formValidations';

const camposIniciales ={
  nombreCompleto:'',
  email:'',
  telefono:''
};

export const useForm = () => {
  const [form, setForm] = useState(camposIniciales);
  const [formValidation, setFormValidation] = useState();

  useEffect(() => {
    createValidators();
  }, [form]);

  const onChangeInput =({name, value})=>{
    setForm({...form, [name]:value});
  };

  const onChangeFotos = (fileList)=>{
    
    setForm({...form, fileList});
  };

  const onChangeNum = (num)=>{
    setForm({...form, ['telefono']:num});
  };

  const handleSubmit =()=>{
    console.log(form);
  };

  const handleFotos =()=>{
    console.log(form.fileList);
  };

  const handleReset =()=>{
    setForm(camposIniciales);
  };

  
  const createValidators = () => {
    const formCheckedValues = {};
    for (const formField of Object.keys(formValidationsDatosVendedor)) {
      const [fn, errorMessage] = formValidationsDatosVendedor[formField];
      formCheckedValues[`${formField}Valid`] = fn(form[formField]) ? null : errorMessage;
    };
    setFormValidation(formCheckedValues);
  };
  const isFormValid = () => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    };
    return true;
  };


  return {
    form,
    formValidation,
    isFormValid,
    onChangeFotos,
    onChangeInput,
    onChangeNum,
    handleFotos,
    handleSubmit,
    handleReset,
  };
};
