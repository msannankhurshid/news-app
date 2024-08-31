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
import { DISPLAY_DATE_FORMAT } from "../../constants";
import { getPastDateText, isCategoryAllowed } from "../../libs/utilities";

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

    let parameters = `api-key=${apiKey}&page-size=50&show-fields=all`;

    if (searchValue) {
      parameters += `&q=${searchValue}`;
    } else if (
      !searchValue &&
      selectedSource === "all" &&
      selectedCategory === "all"
    ) {
      // parameters += "&q=news";
    }
    if (selectedSource !== "all") {
      parameters += `&publication=${selectedSource}`;
    }
    if (isCategoryAllowed(selectedCategory, selectedSource)) {
      parameters += `&pillarName=${selectedCategory}`;
    }

    const baseUrl = "https://content.guardianapis.com/search";
    const url = `${baseUrl}?${parameters}`;

    fetch(url)
      .then((response) => response.json())
      .then(async (response) => {
        if (response.response.status === "ok") {
          let articles = response.response.results;

          if (selectedDate !== "anytime") {
            const nowDate = moment();
            const beforeDate = moment(Date.now()).subtract(
              1,
              getPastDateText(selectedDate)
            );

            articles = articles.filter((art) =>
              moment(art.webPublicationDate).isBetween(beforeDate, nowDate)
            );
          }
          dispatch(setNewsDataSource3(articles));
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
              {searchValue !== "" ? "Search Results" : "Top News"}
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
            <List.Item key={item.webTitle}
            extra={
              <img
                width={272}
                alt="news-img"
                src={item.fields.thumbnail || defaultImage}
              />
            }>
              <List.Item.Meta
                title={
                  <a href={item.webUrl} target="_blank" rel="noreferrer">
                    {item.webTitle}
                  </a>
                }
                description={
                  <>
                    <div>{item.fields.byline || item.fields.publication}</div>
                    <div>
                      {moment(item.webPublicationDate).format(
                        DISPLAY_DATE_FORMAT
                      )}
                    </div>
                  </>
                }
              />
              <div className="limit-text" title={item.fields.bodyText}>{item.fields.bodyText}</div>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
