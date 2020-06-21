import React from "react";
import ContentLoader from "react-content-loader";

const CircleContentPlaceholder = (props) => {
  return (
    <ContentLoader {...props} className="h-100">
      <circle cx="150" cy="130" r="100" />
      <rect x="30" y="280" rx="3" ry="3" width="170" height="8" />
      <rect x="30" y="320" rx="3" ry="3" width="170" height="8" />
      <rect x="30" y="360" rx="3" ry="3" width="170" height="8" />
      <rect x="30" y="400" rx="3" ry="3" width="170" height="8" />
      <rect x="30" y="440" rx="3" ry="3" width="170" height="8" />
    </ContentLoader>
  );
};

export default CircleContentPlaceholder;
