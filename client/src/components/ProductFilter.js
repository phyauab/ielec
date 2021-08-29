import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  phoneProperties,
  laptopProperties,
  headphoneProperties,
} from "../data/properties";
import { brands } from "../data/brands";
import Button from "./Button";
import Checkbox from "react-custom-checkbox";
import { useProductContext } from "../context/ProductContext";
import "rc-slider/assets/index.css";
const Slider = require("rc-slider");
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Wrapper = styled.div`
  flex-grow: 1;
  form {
    color: ${(props) => props.theme.text};
    display: flex;
    flex-direction: column;
    font-size: 1.1rem;
    gap: 1rem;
    padding: 0rem 2rem;
    max-width: 300px;
    div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .filter__item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        div {
          gap: 0.25rem;
        }
        span {
          font-size: 1.1rem;
          font-weight: 600;
        }
      }
    }
    input {
      padding: 0.25rem;
      font-size: 1rem;
    }
    select {
      padding: 0.25rem;
      font-size: 1rem;
    }
  }
`;

const ProductFilter = ({ category }) => {
  const MIN_RATING = 0;
  const MAX_RATING = 5;
  const MIN_PRICE = 0;
  const MAX_PRICE = 10000;
  const [filter, setFilter] = useState({});
  const { filterDisplayProducts } = useProductContext();

  const buildInput = (value, index, name) => {
    const type = typeof value;
    if (type === "string") {
      return (
        <input
          type="checkbox"
          index={name + index}
          name={name}
          value={value}
          onChange={(e) => setFilter({ ...filter })}
        />
      );
    } else if (type === "number") {
      return (
        <label key={name + index}>
          <input
            type="checkbox"
            value={value}
            name={name}
            onChange={(e) => {
              let tempArr;
              const newInput = parseInt(e.target.value);
              console.log("ram: " + newInput);
              if (filter[name]) {
                tempArr = [...filter[name]];
              } else {
                tempArr = [];
              }

              if (tempArr.includes(newInput)) {
                tempArr = tempArr.filter((ram) => ram !== newInput);
              } else {
                tempArr.push(newInput);
              }

              if (tempArr.length === 0) {
                let tempFilter = filter;
                delete tempFilter.ram;
                return setFilter({ ...tempFilter });
              }

              setFilter({
                ...filter,
                [e.target.name]: tempArr,
              });
            }}
          />
          {" " + value}GB
        </label>
      );
    } else if (type === "boolean") {
      return (
        <label key={name + index} htmlFor={name}>
          <input type="radio" value={value} name={name} />
          {value ? " Yes" : " No"}
        </label>
      );
    }
    return <input type="text" />;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    filterDisplayProducts(filter, category);
  };

  useEffect(() => {
    setFilter({});
  }, [category]);

  return (
    <Wrapper>
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* All products */}
        <div>
          {/* Name */}
          <div className="filter__item">
            <span>Name</span>
            <input
              type="text"
              name="name"
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            />
          </div>
          {/* Brand */}
          <div className="filter__item">
            <span>Brand</span>
            <select
              onChange={(e) => {
                if (e.target.value === "All" && filter.brand) {
                  var tempFilter = filter;
                  delete tempFilter.brand;
                  return setFilter({ ...tempFilter });
                }
                setFilter({ ...filter, brand: e.target.value });
              }}
            >
              <option defaultValue>All</option>
              {brands.map((brand, index) => {
                return (
                  <option key={brand + index} value={brand}>
                    {brand}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Rating */}
          <div className="filter__item">
            <span>Rating</span>
            <Range
              min={MIN_RATING}
              max={MAX_RATING}
              name="rating"
              defaultValue={[MIN_RATING, MAX_RATING]}
              onChange={(e) => setFilter({ ...filter, rating: e })}
            />
          </div>
          {/* price */}
          <div className="filter__item">
            <span>Price</span>
            <Range
              min={MIN_PRICE}
              max={MAX_PRICE}
              name="price"
              defaultValue={[MIN_PRICE, MAX_PRICE]}
              step={500}
              onChange={(e) => setFilter({ ...filter, price: e })}
            />
          </div>
        </div>

        {/* Phone */}
        {category === "phones" && (
          <div>
            {/* <div className="filter__item">
                <span>Color</span>
                <div>
                  {phoneProperties["colors"].map((color, index) =>
                    buildInput(color, index, "color")
                  )}
                </div>
              </div> */}
            <div className="filter__item">
              <span>RAM</span>
              <div>
                {phoneProperties["ram"].map((ram, index) =>
                  buildInput(ram, index, "ram")
                )}
              </div>
            </div>
            <div className="filter__item">
              <span>Storage</span>
              <div>
                {phoneProperties["storage"].map((storage, index) =>
                  buildInput(storage, index, "storage")
                )}
              </div>
            </div>
          </div>
        )}

        {/* Laptops */}
        {category === "laptops" && (
          <div>
            <div className="filter__item">
              <span>CPU</span>
              <input type="text" name="cpu" />
            </div>
            <div className="filter__item">
              <span>RAM</span>
              <div>
                {laptopProperties["ram"].map((ram, index) =>
                  buildInput(ram, index, "ram")
                )}
              </div>
            </div>
            <div className="filter__item">
              <span>HDD</span>
              <div>
                {laptopProperties["hdd"].map((hdd, index) =>
                  buildInput(hdd, index, "hdd")
                )}
              </div>
            </div>
            <div className="filter__item">
              <span>ssd</span>
              <div>
                {laptopProperties["ssd"].map((ssd, index) =>
                  buildInput(ssd, index, "ssd")
                )}
              </div>
            </div>
          </div>
        )}

        {/* Headphones */}
        {category === "headphones" && (
          <div>
            <div className="filter__item">
              <span>Active Noise Cancellation</span>
              <div>
                {headphoneProperties["anc"].map((anc, index) =>
                  buildInput(anc, index, "anc")
                )}
              </div>
            </div>
            <div className="filter__item">
              <span>Wired</span>
              <div>
                {headphoneProperties["wired"].map((wired, index) =>
                  buildInput(wired, index, "wired")
                )}
              </div>
            </div>
          </div>
        )}
        <div>
          <Button>Filter</Button>
        </div>
      </form>
    </Wrapper>
  );
};

export default ProductFilter;
