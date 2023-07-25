import {
  PieChartOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  SmileOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SearchOutlined,
  BellOutlined,
  UserAddOutlined,
  TrophyOutlined,
  NotificationOutlined,
  FlagOutlined,
  BookOutlined,
  CodeOutlined,
  ShopOutlined,
  DownOutlined,
  FolderAddOutlined,
  FileAddOutlined,

  ControlOutlined,
  SolutionOutlined,
  ScheduleOutlined,
  HeartOutlined,
  DashboardOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Avatar, Badge, Button, Card, Col, Drawer, Dropdown, FloatButton, Layout, Menu, Row, Tag, theme } from 'antd';
import { useEffect, useState } from 'react';



import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import JobOfferListPage from './JobOfferListPage';
import ProblemCreator from './ProblemCreator';
import LearningPath from './LearningPath';
import LearningPathCreationPage from './LearningPathCreationPage';
import LearningPathsPage from './LearningPathsPage';
import Module from './Module';
import QuestionCreator from './QuesionCreator';
import Auth from './Auth';
import Login from './login';
import AccountForm from './AccountForm';
import Dashboard from './Dashboard';
import ProblemList from './ProblemList';
import Problem from './Problem';
// import CompetitionCreator from './CompetitionCreator1';
// import CompetitionCreator1 from './CompetitionCreator1';
import CompetitionCreator from './CompetitionCreator';

import CompetitionCreator3 from './CompetitionCreator3';
import CompetitionCreator4 from './CompetitionCreator4';
import QuestionBank from './QuestionBank';
import CompetitionListAdmin from './CompetitonListAdmin';
import Schedule from './Schedule';
import Socket from './Socket';
import Competition from './Competition';
import Search from 'antd/es/transfer/search';
import Feed from './Feed';
import LearningPathsList from './LearningPathsList';
import Icon from '@ant-design/icons/lib/components/Icon';
const { Header, Sider, Content } = Layout;
const AnalystLayout = ({usern, getUsern}) => {
 const [currentRoute, setCurrentRoute] = useState('/')
  const [user, setUser] = useState(localStorage.getItem('user'))
  let [componentId, setComponentId] =useState('')
  let [component, setComponent] =useState()
  let [userComps, setUserComps] =useState([])
  const [badge, setBadge] = useState({
    count : userComps.length,
    color : 'blue'
  })
console.log(usern)
const [open, setOpen] = useState(false);
const showDrawer = () => {
  setOpen(true);
};
const onClose = () => {
  setOpen(false);
};
const handleMenuClick = (e) => {
  if (e.key === 'logout') {
    history('/login')
  }
};
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="logout" icon={<LogoutOutlined />}>
      Logout
    </Menu.Item>
  </Menu>
);
const [competitions, setCompetitions] = useState([]);
useEffect(() => {
  fetch('http://localhost:3000/competitions')
    .then((response) => response.json())
    .then((data) => {
      const activeCompetitions = data.filter((competition) => competition.competitionStatus === 'active');
      setCompetitions(activeCompetitions);
    })
    .catch((error) => {
      console.error('Error fetching competitions:', error);
    });
}, []);

  const {id} = useParams()
  const history = useNavigate()
  useEffect(() => {
    
      console.log(id)
        fetch(`http://localhost:3000/users/${id}`)
          .then(res => res.json())
          .then(data => {
              
              localStorage.setItem('user', JSON.stringify(data));
              setUser(data)
              setUserComps(data.competitions)
              setBadge({count : data.competitions.length, color : 'blue'})
          })
     
          setUser(localStorage.getItem('user'))
      },[usern]
          
          )
          function fetchComponent()
          {
              alert(componentId)
              fetch(`http://localhost:3000/problems/${componentId}`)
              .then(res => res.json())
              .then(data => {
              component = data
          })
     
          }
  // function history(route)
  // {
     
  //     setCurrentRoute(route);


  // }
  const renderComponent = () => {
      switch (currentRoute) {
        case '/dashboard/developer/joboffers':
          return <JobOfferListPage nav={history} user={user} />;
        case '/dashboard/developer/problemcreator':
          return <ProblemCreator nav={history} user={user} />;
        case '/competitioncreator':
          return <CompetitionCreator nav={history} user={user} />;
        case '/competitionlist':
          return <CompetitionListAdmin nav={history} user={user} />;
        case '/questionbank':
          return <QuestionBank nav={history} user={user} />;
        case '/problem':
          {
          return <Problem nav={history} prob={component} user={user} />;
          }
        case '/competition/:id':
          return <Competition nav={history} user={user} />;
        case '/schedule':
          return <Schedule nav={history} user={user} />;
        case '/problems':
          return <ProblemList nav={history} user={user} />;
        case '/learningpaths/:lp':
          return <LearningPath nav={history} user={user} />;
        case '/learningcreation':
          return <LearningPathCreationPage nav={history} user={user} />;
        case '/learningpaths':
          return <LearningPathsPage nav={history} user={user} />;
        case '/module':
          return <Module nav={history} user={user} />;
        case '/questioncreator':
          return <QuestionCreator nav={history} user={user} />;
        case '/code':
          return <Auth nav={history} user={user} />;
        case '/login':
          return <Login />;
        case '/accountform':
          return <AccountForm setUsers nav={history} user={user} />;
        case '/dashboard':
          return <Dashboard nav={history} user={user} />;
        default:
          return <Feed nav={history} />;
      }
    };

  const { SubMenu } = Menu;
  const [collapsed, setCollapsed] = useState(true);
  const [margin, setMargin] = useState(200)
  const [style, setStyle] = useState({
    marginTop: 60,
      marginLeft: 200
    });

  // useEffect(() => {
  //   setStyle({
  //     ...style,
      
  //     margin: collapsed ? '10px 16px' : '24px 16px',
     
      
  //   });
  // }, [collapsed]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <Layout>
     
       
     <Header
