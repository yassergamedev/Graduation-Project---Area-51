import React, { useState, useEffect } from "react";
import ModuleCreationPage from "./ModuleCreationPage";
import FormInput from "./FormInput";
import "./styles/LearningPathCreationPage.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Module from "./Module";
const FormData = require('form-data')

const LearningPathCreationPage = ({ moduleslist }) => {
    const [title, setTitle] = useState("");
    const [buttonTitle, setButtonTitle] = useState("Add Module")
    const [learningPoints, setLearningPoints] = useState("");
    const [description, setDescription] = useState("");
    const [modules, setModules] = useState([]);
    const [showModuleCreationPage, setShowModuleCreationPage] = useState(false);
    const [selectedModules, setSelectedModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/modules')
            .then(res => res.json())
            .then(data => setModules(data))
            .catch(error => console.error(error));
    }, []);
    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleLearningPointsChange = (event) => {
        setLearningPoints(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleModuleChange = (event, index) => {
        const { name, value } = event.target;
        setModules((prevModules) => {
            const updatedModules = [...prevModules];
            updatedModules[index][name] = value;
            return updatedModules;
        });


    };

    function handleModuleCreation( moduleData){
        setSelectedModules(prevSelectedModules => [...prevSelectedModules, moduleData]);
        setShowModuleCreationPage(!showModuleCreationPage);
    };
    function removeLpFromModuleName(moduleName) {
        const lpIndex = moduleName.indexOf(' LP');
        if (lpIndex !== -1) {
          const openParenIndex = moduleName.lastIndexOf('(', lpIndex);
          if (openParenIndex !== -1) {
            return moduleName.substring(0, openParenIndex).trim();
          }
        }
        return moduleName;
      }
      

    const handleModuleAddition = (event, module)=>{
        setSelectedModules(prevSelectedModules => [...prevSelectedModules, module]);
    }
    const handleModuleSelect = (event) => {
       
        const moduleId = removeLpFromModuleName(event.target.value);
        const selectedModule = moduleslist.find((module) => module.name === moduleId);
        console.log(selectedModule.name)
        setSelectedModules((prevSelectedModules) => [...prevSelectedModules, selectedModule]);    
    };
    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };


    const quillFormats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "link",
        "image",
        "video",
        "color"
    ];



    const handleAddModule = (event, newModule) => {
        event.preventDefault()
        setShowModuleCreationPage(!showModuleCreationPage);
        setButtonTitle(showModuleCreationPage ? "Add Module" : "Hide Form");
    };

   

    const handleFormSubmit = (event) => {
        event.preventDefault()
        selectedModules.forEach((module) => {
            console.log(module.name)
            if (!modules.find((m) => m.name === module.name)) {
                const moduleData = {
                    name: module.name,
                    content: module.content,
                    learningPoints: module.learningPoints,
                    questions: module.selectedQuestions,
                };
        
                fetch('http://localhost:3000/modules', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(moduleData),
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
            }
        });
        


    
            fetch('http://localhost:3000/modules')
                .then(res => res.json())
                .then(data => setSelectedModules(data))
                .catch(error => console.error(error));
        
    
    const selectedModIds = [];
    selectedModules.forEach((module)=>{
        selectedModIds.push(module._id)
    })

    console.log(image)



    // const reader = new FileReader();
    // reader.readAsArrayBuffer(image);
    // const buffer = Buffer.from(reader.result);
        const lpData = {
            name: title,
            //image : buffer,
            learning_points: learningPoints,
            description: description,
            learningPoints: learningPoints,
            modules: selectedModIds,
        };
        fetch('http://localhost:3000/learning-paths', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lpData),
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }



    return (
        <div className="learning-path-container">
            <form onSubmit={handleFormSubmit}>
                <FormInput label="Title" name="title" type="text" value={title} handleChange={handleTitleChange} />
                <FormInput label="Learning Points" name="learningPoints" type="number" value={learningPoints} handleChange={handleLearningPointsChange} />
                <label htmlFor="learningPathImage">Image:</label>
                <input type="file" id="learningPathImage" name="image" accept="image/*" onChange={handleImageChange} />


                <label htmlFor="learningPathDescription">Description:</label>
                <ReactQuill
                    value={description}
                    onChange={setDescription}
                    modules={quillModules}
                    formats={quillFormats}
                />

                <h2>Modules:</h2>
                <ol>
                    {selectedModules.map((module, index) => (
                        <li key={index}>
                            {module.name} ({module.learningPoints} LP)
                        </li>
                    ))}
                </ol>
                <select onChange={handleModuleSelect}>
                    <option value="">-- Select Module --</option>
                    {moduleslist.map((module) => (
                        <option  key={module.id} value={module.id}>
                            {module.name} ({module.learningPoints} LP )
                        </option>
                    ))}
                </select>
                {/* {modules.map((module, index) => (
                    <div key={index}>
                        <label htmlFor={`moduleName-${index}`}>Name:</label>
                        <input
                            type="text"
                            id={`moduleName-${index}`}
                            name="name"
                            value={module?.name}
                            onChange={(event) => handleModuleChange(event, index)}
                        />

                        <label htmlFor={`moduleLearningPoints-${index}`}>
                            Learning Points:
                        </label>
                        <input
                            type="number"
                            id={`moduleLearningPoints-${index}`}
                            name="learningPoints"
                            value={module?.learningPoints}
                            onChange={(event) => handleModuleChange(event, index)}
                        />
                    </div>
                ))} */}
                <button onClick={handleAddModule}>{buttonTitle}</button>
                {showModuleCreationPage && (
                    <ModuleCreationPage onModuleCreate={handleModuleCreation} />
                )}
                <button type="submit">Post Learning Path</button>
            </form>
            
        </div>
    );
};

export default LearningPathCreationPage;
