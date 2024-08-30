import React from "react";
import logo from "../../Assets/icons/logo.jpg";

const headerStyle = {
  textAlign: "center",
};

export const HeaderComponent = () => {
  return (
    <>
      <div className="header-container" style={headerStyle}>
        <div className="header-sub-container">
          <div>
            <img alt={"logo"} src={logo} />
          </div>
          <div>
            <h1 className="header-title">News Aggregator</h1>
          </div>
        </div>
      </div>
    </>
  );
};
