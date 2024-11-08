import { SIGNUP_USER } from './types';
import axios from 'axios';

//sign up a new user with email and password
export const signupUser = (email, password) => async dispatch => {
    try {
        //send a POST request to the backend to create a new user account
        const response = await axios.post('http://localhost:3001/signup', { email, password });
        
        //dispatch an action to update Redux state, marking form completion as true
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