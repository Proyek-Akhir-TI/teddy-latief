import { UserProps } from "../interface/userProps";

export const loginApi = async (username: string, password: string): Promise<UserProps> => {
    const response = await fetch('http://localhost:3300/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
        throw new Error('Login gagal');
    }
    
    const data = await response.json();
    return data;
}