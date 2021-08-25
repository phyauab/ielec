import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Button";
import { useProductContext } from "../../context/ProductContext";
import { useAdminContext } from "../../context/AdminContext";
import { brands } from "../../data/brands";

const Wrapper = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  width: 100%;
  padding: 5rem 2rem;
  overflow-y: scroll;
  form {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 60%;
    padding: 2rem;
    div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      div {
        display: flex;
        flex-direction: column;
        gap: 5px;
        label {
          font-weight: 600;
        }
        div {
          flex-direction: row;
        }
      }
      select,
      input,
      textarea {
        padding: 0.25rem;
      }
    }
  }
`;

export const InputForm = () => {
  const [category, setCategory] = useState();
  const [product, setProduct] = useState({});
  const { addProduct } = useAdminContext();
  const { categories, properties, fetchCategories, fetchProperties } =
    useProductContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataArray = new FormData();
    const keyArr = Object.keys(product);
    for (let i = 0; i < keyArr.length; ++i) {
      console.log(i);
      console.log(keyArr[i].toString());
      dataArray.append(keyArr[i].toString(), product[keyArr[i].toString()]);
    }

    // DEBUG
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
    switch (property) {
      case "brand":
        return (
          <select
            name={property}
            onChange={(e) => {
              if (e.target.value == "None" && product.brand) {
                const tempProduct = product;
                delete tempProduct.brand;
                return setProduct({ ...tempProduct });
              }
              setProduct({ ...product, [e.target.name]: e.target.value });
            }}
          >
            <option defaultValue>None</option>
            {brands.map((brand, index) => {
              return <option key={brand + index}>{brand}</option>;
            })}
          </select>
        );
      case "name":
      case "qty":
      case "rating":
      case "price":
        return (
          <input
            type="text"
            name={property}
            placeholder={"..."}
            onChange={(e) =>
              setProduct({ ...product, [e.target.name]: e.target.value })
            }
          />
        );
      case "description":
        return (
          <textarea
            name={property}
            rows={4}
            placeholder={"if any"}
            onChange={(e) => {
              setProduct({ ...product, [e.target.name]: e.target.value });
            }}
          />
        );
      case "profile":
        return (
          <input
            type="file"
            name={property}
            onChange={(e) => {
              setProduct({ ...product, [e.target.name]: e.target.files[0] });
            }}
          />
        );
      case "featured":
        return (
          <div>
            <label>
              <input
                type="radio"
                name={property}
                value={true}
                onChange={(e) => {
                  setProduct({ ...product, [e.target.name]: e.target.value });
                }}
              />{" "}
              Yes
            </label>{" "}
            <label>
              <input
                type="radio"
                name={property}
                value={false}
                onChange={(e) => {
                  setProduct({ ...product, [e.target.name]: e.target.value });
                }}
              />{" "}
              No
            </label>
          </div>
        );
    }
  };

  return (
    <Wrapper>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        id="form"
      >
        <h1>Product Detail</h1>
        {/* All products */}
        <div>
          {/* Category */}
          <div>
            <label>Category</label>
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
                  {property.charAt(0).toUpperCase() + property.slice(1)}
                </label>
                {buildInput(property, type)}
              </div>
            );
          })}
        </div>

        {/* Phone */}
        {category === "phones" && (
          <div>
            <div>
              <label htmlFor="color">Color</label>
              <input
                type="text"
                name="color"
                onChange={(e) =>
                  setProduct({ ...product, color: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="ram">RAM</label>
              <input
                type="text"
                name="ram"
                onChange={(e) =>
                  setProduct({ ...product, ram: parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <label htmlFor="storage">Storage</label>
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
              <label htmlFor="cpu">CPU</label>
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
              <label htmlFor="ram">RAM</label>
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
              <label htmlFor="hdd">HDD</label>
              <input
                type="text"
                name="hdd"
                onChange={(e) =>
                  setProduct({ ...product, hdd: parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <label htmlFor="ssd">SSD</label>
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
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    value="false"
                    name="anc"
                    onChange={(e) => setProduct({ ...product, anc: false })}
                  />
                  No
                </label>
              </div>
            </div>

            {/* WIRED */}
            <div>
              <label htmlFor="wired">Wired</label>
              <div name="wired">
                <label>
                  <input
                    type="radio"
                    value="true"
                    name="wired"
                    onChange={(e) => setProduct({ ...product, wired: true })}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    value="false"
                    name="wired"
                    onChange={(e) => setProduct({ ...product, wired: false })}
                  />
                  No
                </label>
              </div>
            </div>
          </div>
        )}
        {category && <Button type="submit">Add</Button>}
      </form>
    </Wrapper>
  );
};

export default InputForm;
