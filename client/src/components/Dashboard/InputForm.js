import React, { useState, useEffect } from "react";
import Button from "../Button";
import { useProductContext } from "../../context/ProductContext";
import { useAdminContext } from "../../context/AdminContext";

export const InputForm = () => {
  const [category, setCategory] = useState();
  const [product, setProduct] = useState({});
  const { addProduct } = useProductContext();
  const { categories, properties, fetchCategories, fetchProperties } =
    useAdminContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataArray = new FormData();
    const keyArr = Object.keys(product);
    for (let i = 0; i < keyArr.length; ++i) {
      dataArray.append(keyArr[i].toString(), product[keyArr[i].toString()]);
    }
    for (var pair of dataArray.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    addProduct(dataArray, category);
  };

  const fetchForm = async () => {
    try {
      await fetchCategories();
      await fetchProperties();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchForm();
  }, []);

  const buildInput = (property, type) => {
    let inputType;
    if (type === "String" || type === "Number") {
      inputType = "text";
    } else if (type === "Buffer") {
      inputType = "file";
    }
    if (property === "description") {
      return (
        <textarea
          name={property}
          onChange={(e) => {
            setProduct({ ...product, [e.target.name]: e.target.value });
          }}
        />
      );
    } else if (property === "profile") {
      return (
        <input
          type={inputType}
          name={property}
          onChange={(e) => {
            setProduct({ ...product, [e.target.name]: e.target.files[0] });
          }}
        />
      );
    }
    return (
      <input
        type={inputType}
        name={property}
        onChange={(e) =>
          setProduct({ ...product, [e.target.name]: e.target.value })
        }
      />
    );
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        id="form"
      >
        {/* Category */}
        <div>
          <label>Category: </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setProduct({});
              document.getElementById("form").reset();
            }}
          >
            <option value="" disabled selected>
              Select Category
            </option>
            {categories.map((category) => {
              return <option value={category}>{category}</option>;
            })}
          </select>
        </div>

        {properties.map((item) => {
          const { property, type } = item;
          return (
            <div>
              <label htmlFor={property}>
                {property.charAt(0).toUpperCase() + property.slice(1)}:
              </label>
              {buildInput(property, type)}
            </div>
          );
        })}

        {/* Phone */}
        {category === "phones" && (
          <div>
            <div>
              <label htmlFor="color">Color: </label>
              <input
                type="text"
                name="color"
                onChange={(e) =>
                  setProduct({ ...product, color: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="ram">RAM: </label>
              <input
                type="text"
                name="ram"
                onChange={(e) =>
                  setProduct({ ...product, ram: parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <label htmlFor="storage">Storage: </label>
              <input
                type="text"
                name="storage"
                onChange={(e) =>
                  setProduct({ ...product, storage: parseInt(e.target.value) })
                }
              />
            </div>
          </div>
        )}
        {/* Laptop */}
        {category === "laptops" && (
          <div>
            <div>
              <label htmlFor="cpu">CPU: </label>
              <input
                type="text"
                name="cpu"
                onChange={(e) =>
                  setProduct({ ...product, cpu: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="ram">RAM: </label>
              <input
                type="text"
                name="ram"
                onChange={(e) =>
                  setProduct({ ...product, ram: parseInt(e.target.value) })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="hdd">HDD: </label>
              <input
                type="text"
                name="hdd"
                onChange={(e) =>
                  setProduct({ ...product, hdd: parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <label htmlFor="ssd">SSD: </label>
              <input
                type="text"
                name="ssd"
                onChange={(e) =>
                  setProduct({ ...product, ssd: parseInt(e.target.value) })
                }
              />
            </div>
          </div>
        )}
        {/* Headphone */}
        {category === "headphones" && (
          <div>
            {/* ANC */}
            <div>
              <label htmlFor="anc">Active noise cancelled: </label>
              <div name="anc">
                <label>
                  <input
                    type="radio"
                    value="true"
                    name="anc"
                    onChange={(e) => setProduct({ ...product, anc: true })}
                  />
                  true
                </label>
                <label>
                  <input
                    type="radio"
                    value="false"
                    name="anc"
                    onChange={(e) => setProduct({ ...product, anc: false })}
                  />
                  false
                </label>
              </div>
            </div>

            {/* WIRED */}
            <div>
              <label htmlFor="wired">Wired: </label>
              <div name="wired">
                <label>
                  <input
                    type="radio"
                    value="true"
                    name="wired"
                    onChange={(e) => setProduct({ ...product, wired: true })}
                  />
                  true
                </label>
                <label>
                  <input
                    type="radio"
                    value="false"
                    name="wired"
                    onChange={(e) => setProduct({ ...product, wired: false })}
                  />
                  false
                </label>
              </div>
            </div>
          </div>
        )}
        <Button type="submit">hi</Button>
      </form>
    </div>
  );
};

export default InputForm;
