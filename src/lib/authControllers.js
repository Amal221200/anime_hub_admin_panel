import axios from 'axios';
import config from './config';

export const signIn = async (user) => {
    try {
       const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/auth`, user, config);
       return res.status;
    } catch (error) {
        if (error.response.status !== 200) {
            console.log("Signin error");
            return;
        }

    }
};

export const signUp = async (user) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/sign-up`, user, config);
        return res.status;
    } catch (error) {
        if (error.response.status !== 201) {
            console.log('Sign Up Error');
            return;
        }
    }
};

export const signOut = async () => {
    try {
        
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/sign-out`, config);
        return res.status;
    } catch (error) {
        if (error.response.status !== 200) {
            console.log('Sign Out Error');
            return;
        }
    }
};
