const axios = require('axios')?.default;
const API_BASE_URL = 'https://rise-rn-test-api-gb2v6.ondigitalocean.app/api/v1';  // in an actual project, this can be kept in and .env file

const headers = (token: string = '') => (
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        timeout: 4000,
    }
)

export const login = ({ email = '', password = '' }) => {
    const response = axios.post(`${API_BASE_URL}/sessions`, {
        email_address: email?.trim(),
        password: password?.trim(),
    });
    return response;
};

export const signUp = ({ email = '', password = '', firstName = '', lastName = '', dob = '', username = '', phoneNumber = '' }) => {

    const response = axios.post(`${API_BASE_URL}/users`, {
        first_name: firstName?.trim(),
        last_name: lastName?.trim(),
        email_address: email?.trim(),
        password: password?.trim(),
        date_of_birth: dob?.trim(),
        // username: username?.trim(),
        phone_number: phoneNumber?.trim()
    });

    return response;
};

export const getUserSession = ({ queryKey }) => {
    const { token } = queryKey[1]
    const response = axios.get(`${API_BASE_URL}/sessions`, headers(token));
    return response;
};

export const getPlans = ({ queryKey }) => {
    const { token } = queryKey[1]
    const response = axios.get(`${API_BASE_URL}/plans`, headers(token));
    return response;
};

export const getPlanById = ({ queryKey }) => {
    const { token, id } = queryKey[1]
    const response = axios.get(`${API_BASE_URL}/plans/:${id}`, headers(token));
    return response;
};

export const getQuotes = ({ queryKey }) => {
    const { token } = queryKey[1]
    const response = axios.get(`${API_BASE_URL}/quotes`, headers(token));
    return response;
};

export const createPlan = ({ planName = '', targetAmount = '', maturityDate = '', token = '' }) => {
    const response = axios.post(`${API_BASE_URL}/plans`, {
        plan_name: planName?.trim(),
        target_amount: targetAmount?.trim(),
        maturity_date: maturityDate?.trim()
    },
        headers(token));
    return response;
};

export const getBanks = ({ queryKey }) => {
    const { token } = queryKey[1]
    const response = axios.get(`${API_BASE_URL}/banks`, headers(token));
    return response;
};

export const getRates = ({ queryKey }) => {
    const { token } = queryKey[1]
    const response = axios.get(`${API_BASE_URL}/rates`, headers(token));
    return response;
};