import React, { useState } from "react";
import { Button, Card, Divider, Input, InputNumber } from "antd";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import CompanySelector from "./CompanySelector";
import DomaineSelector from "./DomaineSelector";
import DatePicker from "./DatePicker";
import TagsCreator from "./TagsCreator";
import ImageUploader from "./ImageUploader";
import QuestionBank from "./QuestionBank";
import { Link } from "react-router-dom";
import ModuleList from "./ModuleList";

const LearningPathCreator2 = ({lp, onChangeModules,
  }) => {
 
  const [selectedModules, setSelectedModules] = useState(lp.modules);
 
  function changeSelectedModules(modules) {
    const modulesWithPoints = modules.map(module => {
        return { module: module, points: 3 };
      });
    setSelectedModules(modulesWithPoints);
    onChangeModules(modulesWithPoints)
  }

  
  const handlePointChange = (module, value) => {
    // Find the index of the problem in the selected problems array
    const index = selectedModules.findIndex(p => p.module === module);
  
    // If the problem is found, update its points value
    if (index >= 0) {
      const updatedModule = {
        ...selectedModules[index],
        points: value
      };
      const updatedModules = [      ...selectedModules.slice(0, index),      updatedModule,      ...selectedModules.slice(index + 1)    ];
      setSelectedModules(updatedModules);
      onChangeModules(updatedModules);
    }
  };
  
 
 


  
  const handleSubmit = (event) => {
    event.preventDefault();
  
  };

  return (
    <div style={{ display: "flex" }}>
            
            <div style={{ width: "60%" }}>
              <h3>Modules List (<Link to={`/modulecreator/` }>Create one here</Link>)</h3>
              <div style={{ height: "500px", overflowY: "scroll" }}>
                <ModuleList onChangeSelected={changeSelectedModules} />
              </div>
            </div>
            <div style={{ width: "40%" }}>
              <h3>Selected Modules</h3>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {selectedModules.map((module) => (
                  <Card key={module.module._id} style={{ margin: "10px" }}>
                    <h4>{module.module.name}</h4>
                
                    
                  </Card>
                ))}
              </div>
            </div>
          </div>
  );
};

export default LearningPathCreator2;