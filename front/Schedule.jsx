import { Badge, Calendar } from 'antd';
import { useEffect, useState } from 'react';
import { isAfter, isSameDay } from 'date-fns';

const Schedule = () => {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      const response = await fetch('http://localhost:3000/competitions');
      const data = await response.json();
      const activeCompetitions = data.filter((competition) => competition.competitionStatus === 'active');
      setCompetitions(activeCompetitions);
   
    };

    fetchCompetitions();
  }, []);

  const getListData = (value) => {
    const listData = [];
    competitions.forEach((competition) => {
        const datee = new Date(value)
      const beginDate = new Date(competition.date[0]);
      const endDate = new Date(competition.date[1]);

      if (isAfter(datee, beginDate) && isSameDay(datee, endDate) || isSameDay(datee, beginDate)) {
        console.log("enter")
        listData.push({
          type: 'success',
          content: competition.title,
        });
      }
      
    });

    return listData;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default Schedule;
