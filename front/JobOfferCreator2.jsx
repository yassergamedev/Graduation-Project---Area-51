import React, { useEffect, useState } from "react";
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
import { Link, useParams } from "react-router-dom";
import ChallengeList from "./ChallengeList";


const JobOfferCreator2 = ({usern, onChangeChallenge,
}) => {
    const [user, setUser] = useState(usern)
    const {id} = useParams()
    
    useEffect(() => {
     fetch(`http://localhost:3000/users/${id}`)
       .then((res) => res.json())
       .then((data) => {
         setUser(data);
         localStorage.setItem('user', JSON.stringify(data));
       })
       .catch((error) => console.error(error));},[])
    const [selectedChallenge, setSelectedChallenge] = useState(null);

    function changeSelectedChallenge(challenge) {
        setSelectedChallenge(challenge._id);
        onChangeChallenge(challenge._id);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

    };

    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: "60%" }}>
                <h3>Challenges List (<Link to={`/challengecreator/`}>Create one here</Link>)</h3>
                <div style={{ height: "500px", overflowY: "scroll" }}>
                    <ChallengeList usern={user} onChangeSelected={changeSelectedChallenge} />
                </div>
            </div>


            <div style={{ width: "40%" }}>
                <h3>Selected Challenge</h3>
                {selectedChallenge ? (
                    <Card style={{ margin: "10px" }}>
                        <h4>{selectedChallenge.title}</h4>
                        {/* Render other challenge details */}
                    </Card>
                ) : (
                    <p>No challenge selected</p>
                )}
            </div>

        </div>
    );
};

export default JobOfferCreator2;