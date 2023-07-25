import React from 'react';

const Tags = ({ Tags , isEditable}) => {
    console.log("here")
  return (
    <div className="tags-container">
      {Tags.domaine && <div className="tag">{Tags.domaine}</div>}
      {Tags.company && <div className="tag">{Tags.company}</div>}
      {Tags.learning_points && <div className="tag">{` ${Tags.learning_points}`}</div>}
      {Tags.practice_points && <div className="tag">{`${Tags.practice_points}`}</div>}
      {Tags.coins && <div className="tag">{`C ${Tags.coins}`}</div>}
    </div>
  );
};

export default Tags;
