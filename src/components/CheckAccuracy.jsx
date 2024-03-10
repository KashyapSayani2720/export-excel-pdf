import React, { useState, useRef } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import InputComponent from "../common/InputComponent";
import ButtonComponent from "../common/ButtonComponent";
import { Toast } from "primereact/toast";

const data = {
  pincode: "",
  city: "",
  addressLineOne: "",
  addressLineTwo: "",
};

const CheckAccuracy = () => {
  const [accuracy, setAccuracy] = useState("");
  const [names, setNames] = useState([]);
  const [closestAddress, setClosestAddress] = useState({});
  const toast = useRef(null);
  const validationSchema = yup.object().shape({
    pincode: yup.string().required("Pincode is required"),
    city: yup.string().required("City is required"),
    addressLineOne: yup.string().required("Address One is required"),
    addressLineTwo: yup.string().required("Address Two is required"),
  });

  const onHandleSubmit = (obj) => {
    const baseUrl = "https://express-api-ten-gilt.vercel.app";
    axios
      .post(`${baseUrl}/api/v1/address/calculate_accuracy`, obj, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response?.data) {
          setAccuracy(response?.data?.accuracy);
          setNames(response?.data?.names || []);
          setClosestAddress(response?.data?.address || {});
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Accuracy percentage found successfully.",
            life: 3000,
          });
          // resetForm();
        }
      })
      .catch((error) => {
        console.log("error", error);
        let err = error?.response?.data?.error;
        setAccuracy(null);
        setNames([]);
        setClosestAddress({});
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: err,
          life: 3000,
        });
      });
  };

  const formik = useFormik({
    initialValues: data,
    onSubmit: onHandleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
  });

  const { values, errors, handleSubmit, handleChange, touched } = formik;

  const rangeHandler = (lowerRange, upperRange) => {
    let acc = parseInt(accuracy);
    if (acc > lowerRange && acc <= upperRange) {
      return true;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="accuracy-component">
            <h4>Find Address Accuracy</h4>
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
                placeholder="Enter Address One"
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
                placeholder="Enter Address Two"
                name="addressLineTwo"
                error={errors?.addressLineTwo}
                touched={touched?.addressLineTwo}
                className="text-[12px] rounded  px-[1rem] py-[8px] focus:outline-none w-full border-[1px] border-[#ddd]"
              />
            </div>
            <ButtonComponent
              onClick={() => handleSubmit()}
              type="submit"
              label="Submit"
              className="px-6 py-2 w-full rounded bg-[#1f1f70] text-white"
            />

            <div className="main">
              <div className="label">
                <div>Low Risk(100)</div>
                <div>High Risk(0)</div>
              </div>

              <div className="container">
                <div
                  className={`range ${rangeHandler(80, 100) ? "active" : ""}`}
                >
                  <div className="text">{accuracy}</div>
                  <div
                    className="box"
                    style={{
                      background: "linear-gradient(to right, #33FFB2, green)",
                    }}
                  ></div>
                </div>
                <div
                  className={`range ${rangeHandler(60, 80) ? "active" : ""}`}
                >
                  <div className="text">{accuracy}</div>
                  <div
                    className="box"
                    style={{
                      background: "linear-gradient(to right, #33FF57, #33FFB2)",
                    }}
                  ></div>
                </div>
                <div
                  className={`range ${rangeHandler(40, 60) ? "active" : ""}`}
                >
                  <div className="text">{accuracy}</div>
                  <div
                    className="box"
                    style={{
                      background: "linear-gradient(to right, #FFE833, #00FF00)",
                    }}
                  ></div>
                </div>
                <div
                  className={`range ${rangeHandler(20, 40) ? "active" : ""}`}
                >
                  <div className="text">{accuracy}</div>
                  <div
                    className="box"
                    style={{
                      background: "linear-gradient(to right, #FF8333, #FFB233)",
                    }}
                  ></div>
                </div>
                <div className={`range ${rangeHandler(0, 20) ? "active" : ""}`}>
                  <div className="text">{accuracy}</div>
                  <div
                    className="box"
                    style={{
                      background: "linear-gradient(to right, red, #FF5733)",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
            <div className="row">
              <div className="col-6">
              {/* Display names and closest address */}
              {names.length > 0 && (
                <div>
                  <h4>Names:</h4>
                  <ul>
                    {names.map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="col-6">
              {Object.keys(closestAddress).length > 0 && (
                <div>
                  <h4>Closest Address:</h4>
                  <div>Name: {closestAddress.Name}</div>
                  <div>Description: {closestAddress.Description}</div>
                  <div>Branch Type: {closestAddress.BranchType}</div>
                  <div>Delivery Status: {closestAddress.DeliveryStatus}</div>
                  <div>Circle: {closestAddress.Circle}</div>
                  <div>District: {closestAddress.District}</div>
                  <div>Division: {closestAddress.Division}</div>
                  <div>Region: {closestAddress.Region}</div>
                  <div>Block: {closestAddress.Block}</div>
                  <div>State: {closestAddress.State}</div>
                  <div>Country: {closestAddress.Country}</div>
                  <div>Pincode: {closestAddress.Pincode}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckAccuracy;
