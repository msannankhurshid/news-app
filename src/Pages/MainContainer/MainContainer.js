import React from "react";
import { Layout } from "antd";
import HeaderComponent from "../../Components/HeaderComponent";
import MainContent from "../../Components/MainContent";

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
  backgroundColor: "rgba(128,134,139,.2)",
};

export const MainContainer = () => {
  return (
    <>
      <Layout style={layoutStyle}>
        <HeaderComponent />
        <MainContent />
      </Layout>
    </>
  );
};
