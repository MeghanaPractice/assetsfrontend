import { config } from '../usermanagementapiconfig';

export const getManagementApiAccessToken = async () => {
    try {
        const response = await fetch(`https://${config.domain}/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                grant_type: 'client_credentials',
                client_id: config.clientId,
                client_secret: config.clientSecret,
                audience: config.audience,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return data.access_token;
        } else {
            console.error('Failed to obtain Management API Access Token:', response.status, response.statusText);
            throw new Error('Failed to obtain Management API Access Token');
        }
    } catch (error) {
        console.error('Error obtaining Management API Access Token:', error);
        throw error;
    }
};

export const confirmIfAdmin = async (accessToken, userId) => {
    try {
        const response = await fetch(`https://${config.domain}/api/v2/users/${userId}/roles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data.some(role => role.name === 'Admin');
        } else {
            console.error('Failed to fetch user roles:', response.status, response.statusText);
            throw new Error('Failed to fetch user roles');
        }
    } catch (error) {
        console.error('Error fetching user roles:', error);
        throw error;
    }
};
export const confirmIfStandard = async (accessToken, userId) => {
    try {
        const response = await fetch(`https://${config.domain}/api/v2/users/${userId}/roles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data.some(role => role.name === 'Standard');
        } else {
            console.error('Failed to fetch user roles:', response.status, response.statusText);
            throw new Error('Failed to fetch user roles');
        }
    } catch (error) {
        console.error('Error fetching user roles:', error);
        throw error;
    }
};



const setPasswordResetEmail = async (userData) => {
    try {
        const accessToken = await getManagementApiAccessToken();
        const response = await fetch(`https://${config.domain}/dbconnections/change_password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + accessToken,
            },
            body: JSON.stringify({
                grant_type: 'client_credentials',
                client_id: config.clientId,
                email: userData.email,
                connection: config.connection,
            })
        });

        if (!response.ok) {
            console.error('Failed to send password reset email:', response.status, response.statusText);
            return;
        }

        console.log('Password reset email sent successfully');
    } catch (error) {
        console.error('Error sending password reset email:', error);
    }
};

export const createUser = async (userData) => {
    try {
        const accessToken = await getManagementApiAccessToken();
        const response = await fetch(`https://${config.domain}/api/v2/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + accessToken,
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            console.error('Failed to create user:', response.status, response.statusText);
            return;
        }
        console.log('User created successfully:', userData);

    } catch (error) {
        console.error('Error creating user:', error);
    }
};

export const assignUserRole = async (userID, roles) => {
    try {
        const accessToken = await getManagementApiAccessToken();

        const response = await fetch(`https://${config.domain}/api/v2/users/${userID}/roles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + accessToken,
            },
            body: JSON.stringify({ roles: roles }),
        });

        if (!response.ok) {
            console.error('Failed to assign user role:', response.status, response.statusText);
            return;
        }

        console.log('User role assigned successfully:', roles);

    } catch (error) {
        console.error('Error assigning user role:', error);
    }
};