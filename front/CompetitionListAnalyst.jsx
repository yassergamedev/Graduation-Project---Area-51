import React, { useEffect, useState, useCallback } from 'react';
import { Card, Col, Drawer, Row, Skeleton, Tag } from 'antd';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useParams } from 'react-router-dom';
import { useCurrentPng } from 'recharts-to-png';
import FileSaver from 'file-saver';

const { Meta } = Card;

const CompetitionListAnalyst = ({ usern }) => {
    const [user, setUser] = useState(usern);
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:3000/users/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
            })
            .catch((error) => console.error(error));
    }, [usern]);

    const [loading, setLoading] = useState(true);
    const [competitions, setCompetitions] = useState([]);
    const [selectedCompetition, setSelectedCompetition] = useState(null);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [getPng1, { ref: chartRef1, isLoading: isLoading1 }] = useCurrentPng();
    const [getPng2, { ref: chartRef2, isLoading: isLoading2 }] = useCurrentPng();
    const colors = ['#8884d8', '#82ca9d', '#ffc658']; // Define an array of colors

    const showDrawer = (competition) => {
        setSelectedCompetition(competition);
        setIsDrawerVisible(true);
    };
    const dataCOMP = [
        { name: "coins", coins: selectedCompetition?.coins || 0 },
        { name: "practise Points", practicePoints: selectedCompetition?.practisePoints || 0 },
        { name: "learning Points", learningPoints: selectedCompetition?.learningPoints || 0 }
      ];
      
    const handleExport1 = useCallback(async () => {
        try {
            const chartImage = await getPng1(chartRef1);
            if (chartImage) {
                FileSaver.saveAs(chartImage, 'chart1.png');
            }
        } catch (error) {
            console.error('Error exporting chart:', error);
        }
    }, [getPng1, chartRef1]);

    const handleExport2 = useCallback(async () => {
        try {
            const chartImage = await getPng2(chartRef2);
            if (chartImage) {
                FileSaver.saveAs(chartImage, 'chart2.png');
            }
        } catch (error) {
            console.error('Error exporting chart:', error);
        }
    }, [getPng2, chartRef2]);

    const closeDrawer = () => {
        setSelectedCompetition(null);
        setIsDrawerVisible(false);
    };

    const downloadChart1 = useCallback(async () => {
        try {
            const chartRef = document.getElementById('chart1');
            const chartImage = await getPng1(chartRef);
            if (chartImage) {
                FileSaver.saveAs(chartImage, 'chart1.png');
            }
        } catch (error) {
            console.error('Error downloading chart:', error);
        }
    }, [getPng1]);

    const downloadChart2 = useCallback(async () => {
        try {
            const chartRef = document.getElementById('chart2');
            const chartImage = await getPng2(chartRef);
            if (chartImage) {
                FileSaver.saveAs(chartImage, 'chart2.png');
            }
        } catch (error) {
            console.error('Error downloading chart:', error);
        }
    }, [getPng2]);

    useEffect(() => {
        fetch('http://localhost:3000/competitions')
            .then((response) => response.json())
            .then((data) => {
                const activeCompetitions = data.filter((competition) => competition.competitionStatus === 'active');
                setCompetitions(activeCompetitions);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching competitions:', error);
            });
    }, []);

    return (
        <>
            <Row gutter={[16, 16]}>
                {competitions.map((competition) => (
                    <Col key={competition._id} span={12} lg={8}>
                        <Card
                            style={{
                                marginTop: 16,
                            }}
                            cover={
                                <img
                                    style={{
                                        height: '200px',
                                        objectFit: 'cover',
                                    }}
                                    alt="example"
                                    src={competition.image}
                                />
                            }
                        >
                            <Skeleton loading={loading} avatar active>
                                <Meta
                                    title={competition.title}
                                    description={   <div dangerouslySetInnerHTML={{ __html: selectedCompetition?.description || ''}}></div>
                                }
                                    style={{ marginBottom: 14 }}
                                ></Meta>
                                <div>
                                    Domains:
                                    {competition.domains.slice(1).map((domain) => (
                                        <Tag key={domain} color="blue">
                                            {domain}
                                        </Tag>
                                    ))}
                                </div>
                                <div>
                                    Preferred Date:{' '}
                                    <>
                                        {/* Render preferred date */}
                                        {/* ... */}
                                    </>
                                </div>
                                Date:{' '}
                                {competition.date != null ? (
                                    <>
                                        <Tag color="purple">{competition.date[0]}</Tag>
                                        <Tag color="purple">{competition.date[1]}</Tag>
                                    </>
                                ) : (
                                    <>
                                        <Tag color="purple">Pending</Tag>
                                        <Tag color="purple">Pending</Tag>
                                    </>
                                )}
                                <div>
                                    Coins:<Tag color="orange"> {competition.coins}</Tag>{' '}
                                </div>
                                <div>
                                    Status:
                                    <Tag color={competition.competitionStatus === 'pending' ? 'red' : 'green'}>
                                        {' '}
                                        {competition.competitionStatus}
                                    </Tag>{' '}
                                </div>
                                <button onClick={() => showDrawer(competition)}>View Analytics</button>
                            </Skeleton>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Drawer title="Competition Analytics" placement="right" closable={true} onClose={closeDrawer} visible={isDrawerVisible} width={800}>
                {selectedCompetition && (
                    <>
                        <h3>Analytics</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>

                                <PieChart width={400} height={300} ref={chartRef1}>
                                    <Pie
                                        data={[
                                            { name: 'Problems', value: selectedCompetition.problems.length },
                                            { name: 'Questions', value: selectedCompetition.questions.length },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        label
                                    >
                                        <Cell key="problems" fill="#82ca9d" />
                                        <Cell key="questions" fill="#8884d8" />
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>

                                <button onClick={handleExport1}>Download Chart 1</button>
                            </div>
                            <div>

                                <BarChart id="chart2" width={400} height={300} data={dataCOMP} ref={chartRef2}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="coins" fill={colors[0]} />
                                    <Bar dataKey="learningPoints" fill={colors[1]} />
                                    <Bar dataKey="practicePoints" fill={colors[2]} />
                                </BarChart>

                                <button onClick={handleExport2}>Download Chart 2</button>
                            </div>
                        </div>

                    </>
                )}
            </Drawer>
        </>
    );
};

export default CompetitionListAnalyst;
