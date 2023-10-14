import React from "react";

const LoadingSkeleton = (props) => {
  return (
    <div
      className={`skeleton ${props.className} bg-gray-300`}
      style={{
        height: props.height,
        width: props.width || "100%",
        borderRadius: props.radius,
      }}
    ></div>
  );
};

export default LoadingSkeleton;
