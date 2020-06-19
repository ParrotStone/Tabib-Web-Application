import React from 'react';
import ContentLoader from "react-content-loader";

const RectContentPlaceholder = (props) => {
  return (
     <ContentLoader {...props} className="h-100">
      <rect x="0" y="0" rx="3" ry="3" width="150" height="150" />
    </ContentLoader>
  );
};

export default RectContentPlaceholder;