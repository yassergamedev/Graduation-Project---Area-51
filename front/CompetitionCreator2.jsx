import React, { useState } from "react";
import { Button, Checkbox, Divider, InputNumber, Radio, Select } from "antd";
import PointsDistributionCreator from "./PointsDistributionCreator";

const { Option } = Select;

const CompetitionCreator2 = ( {competition,onChangePrizepool, onChangeCompetitionType,
  onChangeTeamSizeLimit, onChangeNumParticipants}) => {
 
  const [competitionType, setCompetitionType] = useState(competition.competitionType);
  const [teamSizeLimit, setTeamSizeLimit] = useState(competition.teamLimit);
  const [numParticipants, setNumParticipants] = useState(competition.numParticipants);
  const [competitionDesign, setCompetitionDesign] = useState("problems");
  const [prizePool, setPrizePool] = useState(competition.prizePool || [{rank : 1, lp : 0, pep : 0, coins : 0}]);

  const handleCompetitionTypeChange = (e) => {
    setCompetitionType(e.target.value);
    onChangeCompetitionType(e.target.value)
  };

  const handleTeamSizeLimitChange = (value) => {
    setTeamSizeLimit(value);
    onChangeTeamSizeLimit(value)
  };
  

  const handleNumParticipantsChange = (value) => {
    setNumParticipants(value);
    onChangeNumParticipants(value)
  };

 

  const handlePointsDistributionChange = (key, value) => {
    setPrizePool((prevState) => ({ ...prevState, [key]: value }));
  };

  function changePrizePool(pool)
  {
    setPrizePool(pool)
    onChangePrizepool(pool)
  }


  return (
    <form onSubmit={()=>{return false}}>
      
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 16 }}>Number of participants/teams:</span>
        <InputNumber
          min={1}
          max={10}
          value={numParticipants}
          onChange={handleNumParticipantsChange}
        />
      </div>
     
      
        
       
  <div style={{ marginBottom: 16 }}>
    <Checkbox.Group

    />
  </div>
  <Divider>Prize Pool</Divider>

    
    <center><PointsDistributionCreator pool={prizePool} onChange={changePrizePool}/></center>


</form>
);
};

export default CompetitionCreator2;
