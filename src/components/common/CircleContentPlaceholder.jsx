import React from "react";
import ContentLoader from "react-content-loader";

const CircleContentPlaceholder = (props) => {
  return (
    <ContentLoader {...props} className="h-100">
      <circle cx="150" cy="130" r="100" />
      <rect x="30" y="300" rx="3" ry="3" width="170" height="8" />
      <rect x="30" y="340" rx="3" ry="3" width="170" height="8" />
      <rect x="30" y="380" rx="3" ry="3" width="170" height="8" />
      <rect x="30" y="420" rx="3" ry="3" width="170" height="8" />
    </ContentLoader>
  );
};

export default CircleContentPlaceholder;
