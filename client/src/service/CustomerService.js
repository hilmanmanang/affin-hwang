import axios from 'axios';

const url = 'http://localhost:5001/api/customer'

export default {

    getCustomers() {
        return axios.get(url);
    },
    getCustomer(id) {
        return axios.get(`${url}/${id}`);
    },
    createCustomer(request) {
        return axios.post(url, request);
    },
    updateCustomer(request) {
        return axios.put(url, request);
    },
    deleteCustomer(id) {
        return axios.delete(`${url}/${id}`);
    }
}