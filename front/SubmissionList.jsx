import { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { useParams } from 'react-router-dom';


const { Panel } = Collapse;

const SubmissionList = ({ usern, pid }) => {
  const [submissions, setSubmissions] = useState([]);
 let h = new Date()


 const [user, setUser] = useState(usern)
 const {id} = useParams()


 


  useEffect(() => {
    const fetchSubmissions = async () => {
      const response = await fetch(`http://localhost:3000/submissions/user/${id}/problem/${pid}`);
      const data = await response.json();
      setSubmissions(data);
    };
    
    fetchSubmissions();
  }, [id]);

  const panelHeaderStyle = (evaluation) => {
    if (evaluation === 'PASS') {
      return {
        backgroundColor: '#ccffcc',
        color: 'white',
      };
    } else {
      return {
        backgroundColor: '#ffcccc',
        color: 'white',
      };
    }
  };
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

  
  return (
    <Collapse>
   
      {submissions.map((submission) => (
        <Panel
        style={panelHeaderStyle(submission.evaluation)}
          header={
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div >{submission.evaluation}</div>
              <div>{new Date(submission.date).toLocaleString('en-US', options)}</div>
              
            </div>
          }
          key={submission._id}
        >
          <pre>{submission.solutionDev}</pre>
        </Panel>
      ))}
    </Collapse>
  );
};

export default SubmissionList;