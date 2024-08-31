import React, { useEffect } from "react";
import SearchFilters from "../SearchFilters";
import { useDispatch, useSelector } from "react-redux";
import { setSourceOptions } from "../../redux/slices/search";
import { Tabs } from "antd";
import { SearchNewsSource1 } from "../SearchNews/SearchNewsSource1";
import { SearchNewsSource2 } from "../SearchNews/SearchNewsSource2";
import { SearchNewsSource3 } from "../SearchNews/SearchNewsSource3";

const onTabChange = (key) => {
  console.log(key);
};

const tabItems = [
  {
    key: "1",
    label: "News API",
    children: <SearchNewsSource1 />,
  },
  {
    key: "2",
    label: "New York Times",
    children: <SearchNewsSource2 />,
  },
  {
    key: "3",
    label: "The Guardian",
    children: <SearchNewsSource3 />,
  },
];

export const MainContent = () => {
  const apiKey = useSelector((state) => state.newsData.apiKey1);
  const sourceOptions = useSelector((state) => state.search.sourceOptions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sourceOptions.length) {
      fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=${apiKey}`)
        .then((response) => response.json())
        .then(async (response) => {
          if (response.status === "ok") {
            let sources = response.sources.map((s) => ({
              value: s.id,
              label: s.name,
            }));
            sources = [{ value: "all", label: "All" }, ...sources];
            dispatch(setSourceOptions(sources));
          } else {
            dispatch(setSourceOptions([]));
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error.message);
        });
    }
  }, []);

  return (
    <>
      <div className="main-content-container">
        <SearchFilters />

        <Tabs
          tabBarGutter={50}
          tabBarStyle={{ margin: "20px 0", background: "#fff" }}
          defaultActiveKey="1"
          size="large"
          centered
          items={tabItems}
          onChange={onTabChange}
        />
      </div>
    </>
  );
};
