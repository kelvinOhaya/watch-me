import React from "react";

function Tag({ description }) {
  return (
    <span
      style={{
        borderRadius: 24,
        border: "2px solid #7c7c7c",
        color: "#7c7c7c",
        padding: "8px 16px",
        fontSize: 16,
      }}
    >
      {description}
    </span>
  );
}

export default Tag;
