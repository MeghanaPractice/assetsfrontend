import { PieChart } from '@mui/x-charts';
import { fetchEmployeesAssigned } from '../../service/apiService';
import { useEffect, useState, useContext } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select, Card } from '@mui/material';
import { TeamContext } from '../../context/TeamContext';
import { daDK } from '@mui/material/locale';

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
            <div>
                <FormControl>
                    <InputLabel id="chart-option-label">Chart Option</InputLabel>
                    <Select
                        label="Chart Option"
                        id="chart-option-select"
                        value={selectedOption}
                        onChange={handleOptionChange}
                    >
                        <MenuItem value="laptops">Laptops</MenuItem>
                        <MenuItem value="devices">Devices</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="team-id-label">Team ID</InputLabel>
                    <Select
                        label="Team ID"
                        id="team-id-select"
                        value={selectedTeamID}
                        onChange={handleTeamIDChange}
                    >
                        <MenuItem>All</MenuItem>
                        {teamIDs.map((team) => (
                            <MenuItem key={team} value={team}>
                                {team}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', textAlign: 'left' }}>
                <PieChart
                    series={[{ data: chartData }]}
                    width={'80%'}
                    height={'80%'}
                />
            </div>
        </Card>
    );
}
