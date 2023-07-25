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
  } from '@ant-design/icons';
  import { Outlet, useNavigate, useParams } from 'react-router-dom';
  import { Avatar, Badge, Button, Card, Col, Drawer, Dropdown, FloatButton, Layout, Menu, Row, Tag, Tour, theme } from 'antd';
  import { useEffect, useRef, useState } from 'react';



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
  const { Header, Sider, Content, } = Layout;
  const DeveloperLayout = ({usern, getUsern, newUser}) => {
    const [openT, setOpenT] = useState(newUser);

   const [currentRoute, setCurrentRoute] = useState('/')
    const [user, setUser] = useState(localStorage.getItem('user'))
    let [componentId, setComponentId] =useState('')
    let [component, setComponent] =useState()
    let [userComps, setUserComps] =useState([])
    const [badge, setBadge] = useState({
      count : userComps.length,
      color : 'blue'
    })


 
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const [open, setOpen] = useState(newUser);
  const showDrawer = () => {
    setOpen(true);
  };


  const steps = [
    {
      title: 'Feed',
      description: 'This is the Feed where announcements and news are.',
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
    },
   
    {
      title: 'Apply to Competitions',
      description: 'This is where you can apply to competitions.',
      target: () => ref4.current,
    },
    {
      title: 'Participate in Learning Paths',
      description: 'This is where you can participate in learning paths.',
      target: () => ref5.current,
    },
    {
      title: 'Apply to Job Offers',
      description: 'This is where you can apply to job offers.',
      target: () => ref6.current,
    },
  ];
  
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
    const fetchCompetitions = async () => {
      try {
        const fetchedCompetitions = [];
        for (const competition of user.competitions) {
          const response = await fetch(`http://localhost:3000/competitions/${competition}`);
          if (response.ok) {
            const competitionData = await response.json();
            fetchedCompetitions.push(competitionData);
          } else {
            console.error(`Error fetching competition: ${competition}`);
          }
        }
        setCompetitions(fetchedCompetitions);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };
  
    fetchCompetitions();
  }, [user, competitions]);
  

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
    <span style={{ marginLeft: 10 }}>
        <Tag color='blue'><span style={{ marginRight: 5 }}>{user.learning_points}</span></Tag>
      
      </span>
      <span style={{ marginLeft: 10 }}>
      <Tag color='green'><span style={{ marginRight: 5 }}>{user.practise_points}</span></Tag>
        
      </span>
      <span style={{ marginLeft: 10 }}>
      <Tag color='orange'><span style={{ marginRight: 5 }}>{user.coins}</span></Tag>
        
      </span>
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
    defaultSelectedKeys={['1']}>
    <Menu.Item
    key="1"
    icon={<UserOutlined />}
    label="Profile"
    ref={ref1}
    onClick={() => history('profile')}
  >
    Profile
  </Menu.Item>
  <Menu.Item
    key="2"
    icon={<NotificationOutlined />}
    label="Feed"
    ref={ref2}
    onClick={() => history('')}
  >
    Feed
  </Menu.Item>
  <Menu.Item
    key="3"
    icon={<BookOutlined />}
    label="Learning Path list"
    ref={ref3}
    onClick={() => history('learningpaths')}
  >
    Learning Path list
  </Menu.Item>
  <Menu.Item
    key="4"
    icon={<CodeOutlined />}
    label="Practise Section"
    ref={ref4}
    onClick={() => history('problems')}
  >
    Practise Section
  </Menu.Item>
  <Menu.Item
    key="5"
    icon={<FlagOutlined />}
    label="Competition List"
    ref={ref5}
    onClick={() => history('complist')}
  >
    Competition List
  </Menu.Item>
  <Menu.Item
    key="6"
    icon={<ShopOutlined />}
    label="Job Market"
    ref={ref6}
    onClick={() => history('joboffers')}
  >
    Job Market
  </Menu.Item>
  <Menu.Item
    key="7"
    icon={<TrophyOutlined />}
    label="Leaderboard"
    onClick={() => history('leaderboard')}
  >
    Leaderboard
  </Menu.Item>
  {/* ... */}
  
  </Menu>
  </Sider>
  
  
  
  
  
  
  
        <Layout style={collapsed? {marginTop: 60,
        marginLeft: 70,
        transition: "margin-left 0.3s ease-out"} : {marginTop: 60,
          marginLeft: 200,transition: "margin-left 0.3s ease-out"}}>
          
          <Layout theme='dark'>
          <Content
          
            style={style}
          >
     
       
         
       <Outlet />
    
       <FloatButton badge={badge} onClick={showDrawer}>
 
</FloatButton>
      
       
       <Drawer title="My Competitions" placement="right" onClose={onClose} visible={open}>
  {competitions.map((competition) => {
    const startDate = new Date(competition.date[0]); // Assuming the start date is the first element of the date array

    // Calculate the time remaining until the start date
    const now = new Date();
    const timeRemaining = startDate.getTime() - now.getTime();
    const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return (
      <Link to={`competition/${competition._id}`}>
      <Card key={competition._id}>
  <img src={competition.image} alt="Competition" style={{ width: '100px', height: '100px' }} />
  <h3>{competition.title}</h3>
  <p>Starts in: {daysRemaining}d {hoursRemaining}h {minutesRemaining}m {secondsRemaining}s</p>
</Card></Link>
    );
  })}
</Drawer>
{/* <Tour open={openT} onClose={() => setOpenT(false)} steps={steps} /> */}
</Content>
        </Layout>
        
      </Layout>
      </Layout>
      </Content>
      </Layout>
    );
  };
  export default DeveloperLayout;