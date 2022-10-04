import axios from 'axios';

const url = 'http://localhost:5001/api/customer'

export default {

    getCustomers() {
        return axios.get(url);
    },
    createCustomer(request) {
        return axios.post(url, request);
    },
    deleteCustomer(id) {
        return axios.delete(`${url}/${id}`);
    }
}