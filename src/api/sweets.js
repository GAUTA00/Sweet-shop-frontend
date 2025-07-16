import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

export const fetchAllSweets = () => axios.get(`${BASE_URL}/getSweets`);

export const addSweet = (data) => axios.post(`${BASE_URL}/addSweets`, data);

export const updateSweet = (id, data) => axios.put(`${BASE_URL}/updateSweet/${id}`, data);

export const deleteSweet = (id) => axios.delete(`${BASE_URL}/deleteSweet/${id}`);

export const purchaseSweet = (id, qty) => axios.put(`${BASE_URL}/purchaseSweet/${id}`, { quantity: qty });

export const restockSweet = (id, qty) => axios.put(`${BASE_URL}/restockSweet/${id}`, { quantity: qty });

export const searchSweets = (params) => axios.get(`${BASE_URL}/searchSweets`, { params });
