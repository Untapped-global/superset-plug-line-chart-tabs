import React, { useEffect, createRef, useState } from "react";
import { styled } from "@superset-ui/core";
import {
  SupersetPlugLineChartTabsProps,
  SupersetPlugLineChartTabsStylesProps,
} from "./types";
import { Line } from "react-chartjs-2";
import Chart, { CategoryScale } from "chart.js/auto";
Chart.register(CategoryScale);

const Styles = styled.div<SupersetPlugLineChartTabsStylesProps>`
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
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const standingsColors: { [x: string]: string } = {
    good: "#ABEAB2",
    average: "#FFE48C",
    bad: "#FF8390",
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
      <div
        style={{
          // width: "846px",
          width: "100vw",
          height: "100vh",
          // padding: "40px 60px 32px 60px",
          padding: isMobile ? "20px 10px" : "40px 60px 32px 60px",
          background: "white",
          borderRadius: "12px",
          // borderTopRightRadius: "12px",
          overflow: "hidden",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          // gap: "30px",
          gap: "isMobile ? '10px' : '30px'",
          display: "inline-flex",
        }}
      >
        {/* Header */}
        <div
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "12px",
            display: "flex",
          }}
        >
          <div
            style={{
              color: "#202945",
              fontSize: "20px",
              fontFamily: "Inter",
              fontWeight: "600",
              lineHeight: "24px",
              wordWrap: "break-word",
            }}
          >
            Asaak Key Metrics Snapshot for Nov 2023{" "}
          </div>
        </div>

        {/* Comparison Period */}
        <div
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "12px",
            display: "inline-flex",
          }}
        >
          <div
            style={{
              color: "#202945",
              fontSize: "14px",
              fontFamily: "Inter",
              fontWeight: "400",
              lineHeight: "19.6px",
              wordWrap: "break-word",
            }}
          >
            Comparison Period
          </div>
          {/*  */}
          <div
            style={{
              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
              borderRadius: "8px",
              overflow: "hidden",
              border: "0.86px #D0D5DD solid",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              display: "flex",
              cursor: "pointer",
            }}
          >
            {[
              "1 week",
              "1 month",
              "3 months",
              "6 months",
              "1 year",
              "All time",
            ].map((duration, id) => {
              return (
                <div
                  style={{
                    paddingLeft: "13.78px",
                    paddingRight: "13.78px",
                    paddingTop: "6.89px",
                    paddingBottom: "6.89px",
                    background: activeTab === id ? "#F4F4F5" : "",
                    borderRight: "0.86px #D0D5DD solid",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "6.89px",
                    display: "flex",
                  }}
                  onClick={() => setActiveTab(id)}
                  key={duration}
                >
                  <div
                    style={{
                      color: "#344054",
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: "600",
                      lineHeight: "20px",
                      wordWrap: "break-word",
                    }}
                  >
                    {duration}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Line */}
        <div
          style={{
            width: "100%",
            // height: "100%",
            margin: "30px 0",
            // margin: "30px",
            border: "1px #E3E3E8 solid",
          }}
        />

        {/* Content */}
        <div
          style={{
            padding: "8px 0 40px 0",
            background: "white",
            overflow: "hidden",
            flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            gap: "16px",
            display: "inline-flex",
          }}
        >
          <div
            style={{
              // alignSelf: "stretch",
              // height: "346px",
              flexDirection: "column",
              // justifyContent: "center",
              alignItems: "flex-start",
              gap: "8px",
              display: "flex",
            }}
          >
            {/* Heatmap */}
            <div
              style={{
                width: "100%",
                // height: "100%",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-end",
                gap: "8px",
                display: "inline-flex",
              }}
            >
              {/* Heatmap Title */}
              {/* <div
								style={{
									alignSelf: "stretch",
									padding: "12px 0",
									justifyContent: "flex-start",
									alignItems: "center",
									display: "inline-flex",
								}}
							>
								<div
									style={{
										width: "223px",
										color: "#3E404C",
										fontSize: "16px",
										fontFamily: "Inter",
										fontWeight: "700",
										lineHeight: "22.4px",
										wordWrap: "break-word",
									}}
								>
									Performance Indicators{" "}
								</div>
								<div
									style={{
										height: "22px",
										justifyContent: "flex-start",
										alignItems: "flex-start",
										gap: "24px",
										display: "flex",
									}}
								>
									<div
										style={{
											width: "116px",
											textAlign: "center",
											color: "#3E404C",
											fontSize: "16px",
											fontFamily: "Inter",
											fontWeight: "700",
											lineHeight: "22.4px",
											wordWrap: "break-word",
										}}
									>
										Current
									</div>
									<div
										style={{
											width: "76px",
											textAlign: "center",
											color: "#3E404C",
											fontSize: "16px",
											fontFamily: "Inter",
											fontWeight: "700",
											lineHeight: "22.4px",
											wordWrap: "break-word",
										}}
									>
										Target
									</div>
								</div>
								<div
									style={{
										width: "130px",
										textAlign: "right",
										color: "#3E404C",
										fontSize: "16px",
										fontFamily: "Inter",
										fontWeight: "700",
										lineHeight: "22.4px",
										wordWrap: "break-word",
									}}
								>
									Trend
								</div>
							</div> */}
              <div
                style={{
                  display: "flex",
                  padding: "12px 0px",
                  alignItems: "center",
                  alignSelf: "stretch",
                  color: "#3E404C",
                  fontFamily: "Inter",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "140%",
                }}
              >
                {[
                  {
                    title: "Performance Indicators",
                    style: { width: "223px", marginRight: "30px" },
                  },
                  {
                    title: "Current",
                    style: { width: "116px", marginLeft: "30px" },
                  },
                  {
                    title: "Target",
                    style: { width: "116px", marginLeft: "30px" },
                  },
                  {
                    title: "Trend",
                    style: {
                      width: "130px",
                      textAlign: "right",
                      marginLeft: "20px",
                    },
                  },
                ].map(({ title, style }) => (
                  <div
                    style={{ ...(style as React.CSSProperties) }}
                    key={title}
                  >
                    {title}
                  </div>
                ))}
              </div>

              {/* Indicators */}
              {[
                {
                  title: "Perfomance",
                  current: "85",
                  currentStanding: "good",
                  target: "80%",
                  trend: { value: "6.5%", flow: "up" },
                },
                {
                  title: "Capital efficiency",
                  current: "72%",
                  currentStanding: "average",
                  target: "90%",
                  trend: { value: "6.5%", flow: "up" },
                },
                {
                  title: "Loan portfolio health",
                  current: "98%",
                  currentStanding: "good",
                  target: "95%",
                  trend: { value: "6.5%", flow: "up" },
                },
                {
                  title: "Integration status",
                  current: "426",
                  currentStanding: "bad",
                  target: "700",
                  trend: { value: "48.5%", flow: "down" },
                },
                {
                  title: "Financial situation",
                  current: "400",
                  currentStanding: "average",
                  target: "570",
                  trend: { value: "6.5%", flow: "down" },
                },
              ].map(({ title, current, currentStanding, target, trend }) => {
                return (
                  <div
                    style={{
                      alignSelf: "stretch",
                      alignItems: "center",
                      gap: "33px",
                      display: "inline-flex",
                    }}
                    key={title}
                  >
                    {/* Indicator Title */}
                    <div
                      style={{
                        // flex: "1 1 0",
                        color: "#3E404C",
                        fontSize: "16px",
                        fontFamily: "Inter",
                        fontWeight: "400",
                        lineHeight: "22.4px",
                        wordWrap: "break-word",
                        width: "223px",
                      }}
                    >
                      {title}
                    </div>

                    <div
                      style={{
                        gap: "35px",
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          paddingRight: "18px",
                          gap: "24px",
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            width: "113px",
                            height: "52px",
                            padding: "8px",
                            background: standingsColors[currentStanding],
                            borderRadius: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "8px",
                            display: "flex",
                          }}
                        >
                          <div
                            style={{
                              textAlign: "center",
                              color: "#202945",
                              fontSize: "16px",
                              fontFamily: "Inter",
                              fontWeight: "700",
                              lineHeight: "22.4px",
                              wordWrap: "break-word",
                            }}
                          >
                            {current}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            width: "78px",
                            height: "52px",
                            padding: "8px",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "8px",
                            borderRadius: "8px",
                            background: "#F4F4F5",
                          }}
                        >
                          <div
                            style={{
                              color: "#202945",
                              textAlign: "center",
                              fontFamily: "Inter",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 700,
                              lineHeight: "140%",
                            }}
                          >
                            {target}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          // height: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "16px",
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            textAlign: "center",
                            color: "#202945",
                            fontSize: "16px",
                            fontFamily: "Inter",
                            fontWeight: "400",
                            lineHeight: "22.4px",
                            wordWrap: "break-word",
                          }}
                        >
                          {trend.value}
                        </div>
                        <div
                          style={{
                            width: "18px",
                          }}
                        >
                          <svg
                            width="13"
                            height="19"
                            viewBox="0 0 13 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              id="Arrow 1"
                              d={
                                trend.flow === "up"
                                  ? "M6.5 0.458984L0.0336766 11.659L12.9663 11.659L6.5 0.458984ZM5.38 10.539L5.38 18.459L7.62 18.459L7.62 10.539L5.38 10.539Z"
                                  : "M6.5 18.459L12.9663 7.25898L0.0336772 7.25898L6.5 18.459ZM7.62 8.37898L7.62 0.458984L5.38 0.458984L5.38 8.37898L7.62 8.37898Z"
                              }
                              fill={trend.flow === "up" ? "#71C179" : "#D74C5B"}
                            />
                          </svg>
                        </div>

                        {/* <div
													style={
														{
															// width: "100%",
															// height: "100%",
															// position: "relative",
														}
													}
												> */}
                        <div
                          style={{
                            width: "218px",
                            height: "80px",
                          }}
                        >
                          <Line
                            datasetIdKey="id"
                            data={{
                              labels: [],
                              datasets: [],
                            }}
                            // data={data}
                            options={{
                              responsive: true,
                              scales: {
                                y: {
                                  // display: false,
                                  // y: {
                                  suggestedMin: 15,
                                  suggestedMax: 30,
                                  // },
                                  grid: { display: false },
                                },
                                x: { grid: { display: false } },
                              },
                              plugins: {
                                title: {
                                  display: false,
                                  // text: "Average Rainfall per month",
                                  // fontSize: 20,
                                },
                                legend: {
                                  display: false,
                                  // position: "right",
                                },
                              },
                            }}
                          />
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* Indicators End */}
            </div>
          </div>
        </div>

        {/* Line */}
        <div
          style={{
            width: "100%",
            // height: "100%",
            margin: "30px 0",
            // margin: "30px",
            border: "1px #E3E3E8 solid",
          }}
        />

        {/*  */}
        <div
          style={{
            paddingRight: "12px",
            justifyContent: "space-between",
            width: "900px",
            alignItems: "center",
            display: "inline-flex",
          }}
        >
          <div
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "33px",
              display: "flex",
            }}
          >
            <div
              style={{
                color: "#3E404C",
                fontSize: "16px",
                fontFamily: "Inter",
                fontWeight: "400",
                lineHeight: "22.4px",
                wordWrap: "break-word",
              }}
            >
              Forex exchange rate{" "}
            </div>
          </div>
          <div
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "33px",
              display: "flex",
            }}
          >
            <div>
              <span
                style={{
                  color: "#3E404C",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: "400",
                  lineHeight: "22.40px",
                  wordWrap: "break-word",
                }}
              >
                Current :{" "}
              </span>
              <span
                style={{
                  color: "#3E404C",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: "500",
                  lineHeight: "22.4px",
                  wordWrap: "break-word",
                }}
              >
                $1 to KES 151.34{" "}
              </span>
            </div>
          </div>
          <div
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "33px",
              display: "flex",
            }}
          >
            <div>
              <span
                style={{
                  color: "#3E404C",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: "400",
                  lineHeight: "22.4px",
                  wordWrap: "break-word",
                }}
              >
                At Deal start:{" "}
              </span>
              <span
                style={{
                  color: "#3E404C",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: "500",
                  lineHeight: "22.4px",
                  wordWrap: "break-word",
                }}
              >
                $1 to KES 131.21{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Styles>
  );
}
