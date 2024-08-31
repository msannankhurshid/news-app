import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoadingSource1,
  setNewsDataSource1,
} from "../../redux/slices/newsData";
import { List } from "antd";
import defaultImage from "../../Assets/icons/placeholder-image.webp";
import { setSearchTrigger1 } from "../../redux/slices/search";
import moment from "moment";
import { DISPLAY_DATE_FORMAT } from "../../constants";
import { getPastDateText, isCategoryAllowed } from "../../libs/utilities";

export const SearchNewsSource1 = () => {
  const [pageSize, setPageSize] = useState(3);
  const loadingSource1 = useSelector((state) => state.newsData.loadingSource1);
  const searchTrigger1 = useSelector((state) => state.search.searchTrigger1);
  const searchValue = useSelector((state) => state.search.searchValue);
  const selectedSource = useSelector((state) => state.search.selectedSource);
  const selectedDate = useSelector((state) => state.search.selectedDate);
  const selectedCategory = useSelector(
    (state) => state.search.selectedCategory
  );
  const apiKey = useSelector((state) => state.newsData.apiKey1);
  const newsDataSource1 = useSelector(
    (state) => state.newsData.newsDataSource1
  );
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(setLoadingSource1(true));
    dispatch(setNewsDataSource1([]));

    let parameters = `apiKey=${apiKey}&pageSize=100`;

    if (searchValue) {
      parameters += `&q=${searchValue}`;
    } else if (
      !searchValue &&
      selectedSource === "all" &&
      selectedCategory === "all"
    ) {
      parameters += "&q=news";
    }
    if (selectedSource !== "all") {
      parameters += `&sources=${selectedSource}`;
    }
    if (isCategoryAllowed(selectedCategory, selectedSource)) {
      parameters += `&category=${selectedCategory}`;
    }

    const baseUrl = "https://newsapi.org/v2/";
    const url = `${baseUrl}${
      isCategoryAllowed(selectedCategory, selectedSource)
        ? "top-headlines"
        : "everything"
    }?${parameters}`;

    fetch(url)
      .then((response) => response.json())
      .then(async (response) => {
        if (response.status === "ok") {
          let articles = response.articles;

          if (selectedDate !== "anytime") {
            const nowDate = moment();
            const beforeDate = moment(Date.now()).subtract(
              1,
              getPastDateText(selectedDate)
            );

            articles = articles.filter((art) =>
              moment(art.publishedAt).isBetween(beforeDate, nowDate)
            );
          }
          dispatch(setNewsDataSource1(articles));
        } else {
          dispatch(setNewsDataSource1([]));
        }
        dispatch(setLoadingSource1(false));
        dispatch(setSearchTrigger1(false));
      })
      .catch((error) => {
        dispatch(setLoadingSource1(false));
        console.error("Error fetching data:", error.message);
      });
  };

  useEffect(() => {
    if (searchTrigger1) {
      fetchData();
    }
  }, [searchTrigger1]);

  return (
    <>
      <div>
        <List
          className="news-container"
          header={
            <div className="header-title">
              {searchValue !== "" ? "Search Results" : "Top News"}
            </div>
          }
          itemLayout="vertical"
          size="large"
          loading={loadingSource1}
          pagination={{
            onChange: (page, size) => {
              setPageSize(size);
            },
            pageSize,
          }}
          dataSource={newsDataSource1}
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
                description={
                  <>
                    <div>{item.author || item.source.name}</div>
                    <div>
                      {moment(item.publishedAt).format(DISPLAY_DATE_FORMAT)}
                    </div>
                  </>
                }
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
