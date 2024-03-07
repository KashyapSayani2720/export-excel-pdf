import React, {useState, useRef} from 'react';
import axios from 'axios';
import { useFormik } from "formik";
import * as yup from "yup";
import InputComponent from  '../common/InputComponent';
import ButtonComponent from '../common/ButtonComponent';
import { Toast } from 'primereact/toast';


  const data = {
    pincode: "",
    city: "",
    addressLineOne: "",
    addressLineTwo: ""
  };

  
const CheckAccuracy = () => {
    const [accuracy, setAccuracy] = useState("");
    const toast = useRef(null);
    const validationSchema = yup.object().shape({
        pincode: yup
          .string()
          .required("Pincode is required"),
        city: yup
          .string()
          .required("City is required"),
        addressLineOne: yup
        .string()
        .required("Address 1 is required"),
        addressLineTwo: yup
        .string()
        .required("Address 2 is required")
      });
    
      const onHandleSubmit = (obj) => {
        const baseUrl = process.env.REACT_APP_BASE_URL;
        console.log("value", obj);
        axios.post(`${baseUrl}/v1/address/calculate_accuracy`,obj,{
            headers:{
                'Content-Type': 'application/json'
            }
          })
            .then(response => {
              if(response?.data){
                  setAccuracy( response?.data?.accuracy);
                  // resetForm();
              }
            })
            .catch(error => {
                console.log("error",error)
                let err = error?.response?.data?.error;
                toast.current.show({severity:'error', summary: 'Error', detail: err, life: 3000});
            })
      };
    
      const formik = useFormik({
        initialValues: data,
        onSubmit: onHandleSubmit,
        validationSchema: validationSchema,
        enableReinitialize: true,
        validateOnBlur: true,
      });
    
      const { values, errors, handleSubmit, handleChange, touched, resetForm } = formik;

      const rangeHandler=(lowerRange, upperRange)=>{
        let acc = parseInt(accuracy);
       if(acc > lowerRange && acc <= upperRange){
        return true
       }
      }

  return (
    <div className='accuracy-component'>
        <Toast ref={toast} />
      <div>
        <InputComponent
        value={values?.pincode}
        onChange={handleChange}
        type="text"
        placeholder="Enter Pincode"
        name="pincode"
        error={errors?.pincode}
        touched={touched?.pincode}
        className="text-[12px] rounded  px-[1rem] py-[8px] focus:outline-none w-full border-[1px] border-[#ddd]"
        />
      </div>
      <div>
        <InputComponent
        value={values?.city}
        onChange={handleChange}
        type="text"
        placeholder="Enter City"
        name="city"
        error={errors?.city}
        touched={touched?.city}
        className="text-[12px] rounded  px-[1rem] py-[8px] focus:outline-none w-full border-[1px] border-[#ddd]"
        />
      </div>
      <div>
        <InputComponent
        value={values?.addressLineOne}
        onChange={handleChange}
        type="text"
        placeholder="Enter Address 1"
        name="addressLineOne"
        error={errors?.addressLineOne}
        touched={touched?.addressLineOne}
        className="text-[12px] rounded  px-[1rem] py-[8px] focus:outline-none w-full border-[1px] border-[#ddd]"
        />
      </div>
      <div>
        <InputComponent
        value={values?.addressLineTwo}
        onChange={handleChange}
        type="addressLineTwo"
        placeholder="Enter Address 2"
        name="addressLineTwo"
        error={errors?.addressLineTwo}
        touched={touched?.addressLineTwo}
        className="text-[12px] rounded  px-[1rem] py-[8px] focus:outline-none w-full border-[1px] border-[#ddd]"
        />
      </div>
      <ButtonComponent
        onClick={() => handleSubmit()}
        type="submit"
        label="Check Accuracy"
        className="px-6 py-2 w-full rounded bg-[#1f1f70] text-white"
    />

    <div className="main">
        <div className="label">
            <div>High Risk(0)</div>
            <div>Low Risk(100)</div>
        </div>

        <div className="container">
            <div className={`range ${rangeHandler(0,20) ? "active" : ""}`}>
               <div className="text">{accuracy}</div>
                <div className="box" style={{background: "linear-gradient(to right, red, #FF5733)" }}></div>
            </div>
            <div className={`range ${rangeHandler(20,40) ? "active" : ""}`}>
               <div className="text">{accuracy}</div>
                <div className="box" style={{background: "linear-gradient(to right, #FF8333, #FFB233)" }}></div>
            </div>
            <div className={`range ${rangeHandler(40,60) ? "active" : ""}`}>
               <div className="text">{accuracy}</div>
                <div className="box" style={{background: "linear-gradient(to right, #FFE833, #00FF00)" }}></div>
            </div>
            <div className={`range ${rangeHandler(60,80) ? "active" : ""}`}>
               <div className="text">{accuracy}</div>
                <div className="box" style={{background: "linear-gradient(to right, #33FF57, #33FFB2)" }}></div>
            </div>
            <div className={`range ${rangeHandler(80,100) ? "active" : ""}`}>
                <div className="text">{accuracy}</div>
                <div className="box" style={{background: "linear-gradient(to right, #33FFB2, green)" }}></div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default CheckAccuracy
