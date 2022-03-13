import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useProductContext } from "../../context/ProductContext";
import { useAdminContext } from "../../context/AdminContext";
import { brands } from "../../data/brands";

const Wrapper = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 0 auto;
  width: 50%;
  form {
    align-items: start;
    border: 1px ${(props) => props.theme.text} solid;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 1rem;
    padding: 2rem;
    width: 100%;
    table {
      width: 100%;
      td {
        white-space: nowrap;
      }
    }
    select {
      width: 100%;
      padding: 0.5rem;
      option {
        padding: 0.5rem;
      }
    }
    input {
      width: auto;
      padding: 0.5rem;
    }
    .full-width {
      width: 100%;
    }
  }
`;

export const InputForm = ({ action }) => {
  const { categories, fetchCategories, properties, fetchProperties } =
    useProductContext();
  const [type, setType] = useState();
  const [product, setProduct] = useState({});

  const handleSubmit = (e) => {
    // e.preventDefault();
    // const dataArray = new FormData();
    // const keyArr = Object.keys(product);
    // for (let i = 0; i < keyArr.length; ++i) {
    //   // FormData does not support file object, so images have to be appended one by one!!!!!!!!!!!!!!!!!!!!
    //   if (keyArr[i].toString() == "images") {
    //     for (let file in product[keyArr[i].toString()]) {
    //       dataArray.append("images", product[keyArr[i].toString()][file]);
    //     }
    //     continue;
    //   }
    //   dataArray.append(keyArr[i].toString(), product[keyArr[i].toString()]);
    // }
    // addProduct(dataArray, category);
  };

  const buildInput = (property, index, key) => {
    // if the property is an array and have sub property
    if (property.type === "Array" && property[key]) {
      let innerProperty = property[key];
      console.log(innerProperty);
      let type = "text";
      // if (property[key].type == "String") type = "text";
      // else if (property[key].type == "Number") type = "number";
      // inputs.push(<input type={type} placeholder={property[key]} />);
      return (
        <tr key={index} width="20%">
          <td>
            <label>{key}</label>
          </td>
          <td>
            {Object.keys(innerProperty).map((innerKey, index) => {
              if (innerProperty[innerKey].type == "String") type = "text";
              else if (innerProperty[innerKey].type == "Number")
                type = "number";
              return (
                <input type={type} placeholder={innerKey} key={index}></input>
              );
            })}
            <button>+</button>
          </td>
        </tr>
      );
    }

    let type = "text";
    if (property.type === "String") type = "text";
    else if (property.type === "Number") type = "number";
    else if (property.type === "Buffer") type = "file";

    return (
      <tr key={index} width="20%">
        <td>
          <label>{key}</label>
        </td>
        <td>
          <input type={type} placeholder={key} className="full-width" />
        </td>
      </tr>
    );
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProperties(type);
  }, [type]);

  return (
    <Wrapper>
      <h1>Add new {action}</h1>
      {action === "product" && (
        <form>
          <table>
            <tbody>
              <tr>
                <td width="20%">
                  <label htmlFor="">Category</label>
                </td>
                <td>
                  <select
                    onChange={(e) => setType(e.target.value)}
                    defaultValue={""}
                  >
                    <option disabled value="">
                      select a category
                    </option>
                    {categories.map((category, index) => {
                      return (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
              {Object.keys(properties).map((key, index) =>
                buildInput(properties[key], index, key)
              )}
            </tbody>
          </table>
        </form>
      )}
    </Wrapper>
  );
};

export default InputForm;
