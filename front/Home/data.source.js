import { Space } from 'antd';
import React from 'react';
import {Typography} from 'antd'
import { useNavigate } from 'react-router-dom';
import arar from '../pics/arar.png';
import condor from '../pics/condor.webp';
import code from '../pics/code.png';
import djez from '../pics/djez.png';
import dp from '../pics/dp.png';
import dsa from '../pics/dsa.png';
import mobilis from '../pics/mobilis.png';
import moh from '../pics/moh.jpg';
import oued from '../pics/oued.png';
import prob from '../pics/prob.png';
import sonatrach from '../pics/sonatrach.png';
import tel from '../pics/tel.webp';
import yass from '../pics/yass.png';
import yasser from '../pics/yasser.jpg';
import arr from '../pics/arr.png';
import oor from '../pics/oor.jpg';
import aya from '../pics/aya.jpg';


const { Text,Title } = Typography;


export const Nav00DataSource = {
 
  wrapper: { className: 'header0 home-page-wrapper' },
  page: { className: 'home-page' },
  logo: {
    href : "/",
    className: 'header0-logo',
    children: arar,
  },
  Menu: {
    className: 'header0-menu',
    children: [
      {
        name: 'item0',
        className: 'header0-item',
        children: {
          href :'/login',
          children: [
            {
              children: (
                <span>
                  <Text style={{color : 'white'}}>Login</Text>
                </span>
              ),
              name: 'text',
            },
          ],
        },
       
      },
      {
        name: 'item1',
        className: 'header0-item',
        children: {
          href: '/register',
          children: [
            {
              children: (
                <span>
                  <Text style={{color : 'white'}}>Sign Up</Text>
                </span>
              ),
              name: 'text',
            },
          ],
        },
      },
    
      
    ],
  },
  mobileMenu: { className: 'header0-mobile-menu' },
};
export const Banner00DataSource = {
  wrapper: { className: 'banner0' },
  textWrapper: { className: 'banner0-text-wrapper' },
  title: {
    className: 'banner0-title',
    children:
    
   <img src={arr} />
  },
  content: {
    className: 'banner0-content',
    children: (
      <span>
        <Text style={{color : "white"}}>Your Path for A Tech Job Starts Here</Text>
      </span>
    ),
  },
  button: { className: 'banner0-button', children: 'Learn More' },
};
export const Content00DataSource = {
  wrapper: { className: 'home-page-wrapper content0-wrapper' },
  page: { className: 'home-page content0 li38dfebjo-editor_css' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: (
          <span>
            <Title>Discover Multiple Learning Paths</Title>
          </span>
        ),
      },
    ],
  },
  childWrapper: {
    className: 'content0-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon',
              children:<img src={dp} />
            },
            {
              name: 'title',
              className: 'content0-block-title',
              children: (
                <span>
                  <Text>Start Dynamic Programming</Text>
                </span>
              ),
            },
            {
              name: 'content',
              children: (
                <span>
                  <Text>
                    Introduction to Dp, Techniques, and many more Modules to
                    discover..
                  </Text>
                </span>
              ),
            },
          ],
        },
      },
      {
        name: 'block1',
        className: 'content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon',
              children:
              
              <img src={dsa} /> },
            {
              name: 'title',
              className: 'content0-block-title',
              children: (
                <span>
                  <Text>Start Data Structures and Algorithms</Text>
                </span>
              ),
            },
            {
              name: 'content',
              children: (
                <span>
                  <Text>Variables, Arrays..etc</Text>
                </span>
              ),
            },
          ],
        },
      },
      {
        name: 'block2',
        className: 'content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon',
              children:
              <img src={prob} />   },
            {
              name: 'title',
              className: 'content0-block-title',
              children: (
                <span>
                  <Text>Start Problem Solving</Text>
                </span>
              ),
            },
            {
              name: 'content',
              children: (
                <span>
                  <Text>Divide and Conquer, Slow Partitioning...etc</Text>
                </span>
              ),
            },
          ],
        },
      },
    ],
  },
};
export const Content10DataSource = {
  wrapper: { className: 'home-page-wrapper content1-wrapper' },
  OverPack: {
    className: 'home-page content1 li38fmrumw-editor_css',
    playScale: 0.3,
  },
  imgWrapper: { className: 'content1-img', md: 10, xs: 24 },
  img: {
    children:code,
    className: 'li36xa0zk9-editor_css',
  },
  textWrapper: {
    className: 'content1-text li38cw13nzh-editor_css',
    md: 14,
    xs: 24,
  },
  title: {
    className: 'content1-title li38igse3zn-editor_css',
    children: (
      <span>
        <span>
          <Title style={{color : 'white'}}>Practise Your Coding Skills</Title>
        </span>
      </span>
    ),
  },
  content: {
    className: 'content1-content li38kbzet8d-editor_css',
    children: (
      <span>
        <span>
          <span>
            <span>
              <Text style={{color :'white'}}>
                Area51 provides a javascript Coding environement with Hundreds
                of Coding Problems to Choose and Work on
              </Text>
            </span>
          </span>
        </span>
      </span>
    ),
  },
};
export const Content40DataSource = {
  wrapper: { className: 'home-page-wrapper content4-wrapper' },
  page: { className: 'home-page content4 li38auujynl-editor_css' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: (
          <span>
            <span>
              <span>
                <span>
                  <span>
                    <Title style={{color:"black"}}>
                      Participate and Test Your skills in Competitions&nbsp;
                      </Title>
                  </span>
                </span>
              </span>
            </span>
          </span>
        ),
        className: 'title-h1 li389frykr-editor_css',
      },
      {
        name: 'content',
        className: 'title-content content4-title-content',
        children: (
          <span>
            <Text >Earn Points and Rank up in the leaderboard</Text>
          </span>
        ),
      },
    ],
  },
  video: {
    className: 'content4-video',
    children: {
      video: 'https://i.ibb.co/mbpgT3y/kk.gif',
      image: 'https://i.ibb.co/mbpgT3y/kk.gif',
    },
  },
};
export const Content50DataSource = {
  wrapper: { className: 'home-page-wrapper content5-wrapper' },
  page: { className: 'home-page content5 li3nbvzrnx9-editor_css' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: (
          <span>
            <Title style={{color : 'white'}}>Apply To Job Offers and Get Hired&nbsp;</Title>
          </span>
        ),
        className: 'title-h1 li3naap2ymn-editor_css',
      },
      {
        name: 'content',
        className: 'title-content li3nasvqevd-editor_css',
        children: (
          <span>
            <span>
              <Text style={{color : 'white'}}>
                Participate in job offer competitions and get noticed by Company
                Recruiters
              </Text>
            </span>
          </span>
        ),
      },
    ],
  },
  block: {
    className: 'content5-img-wrapper',
    gutter: 16,
    children: [
      {
        name: 'block0',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: { children: sonatrach },
          content: {
            children: (
              <span>
                <Text>Sonatrach</Text>
              </span>
            ),
          },
        },
      },
      {
        name: 'block1',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
          oued   },
          content: {
            children: (
              <span>
                <Text>Oued Kniss</Text>
              </span>
            ),
          },
        },
      },
      {
        name: 'block2',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
          yass   },
          content: {
            children: (
              <span>
                <Text>Yassir</Text>
              </span>
            ),
          },
        },
      },
      {
        name: 'block3',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
            djez   },
          content: {
            children: (
              <span>
                <Text>Djezzy</Text>
              </span>
            ),
          },
        },
      },
      {
        name: 'block4',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
            tel },
          content: {
            children: (
              <span>
                <Text>Algerie Telecome</Text>
              </span>
            ),
          },
        },
      },
      {
        name: 'block5',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
            oor   },
          content: {
            children: (
              <span>
                <Text>Ooredoo</Text>
              </span>
            ),
          },
        },
      },
      {
        name: 'block6',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
            mobilis  },
          content: {
            children: (
              <span>
                <Text>Mobilis</Text>
              </span>
            ),
          },
        },
      },
      {
        name: 'block7',
        className: 'block',
        md: 6,
        xs: 24,
        children: {
          wrapper: { className: 'content5-block-content' },
          img: {
            children:
            condor  },
          content: {
            children: (
              <span>
                <Text>Condor</Text>
              </span>
            ),
          },
        },
      },
    ],
  },
};
export const Teams10DataSource = {
  wrapper: { className: 'home-page-wrapper teams1-wrapper' },
  page: { className: 'home-page teams1' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: (
          <span>
            <span>
              <Title>About Us</Title>
            </span>
          </span>
        ),
      },
    ],
  },
  block: {
    className: 'block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'block',
        md: 8,
        xs: 24,
        titleWrapper: {
          children: [
            {
              name: 'image',
              className: 'teams1-image',
              children: <img src={moh} />,
            },
            {
              name: 'title',
              className: 'teams1-title',
              children: (
                <span>
                  <span>
                    <span>
                      <span>
                        <span>
                          <Text>Mohammed&nbsp;👽</Text>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              ),
            },
            {
              name: 'content',
              className: 'teams1-job',
              children: (
                <span>
                  <Text>Front-End Developer&nbsp;</Text>
                </span>
              ),
            },
            {
              name: 'content1',
              className: 'teams1-content',
              children: (
                <span>
                  <span>
                    <Text>
                      Mohammed is our front end developer, he has experience in
                      react and css and html, he made the design of the site, he
                      identifies as an alien
                    </Text>
                  </span>
                </span>
              ),
            },
          ],
        },
      },
      {
        name: 'block1',
        className: 'block',
        md: 8,
        xs: 24,
        titleWrapper: {
          children: [
            {
              name: 'image',
              className: 'teams1-image',
              children: <img src={yasser} />,
            },
            {
              name: 'title',
              className: 'teams1-title',
              children: (
                <span>
                  <span>
                    <span>
                      <span>
                        <Text>Yasser 🐐</Text>
                      </span>
                    </span>
                  </span>
                </span>
              ),
            },
            {
              name: 'content',
              className: 'teams1-job',
              children: (
                <span>
                  <Text>Back-End Developer</Text>
                </span>
              ),
            },
            {
              name: 'content1',
              className: 'teams1-content',
              children: (
                <span>
                  <Text>
                    Yasser knows a bit about server side developement, the
                    gamification system was done by him, he enjoys lifting
                    weight
                  </Text>
                </span>
              ),
            },
          ],
        },
      },
      {
        name: 'block2',
        className: 'block',
        md: 8,
        xs: 24,
        titleWrapper: {
          children: [
            {
              name: 'image',
              className: 'teams1-image',
              children: <img src={aya} />,
            },
            {
              name: 'title',
              className: 'teams1-title',
              children: (
                <span>
                  <span>
                    <Text>Aya 🐯</Text>
                  </span>
                </span>
              ),
            },
            {
              name: 'content',
              className: 'teams1-job',
              children: (
                <span>
                  <Text>Database Designer</Text>
                </span>
              ),
            },
            {
              name: 'content1',
              className: 'teams1-content',
              children: (
                <span>
                  <Text>
                    Aya is a data expert, she helped design the database schema,
                    and she loves dogs
                  </Text>
                </span>
              ),
            },
          ],
        },
      },
    ],
  },
};
export const Footer00DataSource = {
  wrapper: { className: 'home-page-wrapper footer0-wrapper' },
  OverPack: { className: 'home-page footer0', playScale: 0.05 },
  copyright: {
    className: 'copyright',
    children: (
      <span>
        <span>
          <span>
            <span>
              ©2023&nbsp;<a href="https://motion.ant.design">Area 51 </a>&nbsp;All
              Rights Reserved&nbsp;
            </span>
          </span>
        </span>Made with ❤ by Team 7
      </span>
    ),
  },
};
