import React from "react";

const SideTab = ({ governorates }) => {
  governorates
    .sort((a, b) => a["infected-cases"] - b["infected-cases"])
    .reverse();
  const totalCases = governorates.reduce((a, c) => a + c["infected-cases"], 0);

  return (
    <React.Fragment>
      <div
        style={{
          borderRight: "2px solid #444444",
          fontFamily: "JF Flat, Raleway, Segoe UI, Tahoma, sans-serif",
        }}
      >
        <ul
          className="list-group w-100 custom-scrollbar"
          style={{
            overflow: "auto",
            height: "100vh",
          }}
        >
          <li
            className="list-group-item bg-dark text-danger"
            style={{
              borderBottom: "1px solid #12a2f9",
              borderRadius: "0",
              borderLeft: "10px solid #888888",
            }}
          >
            Total Cases: {totalCases}
          </li>
          {governorates.map((item, index) => (
            <li
              key={index}
              className="list-group-item bg-dark border-bottom border-secondary text-light"
              style={{ borderRadius: "0" }}
            >
              {item["city"]}:{" "}
              <span className="text-warning">{item["infected-cases"]}</span>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SideTab;
