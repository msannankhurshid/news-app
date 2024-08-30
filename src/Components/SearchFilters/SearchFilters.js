import Search from "antd/lib/input/Search";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTrigger1,
  setSearchTrigger2,
  setSearchTrigger3,
  setSearchValue,
  setToggleSearchBox,
} from "../../redux/slices/search";
import { Tooltip } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { CustomSearchBox } from "./CustomSearchBox";

export const SearchFilters = () => {
  const loading = useSelector((state) => state.search.loading);
  const toggleSearchBox = useSelector((state) => state.search.toggleSearchBox);
  const dispatch = useDispatch();

  const onSearch = () => {
    dispatch(setSearchTrigger1(true));
    dispatch(setSearchTrigger2(true));
    dispatch(setSearchTrigger3(true));
  };

  return (
    <>
      <div>
        <Search
          placeholder="Search..."
          loading={loading}
          suffix={
            <Tooltip title="Click to customize search">
              <CaretDownOutlined
                onClick={() => dispatch(setToggleSearchBox(!toggleSearchBox))}
                style={{
                  color: "rgba(0,0,0,.45)",
                }}
              />
            </Tooltip>
          }
          onSearch={(e) => e && onSearch(e)}
          onChange={(e) => dispatch(setSearchValue(e.currentTarget.value))}
        />
      </div>

      {toggleSearchBox && <CustomSearchBox />}
    </>
  );
};
