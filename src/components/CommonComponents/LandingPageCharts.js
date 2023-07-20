import { PieChart } from '@mui/x-charts';
import { fetchEmployeesAssigned } from '../../service/apiService';
import { useEffect, useState, useContext } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select, Card } from '@mui/material';
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
            <form style={{ display: 'flex', flexDirection: 'row', width: '60%' }}>
                <FormControl fullWidth>
                    <InputLabel id="chart-option-label" >Chart Option</InputLabel>
                    <Select
                        label='Chart Option'
                        id='chart-option-select'
                        value={selectedOption}
                        onChange={handleOptionChange}
                        fullWidth
                        MenuProps={{
                            anchorOrigin: {
                              vertical: "top",
                              horizontal: "center"
                            },
                            getContentAnchorEl: null
                          }}
                    >
                        <MenuItem key={'laptops'} value="laptops">Laptops</MenuItem>
                        <MenuItem key={'devices'} value="devices">Devices</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth >
                    <InputLabel id="team-id-label" >Team ID</InputLabel>
                    <Select
                        label="Team ID"
                        id="team-id-select"
                        variant='outlined'
                        value={selectedTeamID}
                        onChange={handleTeamIDChange}
                        fullWidth
                        MenuProps={{
                            anchorOrigin: {
                              vertical: "top",
                              horizontal: "center"
                            },
                            getContentAnchorEl: null
                          }}
                    >
                        <MenuItem>All</MenuItem>
                        {teamIDs.map((team) => (
                            <MenuItem key={team} value={team}>
                                {team}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </form>
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
