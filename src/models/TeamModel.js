const API_URL = 'http://localhost:8081/team';

export const fetchTeams = async () => {
  try {
    const response = await fetch(`${API_URL}/getAll`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
};

export const updateTeam = async (team) => {
  try {
    await fetch(`${API_URL}/edit/${team.teamID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(team),
    });
  } catch (error) {
    console.error('Error Editing team:', error);
  }
};

export const deleteTeam = async (teamID) => {
  try {
    await fetch(`${API_URL}/delete/${teamID}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error Deleting team:', error);
  }
};

export const addTeam = async (team) => {
    try {
      await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(team),
      });
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };