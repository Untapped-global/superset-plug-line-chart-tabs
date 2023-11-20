import React, { useEffect, createRef, useState, SetStateAction } from "react";
import { styled } from "@superset-ui/core";
import {
  SupersetPlugLineChartTabsProps,
  SupersetPlugLineChartTabsStylesProps,
} from "./types";
import { Line } from "@ant-design/plots";

const Styles = styled.div<SupersetPlugLineChartTabsStylesProps>`
  .tabs {
    display: flex;
    gap: 12px;
  }
  .charts {
    max-width: 235px;
    height: 50px;
  }
  h2 {
    font-size: 14px;
  }
  .button-group {
    display: flex;
    border: 1px solid #ccc;
  }

  /* Hide all tab content by default */
  .tabcontent {
    display: none;
  }

  /* Style the tab buttons */
  .tablink {
    background-color: #fff;
    cursor: pointer;
    color: black;
    border-radius: none;
    border-right-color: #f4f4f5;
    border-right-width: 2px;
  }
  .tablink:focus {
    outline: none;
  }
  .tablink:hover {
    border-color: #fff;
  }

  .line {
    margin-top: 10px;
    border: none;
    border-top: 1px solid #ccc;
  }

  /* Style the active tab button */
  .tablink.active {
    background-color: #f4f4f5;
    border-radius: 0px;
  }

  /* Show the active tab */
  .tabcontent.active {
    display: block;
  }
  .container {
    margin-right: auto;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .table {
    width: 100%;
    border: 1px solid $color-form-highlight;
  }

  .table-header {
    display: flex;
    width: 100%;
  }
  .hit-unit {
    background-color: #abeab2;
    width: 113px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }
  .hit-unit-two {
    background-color: #ffe48c;
    width: 113px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }
  .hit-unit-three {
    background-color: #abeab2;
    width: 113px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }
  .hit-unit-four {
    background-color: #ff8390;
    width: 113px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }
  .hit-unit-five {
    background-color: #abeab2;
    width: 113px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }
  .hit-unit-target {
    background-color: #f4f4f5;
    width: 78px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }

  .table-row {
    display: flex;
    width: 100%;
    margin-top: 10px;
    align-items: center;
  }

  .table-data,
  .header__item {
    flex: 1 1 20%;
    text-align: center;
  }
  .table-batteries {
    flex: 1 1 20%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  h4 {
    font-size: 16px;
    font-weight: 500;
  }
  .filter__link {
    text-decoration: none;
    position: relative;
    display: inline-block;
    &.desc::after {
      content: "(desc)";
    }

    &.asc::after {
      content: "(asc)";
    }
  }
  .individual-tab {
    display: flex;
    gap: 2px;
  }
  .metrics {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    gap: "16px";
    width: "60%";
    padding: 60px 40px 60px;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.05);
  }
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.react:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }

  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    a:nth-of-type(2) .logo {
      animation: logo-spin infinite 20s linear;
    }
  }

  .card {
    padding: 2em;
  }

  .read-the-docs {
    color: #888;
  }
  background-color: ${({ theme }) => theme.colors.secondary.light2};
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  h3 {
    /* You can use your props to control CSS! */
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
    font-size: ${({ theme, headerFontSize }) =>
      theme.typography.sizes[headerFontSize]}px;
    font-weight: ${({ theme, boldText }) =>
      theme.typography.weights[boldText ? "bold" : "normal"]};
  }

  pre {
    height: ${({ theme, headerFontSize, height }) =>
      height - theme.gridUnit * 12 - theme.typography.sizes[headerFontSize]}px;
  }
`;

export default function SupersetPlugLineChartTabs(
  props: SupersetPlugLineChartTabsProps
) {
  const rootElem = createRef<HTMLDivElement>();
  const { height, width } = props;
  const [activeTab, setActiveTab] = useState("tab1");

  const openTab = (tabName: SetStateAction<string>) => {
    setActiveTab(tabName);
  };
  const config = {
    xField: "year",
    yField: "value",
    seriesField: "category",
    yAxis: {
      label: {
        formatter: (v: any) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: ["#1979C9", "#D62A0D", "#FAA219"],
  };
  const canvasElements = document.getElementsByTagName("canvas");

  for (let i = 0; i < canvasElements.length; i++) {
    const canvas = canvasElements[i];
    canvas.style.height = "52px";
  }

  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log("Plugin element", root);
  });

  console.log("Plugin props", props);

  return (
    <Styles
      ref={rootElem}
      boldText={props.boldText}
      headerFontSize={props.headerFontSize}
      height={height}
      width={width}
    >
      <div className="metrics">
        <h1>Asaak Key Metrics Snapshot for Nov 2023 </h1>
        <div>
          <div className="tabs">
            <h2>Comparison Period</h2>
            <div className="button-group">
              <button
                className={activeTab === "tab1" ? "tablink active" : "tablink"}
                onClick={() => openTab("tab1")}
              >
                1 week
              </button>
              <button
                className={activeTab === "tab2" ? "tablink active" : "tablink"}
                onClick={() => openTab("tab2")}
              >
                1 month
              </button>
              <button
                className={activeTab === "tab3" ? "tablink active" : "tablink"}
                onClick={() => openTab("tab3")}
              >
                3 months
              </button>
              <button
                className={activeTab === "tab4" ? "tablink active" : "tablink"}
                onClick={() => openTab("tab4")}
              >
                6 months
              </button>
              <button
                className={activeTab === "tab5" ? "tablink active" : "tablink"}
                onClick={() => openTab("tab5")}
              >
                1 year
              </button>
              <button
                className={activeTab === "tab6" ? "tablink active" : "tablink"}
                onClick={() => openTab("tab6")}
              >
                All time
              </button>
            </div>
          </div>
          <hr className="line" />
          <div
            id="tab1"
            className={
              activeTab === "tab1" ? "tabcontent active" : "tabcontent"
            }
          >
            <h2>Tab 1 Content</h2>
            <div className="container">
              <div className="table">
                <div className="table-header">
                  <div className="header__item">
                    <p id="name" className="filter__link">
                      Performance Indicators
                    </p>
                  </div>
                  <div className="header__item">
                    <p id="wins" className="filter__link filter__link--number">
                      Current
                    </p>
                  </div>
                  <div className="header__item">
                    <p id="draws" className="filter__link filter__link--number">
                      Target
                    </p>
                  </div>
                  <div className="header__item">
                    <p
                      id="losses"
                      className="filter__link filter__link--number"
                    >
                      Trend
                    </p>
                  </div>
                </div>
                <div className="table-content">
                  <div className="table-row">
                    <div className="table-data">Performance</div>
                    <div className="table-batteries">
                      <div className="hit-unit">2</div>
                    </div>
                    <div className="table-batteries">
                      <div className="hit-unit-target">2</div>
                    </div>
                    <div className="table-data">
                      {" "}
                      <Line data={[]} {...config} />
                    </div>
                  </div>
                  <div className="table-row">
                    <div className="table-data">Capital efficiency</div>
                    <div className="table-batteries">
                      <div className="hit-unit-two">2</div>
                    </div>
                    <div className="table-batteries">
                      <div className="hit-unit-target">2</div>
                    </div>
                    <div className="table-data">
                      {" "}
                      <Line data={[]} {...config} />
                    </div>
                  </div>
                  <div className="table-row">
                    <div className="table-data">Loan portfolio</div>
                    <div className="table-batteries">
                      <div className="hit-unit">2</div>
                    </div>
                    <div className="table-batteries">
                      <div className="hit-unit-target">2</div>
                    </div>
                    <div className="table-data">
                      {" "}
                      <Line data={[]} {...config} />
                    </div>
                  </div>
                  <div className="table-row">
                    <div className="table-data">Integration status</div>
                    <div className="table-batteries">
                      <div className="hit-unit-four">2</div>
                    </div>
                    <div className="table-batteries">
                      <div className="hit-unit-target">2</div>
                    </div>
                    <div className="table-data">
                      {" "}
                      <Line data={[]} {...config} />
                    </div>
                  </div>
                  <div className="table-row">
                    <div className="table-data">Financial situation</div>
                    <div className="table-batteries">
                      <div className="hit-unit-two">2</div>
                    </div>
                    <div className="table-batteries">
                      <div className="hit-unit-target">2</div>
                    </div>
                    <div className="table-data">
                      {" "}
                      <Line data={[]} {...config} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="tab2"
            className={
              activeTab === "tab2" ? "tabcontent active" : "tabcontent"
            }
          >
            <h2>Tab 2 Content</h2>
            <div className="container">
              <div className="table">
                <div className="table-header">
                  <div className="header__item">
                    <p id="name" className="filter__link">
                      Performance Indicators
                    </p>
                  </div>
                  <div className="header__item">
                    <p id="wins" className="filter__link filter__link--number">
                      Current
                    </p>
                  </div>
                  <div className="header__item">
                    <p id="draws" className="filter__link filter__link--number">
                      Target
                    </p>
                  </div>
                  <div className="header__item">
                    <p
                      id="losses"
                      className="filter__link filter__link--number"
                    >
                      Trend
                    </p>
                  </div>
                </div>
                <div className="table-content">
                  <div className="table-row">
                    <div className="table-data">Performance</div>
                    <div className="table-batteries">
                      <div className="hit-unit">2</div>
                    </div>
                    <div className="table-batteries">
                      <div className="hit-unit-target">2</div>
                    </div>
                    <div className="table-data">
                      {" "}
                      <Line data={[]} {...config} />
                    </div>
                  </div>
                  <div className="table-row">
                    <div className="table-data">Capital efficiency</div>
                    <div className="table-batteries">
                      <div className="hit-unit-two">2</div>
                    </div>
                    <div className="table-batteries">
                      <div className="hit-unit-target">2</div>
                    </div>
                    <div className="table-data">
                      {" "}
                      <Line data={[]} {...config} />
                    </div>
                  </div>
                  <div className="table-row">
                    <div className="table-data">Loan portfolio</div>
                    <div className="table-batteries">
                      <div className="hit-unit">2</div>
                    </div>
                    <div className="table-batteries">
                      <div className="hit-unit-target">2</div>
                    </div>
                    <div className="table-data">
                      {" "}
                      <Line data={[]} {...config} />
                    </div>
                  </div>
                  <div className="table-row">
                    <div className="table-data">Integration status</div>
                    <div className="table-batteries">
                      <div className="hit-unit-four">2</div>
                    </div>
                    <div className="table-batteries">
                      <div className="hit-unit-target">2</div>
                    </div>
                    <div className="table-data">
                      {" "}
                      <Line data={[]} {...config} />
                    </div>
                  </div>
                  <div className="table-row">
                    <div className="table-data">Financial situation</div>
                    <div className="table-batteries">
                      <div className="hit-unit-two">2</div>
                    </div>
                    <div className="table-batteries">
                      <div className="hit-unit-target">2</div>
                    </div>
                    <div className="table-data">
                      {" "}
                      <Line data={[]} {...config} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="tab3"
            className={
              activeTab === "tab3" ? "tabcontent active" : "tabcontent"
            }
          >
            <h2>Tab 3 Content</h2>
            <div className="container">
              <div className="table">
                <div className="table-header">
                  <div className="header__item">
                    <p id="name" className="filter__link">
                      Performance Indicators
                    </p>
                  </div>
                  <div className="header__item">
                    <p id="wins" className="filter__link filter__link--number">
                      Current
                    </p>
                  </div>
                  <div className="header__item">
                    <p id="draws" className="filter__link filter__link--number">
                      Target
                    </p>
                  </div>
                  <div className="header__item">
                    <p
                      id="losses"
                      className="filter__link filter__link--number"
                    >
                      Trend
                    </p>
                  </div>
                </div>
                <div className="table-content">
                  <div className="table-row">
                    <div className="table-data">Performance</div>
                    <div className="table-batteries">
                      <div className="hit-unit">2</div>
                    </div>
                    <div className="table-batteries">
                      <div className="hit-unit-target">2</div>
                    </div>
                    <div className="table-data">
                      {" "}
                      <Line data={[]} {...config} />
                    </div>
                  </div>
                  <div className="table-row">
                    <div className="table-data">Capital efficiency</div>
                    <div className="table-batteries">
                      <div className="hit-unit-two">2</div>
                    </div>
                    <div className="table-batteries">
                      <div className="hit-unit-target">2</div>
                    </div>
                    <div className="table-data">
                      {" "}
                      <Line data={[]} {...config} />
                    </div>
                  </div>
                  <div className="table-row">
                    <div className="table-data">Loan portfolio</div>
                    <div className="table-batteries">
                      <div className="hit-unit">2</div>
                    </div>
                    <div className="table-batteries">
                      <div className="hit-unit-target">2</div>
                    </div>
                    <div className="table-data">
                      {" "}
                      <Line data={[]} {...config} />
                    </div>
                  </div>
                  <div className="table-row">
                    <div className="table-data">Integration status</div>
                    <div className="table-batteries">
                      <div className="hit-unit-four">2</div>
                    </div>
                    <div className="table-batteries">
                      <div className="hit-unit-target">2</div>
                    </div>
                    <div className="table-data">
                      {" "}
                      <Line data={[]} {...config} />
                    </div>
                  </div>
                  <div className="table-row">
                    <div className="table-data">Financial situation</div>
                    <div className="table-batteries">
                      <div className="hit-unit-two">2</div>
                    </div>
                    <div className="table-batteries">
                      <div className="hit-unit-target">2</div>
                    </div>
                    <div className="table-data">
                      {" "}
                      <Line data={[]} {...config} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          <hr className="line" />
          <div className="footer">
            <h4>Forex exchange rate</h4>
            <h4>Current : $1 to KES 151.34</h4>
            <h4>At Deal start: $1 to KES 131.21</h4>
          </div>
        </div>
      </div>
    </Styles>
  );
}
