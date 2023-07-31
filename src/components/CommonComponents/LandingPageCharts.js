import { PieChart } from '@mui/x-charts';
import { fetchEmployeesAssigned } from '../../service/apiService';
import { useEffect, useState, useContext } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Card } from '@mui/material';
import { TeamContext } from '../../context/TeamContext';

export default function LandingPageCharts() {
    const [employees, setEmployees] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('laptops');
    const [selectedTeamID, setSelectedTeamID] = useState('');
    const { teamIDs } = useContext(TeamContext);

    useEffect(() => {
        fetchEmployeesAssigned().then((result) => setEmployees(result));
    }, []);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleTeamIDChange = (event) => {
        setSelectedTeamID(event.target.value);
    };

    useEffect(() => {
        const filteredEmployees = employees.filter(
            selectedTeamID != 'All' ?
                ((employee) => (selectedTeamID ? employee.teamIDNo === selectedTeamID : true)) : (employeesWithoutSelectedOption)
        );

        const employeesWithSelectedOption = filteredEmployees.filter(
            (employee) => employee[selectedOption].length > 0
        );
        const employeesWithoutSelectedOption = filteredEmployees.filter(
            (employee) => employee[selectedOption].length === 0
        );

        const chartDataWithSelectedOption = [
            {
                id: 0,
                value: employeesWithSelectedOption.length,
                label: `Employees with ${selectedOption}`,
            },
            {
                id: 1,
                value: employeesWithoutSelectedOption.length,
                label: `Employees without ${selectedOption}`,
            },
        ];

        setChartData(chartDataWithSelectedOption);
    }, [employees, selectedOption, selectedTeamID]);

    return (
        <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'auto' }}>
            <h1>Charts</h1>
            <div >
                <FormControl variant='outlined'  sx={{ m: 5, width:300 }}>
                    <InputLabel id='chart-option-label' >Chart Option</InputLabel>
                    <Select
                        labelId='chart-option-label'
                        id='chart-option-select'
                        label="Chart Option" 
                        value={selectedOption}
                        onChange={handleOptionChange}
                        MenuProps={{
                            anchorOrigin: {
                              vertical: 'top',
                              horizontal: 'center',
                            }
                          }}
                    >
                        <MenuItem key={'laptops'} value="laptops">Laptops</MenuItem>
                        <MenuItem key={'devices'} value="devices">Devices</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 5, width:300 }} >
                    <InputLabel id="team-id-label" >Team ID</InputLabel>
                    <Select
                        label="Team ID"
                        labelId='team-id-label'
                        id="team-id-select"
                        value={selectedTeamID}
                        onChange={handleTeamIDChange}
                        MenuProps={{
                            anchorOrigin: {
                              vertical: 'top',
                              horizontal: 'center',
                            }
                          }}
                    >
                        <MenuItem key={'All'} value={''}>All</MenuItem>
                        {teamIDs.map((team) => (
                            <MenuItem key={team} value={team}>
                                {team}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', textAlign: 'left', width: '100%' }}>
                <PieChart
                    series={[{
                        data: chartData,
                        innerRadius: 50,
                        outerRadius: 98,
                        paddingAngle: 0,
                        cornerRadius: 4,
                    }]}
                    width={900}
                    height={500}

                />
            </div>
        </Card>
    );
}
