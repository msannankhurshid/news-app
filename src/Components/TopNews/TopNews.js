import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListData, setLoading } from "../../redux/slices/newsData";
import { Avatar, List, Space } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const TopNews = () => {
  const apiKey = useSelector((state) => state.newsData.apiKey);
  const listData = useSelector((state) => state.newsData.listData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    fetch(`https://newsapi.org/v2/everything?q=latest&apiKey=${apiKey}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response.status === "ok") {
          dispatch(setListData(response.articles));
        } else {
          dispatch(setListData([]));
        }
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.error("Error fetching data:", error.message);
      });
  }, []);

  return (
    <>
      <div>
        <List
          className="news-container"
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={listData}
          // footer={
          //   <div>
          //     <b>ant design</b> footer part
          //   </div>
          // }
          renderItem={(item) => (
            <List.Item
              key={item.title}
              extra={
                item.urlToImage ? (
                  <img width={272} alt="logo" src={item.urlToImage} />
                ) : (
                  ""
                )
              }
            >
              <List.Item.Meta
                title={
                  <a href={item.url} target="_blank">
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
