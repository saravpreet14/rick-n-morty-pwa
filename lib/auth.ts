import fs from 'fs';
import path from "path";

// const dataFilePath = path.join(process.cwd(), 'validation.json');
// const rawData = fs.readFileSync(dataFilePath, "utf-8");
// const authData = JSON.parse(rawData);

const authData = {
    "sprinklr@123": "sprinklr@123",
    "sarav@123": "sarav@123",
    "phani@123": "phani@123",
    "aneree@123": "aneree@123",
    "dhruv@123": "dhruv@123",
}

export async function authenticate(username: string, password: string) { 
    const valid = (authData[username] === password);
    if(valid) {
        localStorage.setItem('user', JSON.stringify({username, password}));
    }
    return valid;
}

export async function isAuth() {
    if(typeof window !== 'undefined') {
        const rawData = localStorage.getItem('user');
        if(!rawData) {
            return false;
        }
        const userData:{username: string, password: string} = JSON.parse(rawData);
        return authenticate(userData.username, userData.password);
    }
}

export async function logout() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
    }
}

export async function getUser() {
    if(typeof window !== 'undefined') {
        const rawData = localStorage.getItem('user');
        if(!rawData) {
            return false;
        }
        const userData:{username: string, password: string} = JSON.parse(rawData);
        return userData.username;
    }
}