import { useState, useEffect } from 'react';
import './styles/ModuleCreationPage.css';
import { trusted } from 'mongoose';
import QuestionCreator from './QuesionCreator';
function ModuleCreationPage({onModuleCreate}) {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [moduleName, setModuleName] = useState('');
    const [moduleContent, setModuleContent] = useState('');
    const [learningPoints, setLearningPoints] = useState(0);
    const [showQuestionCreator, setShowQuestionCreator] = useState(false)
    useEffect(() => {
        fetch('http://localhost:3000/questions')
            .then(res => res.json())
            .then(data => setQuestions(data))
            .catch(error => console.error(error));
    }, []);

    const handleQuestionSelect = (questionId) => {
        const selectedQuestion = questions.find(question => question._id === questionId);
        setSelectedQuestions([...selectedQuestions, selectedQuestion]);
    };

    const handleQuestionDeselect = (questionId) => {
        const updatedQuestions = selectedQuestions.filter(question => question._id !== questionId);
        setSelectedQuestions(updatedQuestions);
    };

    function addQuestion(question)
    {
        setSelectedQuestions([...selectedQuestions, question]);
    }

    const handleModuleNameChange = (event) => {
        setModuleName(event.target.value);
    };
    const handleLearningPointsChange = (event) =>{
        setLearningPoints(event.target.value);
    }
    const handleModuleContentChange = (event) => {
        setModuleContent(event.target.value);
    };
    const updateSelectedQuestions = (selectedOptions) => {
        const selectedQuestionIds = Array.from(selectedOptions, option => option.value);
        const updatedQuestions = selectedQuestions.filter(question => selectedQuestionIds.includes(question._id));
        setSelectedQuestions(updatedQuestions);
      };
      const handleShowQuestion = (event)=>{
        event.preventDefault()
        setShowQuestionCreator(true)
      }
      
   const gege = (event) =>{
    event.preventDefault();
    console.log("crazy stuff")
   }

      const saveQuestion = (event, question)=>{
        event.preventDefault()
        console.log(question)
        fetch('http://localhost:3000/questions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(question),
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
      
        const moduleData = {
            name: moduleName,
            content: moduleContent,
            learningPoints: learningPoints,
            questions: selectedQuestions,
        };
        onModuleCreate( moduleData);
    };
    
    return (
        <div className="module-creation-page">
            <form onSubmit={()=> {return false}}>
                <label htmlFor="moduleName">Module Name:</label>
                <input type="text" id="moduleName" value={moduleName} onChange={handleModuleNameChange} />

                <label htmlFor="learningPoints">Learning Points:</label>
                <input type="number" id="learningPoints" value={learningPoints} onChange={handleLearningPointsChange} />


                <label htmlFor="moduleContent">Module Content:</label>
                <textarea id="moduleContent" value={moduleContent} onChange={handleModuleContentChange} />

                <h3>Select Questions:</h3>
                <ol>
                    {selectedQuestions.map((question, index) => (
                        <li key={index}>
                            {question.questionText} ({question.learning_points} LP)
                            <button onClick={(event)=> saveQuestion(event,question)}>Save</button>
                        </li>
                    ))}
                </ol>
                <select
                    multiple={true}
                    value={selectedQuestions.map(question => question._id)}
                    onChange={(event) => {
                        const selectedQuestionIds = Array.from(event.target.selectedOptions, option => option.value);
                        const selectedQuestions = questions.filter(question => selectedQuestionIds.includes(question._id));
                        setSelectedQuestions(selectedQuestions);
                    }}
                    onBlur={(event) => {
                        updateSelectedQuestions(event.target.selectedOptions);
                    }}
                >
                    {questions.map(question => (
                        <option key={question._id} value={question._id}>{question.questionText}</option>
                    ))}
                </select>
                <button onClick={handleShowQuestion}>Create a question</button>
                {showQuestionCreator && <QuestionCreator onCreate={addQuestion}/>}

                <button type='submit' onClick={handleSubmit}>Create Module</button>
            </form>
        </div>
    );
}

export default ModuleCreationPage;
