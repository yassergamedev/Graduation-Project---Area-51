import React, { useEffect, useState } from "react";
import { Card, Divider, Tabs } from "antd";
import "./styles/CompetitionCreator3.css";

const { TabPane } = Tabs;

const ChallengeCreator2 = ({onChangeDesign}) => {
  const [design, setDesign] = useState("");

  const handleTabClick = (key) => {
    setDesign(key);
    onChangeDesign("key")
  };

  useEffect(()=>{
    onChangeDesign(design)
  },[design])
  return (
    <div>
      <Divider><h4>Design </h4></Divider>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        
        <Card
          title="Two Tabs"
          onClick={() => setDesign("two-tabs")}
          className={design === "two-tabs" ? "selected-card" : ""}
          hoverable
          style={{ width: 300 }}
        >
          <Tabs onTabClick={handleTabClick}>
            <TabPane tab="Problems" key="problems">
              Content of Problems Tab
            </TabPane>
            <TabPane tab="Questions" key="questions">
              Content of Questions Tab
            </TabPane>
          </Tabs>
        </Card>
        <Card
          title="One Tab"
          onClick={() => setDesign("one-tab")}
          className={design === "one-tab" ? "selected-card" : ""}
          hoverable
          style={{ width: 300 }}
        >
          <Tabs onTabClick={handleTabClick}>
            <TabPane tab="Problems" key="problems">
              Content of Problems Tab
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ChallengeCreator2;
