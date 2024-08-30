import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoadingSource3,
  setNewsDataSource3,
} from "../../redux/slices/newsData";
import { List } from "antd";
import defaultImage from "../../Assets/icons/placeholder-image.webp";
import { setSearchTrigger3 } from "../../redux/slices/search";
import moment from "moment";
import { DATE_FORMAT } from "../../constants";
import { getPastDateText } from "../../libs/utilities";

export const SearchNewsSource3 = () => {
  const [pageSize, setPageSize] = useState(3);
  const loadingSource3 = useSelector((state) => state.newsData.loadingSource3);
  const searchTrigger3 = useSelector((state) => state.search.searchTrigger3);
  const searchValue = useSelector((state) => state.search.searchValue);
  const selectedSource = useSelector((state) => state.search.selectedSource);
  const selectedDate = useSelector((state) => state.search.selectedDate);
  const selectedCategory = useSelector(
    (state) => state.search.selectedCategory
  );
  const apiKey = useSelector((state) => state.newsData.apiKey3);
  const newsDataSource3 = useSelector(
    (state) => state.newsData.newsDataSource3
  );
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(setLoadingSource3(true));
    dispatch(setNewsDataSource3([]));

    let parameters = `q=${searchValue}&apiKey=${apiKey}`;

    if (selectedSource !== "all") {
      parameters += `&sources=${selectedSource}`;
    }
    if (selectedCategory !== "all") {
      // parameters += `&category=${selectedCategory}`;
    }
    if (selectedDate !== "anytime") {
      const nowDate = moment().format(DATE_FORMAT);
      const beforeDate = moment(Date.now())
        .subtract(1, getPastDateText(selectedDate))
        .format(DATE_FORMAT);

      parameters += `&from=${beforeDate}&to=${nowDate}`;
    }

    fetch(`https://newsapi.org/v2/everything?${parameters}`)
      .then((response) => response.json())
      .then(async (response) => {
        if (response.status === "ok") {
          dispatch(setNewsDataSource3(response.articles));
        } else {
          dispatch(setNewsDataSource3([]));
        }
        dispatch(setLoadingSource3(false));
        dispatch(setSearchTrigger3(false));
      })
      .catch((error) => {
        dispatch(setLoadingSource3(false));
        console.error("Error fetching data:", error.message);
      });
  };

  useEffect(() => {
    if (searchTrigger3) {
      fetchData();
    }
  }, [searchTrigger3]);

  return (
    <>
      <div>
        <List
          className="news-container"
          header={
            <div className="header-title">
              {searchValue !== "Top News" ? "Search Results" : "Top News"}
            </div>
          }
          itemLayout="vertical"
          size="large"
          loading={loadingSource3}
          pagination={{
            onChange: (page, size) => {
              setPageSize(size);
            },
            pageSize,
          }}
          dataSource={newsDataSource3}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              extra={
                <img
                  width={272}
                  alt="news-img"
                  src={item.urlToImage || defaultImage}
                />
              }
            >
              <List.Item.Meta
                title={
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                }
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
