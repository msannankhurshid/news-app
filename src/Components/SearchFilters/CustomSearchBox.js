import Search from "antd/lib/input/Search";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTrigger1,
  setSearchTrigger2,
  setSearchTrigger3,
  setSearchValue,
  setSelectedCategory,
  setSelectedDate,
  setSelectedSource,
  setToggleSearchBox,
} from "../../redux/slices/search";
import { Button, Select, Tooltip } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

export const CustomSearchBox = () => {
  const sourceOptions = useSelector((state) => state.search.sourceOptions);
  const selectedSource = useSelector((state) => state.search.selectedSource);
  const dateOptions = useSelector((state) => state.search.dateOptions);
  const selectedDate = useSelector((state) => state.search.selectedDate);
  const categoryOptions = useSelector((state) => state.search.categoryOptions);
  const selectedCategory = useSelector(
    (state) => state.search.selectedCategory
  );
  const dispatch = useDispatch();

  const onSelectFilters = () => {
    dispatch(setSearchTrigger1(true));
    dispatch(setSearchTrigger2(true));
    dispatch(setSearchTrigger3(true));
    dispatch(setToggleSearchBox(false));
  };

  return (
    <>
      <div className="custom-search-box">
        <div className="header-title custom-search-box-description">
          Customize Search Filters
        </div>

        <div className="custom-search-box-fields">
          <span className="custom-search-box-heading">Source: </span>
          <Select
            value={selectedSource}
            style={{ width: "300px" }}
            onChange={(e) => dispatch(setSelectedSource(e))}
            options={sourceOptions}
          />
          <span style={{ marginLeft: '20px' }}>(Preferred)</span>
        </div>

        <div className="custom-search-box-fields">
          <span className="custom-search-box-heading">Date: </span>
          <Select
            value={selectedDate}
            style={{ width: "300px" }}
            onChange={(e) => dispatch(setSelectedDate(e))}
            options={dateOptions}
          />
        </div>

        <div className="custom-search-box-fields">
          <span className="custom-search-box-heading">Category: </span>
          <Select
            value={selectedCategory}
            style={{ width: "300px" }}
            onChange={(e) => dispatch(setSelectedCategory(e))}
            options={categoryOptions}
          />
        </div>

        <div className="custom-search-box-fields text-align-right">
          <Button type="primary" block onClick={() => onSelectFilters()}>
            Select Filters
          </Button>
        </div>
      </div>
    </>
  );
};