style={{
  position: 'fixed',
  zIndex: 2,
  top: 0,
  left: 0,
  paddingLeft: 0,
  paddingRight: 0,
  width: '100%',
  color: 'white',
}}
>
<Row align="middle">
  <Col span={4}>
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      
      <img  onClick={()=>history('/')} src="/arar.png" alt="logo" style={{ height: 40, marginLeft : 10 }} />
      
    </div>
  </Col>
  <Col span={10}>
    <Search
      placeholder="Search"
      allowClear
      enterButton={<Button icon={<SearchOutlined />} />}
      style={{ width: 100 }}
    />
  </Col>
  
  <Col span={8} style={{ textAlign: 'right' }}>
 
    <Button icon={<BellOutlined />} style={{ marginRight: 10 }} />

    <Avatar size="large" icon={<img src={user.avatar} />} />
    
      <Dropdown overlay={menu} placement="bottomRight">
        <span style={{ marginLeft: 10, cursor: 'pointer' }}>
          {user.username} <DownOutlined />
        </span>
      </Dropdown>
  </Col>
</Row>
</Header>
      
     
      <Content style={{}}>
    <Layout >

    <Sider
  trigger={null}
  collapsible
  collapsed={collapsed}
  onCollapse={() => {
    setStyle({
      padding: 24,
      minHeight: 550,
      background: colorBgContainer,
    });
  }}
  style={{
    overflow: 'auto', // Make the Sider scrollable
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 60,
    bottom: 0,
  }}
  breakpoint="lg"
  theme="dark"
>


  <div className="logo" />
  <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined  /> : <MenuFoldOutlined />}
            color='white'
            onClick={() =>{
              setMargin(160)
              console.log(margin)
              setCollapsed(!collapsed)} }
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
   <Menu
   style={{
   
   }}
  theme="dark"
  mode="inline"

  items={[
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () =>history(`profile`),
    },
   
     {
      key: '0',
      icon: <Icon component={ScheduleOutlined} />,
      label: 'Schedule',
      onClick: () =>history(`schedule`),
    },
    {
      key: '2',
      icon: <NotificationOutlined />,
      label: 'Feed',
      onClick: () =>history(""),
    },
    {
      key: '3',
      icon:  <LineChartOutlined />,
      label: 'Report Creator',
      onClick: () =>history(`reportcreator`),
    },
    {
      key: '5',
      icon:  <TrophyOutlined />,
      label: 'Competition List',
      onClick: () =>history(`competitionlist`),
    },
    {
      key: '4',
      icon: <FolderAddOutlined />,
      label: 'Learning Paths List',
      onClick : ()=>history('learningpaths')
      
    },
    
  
    
    
  ]}
/>
</Sider>







      <Layout style={collapsed? {marginTop: 60,
      marginLeft: 70,
      transition: "margin-left 0.3s ease-out"} : {marginTop: 60,
        marginLeft: 200,transition: "margin-left 0.3s ease-out"}}>
        
        <Layout theme="dark">
        <Content
        
          style={style}
        >
   
     
       
     <Outlet />
  
 
</Content>
      </Layout>
      
    </Layout>
    </Layout>
    </Content>
    </Layout>
  );
};
export default AnalystLayout;