import { SIGNUP_USER } from './types';
import axios from 'axios';

export const signupUser = (email, password) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3001/signup', { email, password });
        
        if (response.status === 200) {
            dispatch({
                type: SIGNUP_USER,
                payload: { formCompleted: true }
            });
        }
    } catch (error) {
        console.error("Signup failed:", error);
    }
};