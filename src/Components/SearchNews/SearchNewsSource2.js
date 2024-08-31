import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoadingSource2,
  setNewsDataSource2,
} from "../../redux/slices/newsData";
import { List } from "antd";
import defaultImage from "../../Assets/icons/placeholder-image.webp";
import { setSearchTrigger2 } from "../../redux/slices/search";
import moment from "moment";
import { DISPLAY_DATE_FORMAT } from "../../constants";
import { getPastDateText } from "../../libs/utilities";

export const SearchNewsSource2 = () => {
  const [pageSize, setPageSize] = useState(3);
  const loadingSource2 = useSelector((state) => state.newsData.loadingSource2);
  const searchTrigger2 = useSelector((state) => state.search.searchTrigger2);
  const searchValue = useSelector((state) => state.search.searchValue);
  const selectedSource = useSelector((state) => state.search.selectedSource);
  const selectedDate = useSelector((state) => state.search.selectedDate);
  const selectedCategory = useSelector(
    (state) => state.search.selectedCategory
  );
  const apiKey = useSelector((state) => state.newsData.apiKey2);
  const newsDataSource2 = useSelector(
    (state) => state.newsData.newsDataSource2
  );
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(setLoadingSource2(true));
    dispatch(setNewsDataSource2([]));

    let parameters = `q=${searchValue}&api-key=${apiKey}`;

    if (selectedSource !== "all") {
      parameters += `&facet=true&facet_fields=source&facet_filter=true&fq=${selectedSource}`;
    } else if (selectedCategory !== "all") {
      parameters += `&facet=true&facet_fields=news_desk&facet_filter=true&fq=${selectedCategory}`;
    }
    if (selectedDate !== "anytime") {
      const nowDate = moment().format('YYYYMMDD');
      const beforeDate = moment(Date.now())
        .subtract(1, getPastDateText(selectedDate))
        .format('YYYYMMDD');

      parameters += `&begin_date=${beforeDate}&end_date=${nowDate}`;
    }

    fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?${parameters}`
    )
      .then((response) => response.json())
      .then(async (response) => {
        if (response.status === "OK") {
          dispatch(setNewsDataSource2(response.response.docs));
        } else {
          dispatch(setNewsDataSource2([]));
        }
        dispatch(setLoadingSource2(false));
        dispatch(setSearchTrigger2(false));
      })
      .catch((error) => {
        dispatch(setLoadingSource2(false));
        console.error("Error fetching data:", error.message);
      });
  };

  useEffect(() => {
    if (searchTrigger2) {
      fetchData();
    }
  }, [searchTrigger2]);

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
          loading={loadingSource2}
          pagination={{
            onChange: (page, size) => {
              setPageSize(size);
            },
            pageSize,
          }}
          dataSource={newsDataSource2}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              extra={
                <img
                  width={272}
                  alt="news-img"
                  src={
                    item.multimedia && item.multimedia.length
                      ? `https://static01.nyt.com/${item.multimedia[0].url}`
                      : defaultImage
                  }
                />
              }
            >
              <List.Item.Meta
                title={
                  <a href={item.web_url} target="_blank" rel="noreferrer">
                    {item.headline.print_headline || item.headline.main}
                  </a>
                }
                description={
                  <>
                    <div>{item.byline.original}</div>
                    <div>
                      {moment(item.pub_date).format(DISPLAY_DATE_FORMAT)}
                    </div>
                  </>
                }
              />
              {item.lead_paragraph || item.abstract || item.snippet}
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
