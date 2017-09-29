// src/auth/index.js

import {router} from '../main'
import axios from 'axios';
import Routes from '../routes'

// URL and endpoint constants
const API_URL = 'http://localhost:3000/'
const LOGIN_URL = API_URL + 'auth/login'
const SIGNUP_URL = API_URL + 'auth/register'
const TOKEN_URL = API_URL + 'auth/authToken'

export default {

    // User object will let us check authentication status
    user: {
        authenticated: false
    },

    login(context, creds, redirect) {
        axios.post(LOGIN_URL, creds)
            .then((response) => {
                //console.log('hello')
                localStorage.setItem('token_id', response.data.token)
                this.user.authenticated = true

                if(redirect) {
                    context.$router.push(redirect)
                }
            })
            .catch((error) => {
                context.error = error
                this.user.authenticated = false
            })
    },

    signup(context, creds, redirect) {
        axios.post(SIGNUP_URL, creds)
            .then((response) => {
                console.log(response.data.success);
                if(response.data.success === false) {
                    console.log('here');
                } else {
                    localStorage.setItem('token_id', response.data.token)
                    //this.user.authenticated = true
                    context.success = response
                }

            })
            .catch((error) => {
                context.error = error
                this.user.authenticated = false
            })
    },


    logout() {
        localStorage.removeItem('token_id');
        this.user.authenticated = false;

    },

    checkAuth() {
        var jwt = localStorage.getItem('token_id')
        axios.defaults.headers.common['Authorization'] =　localStorage.getItem('token_id');
        axios.get(TOKEN_URL)
            .then((res) => {
                console.log('success: ' + res);
                this.user.authenticated = true;
            })
            .catch((error) => {
                console.log('error: ' + error);
                this.user.authenticated = false;
            })
    },
}
