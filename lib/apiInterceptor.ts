/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

// Add a request interceptor
const requestInterceptor = axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        console.log('hi interceptor');
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
const responseInterceptor = axios.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);