import api from './api.js';

// All user-related API calls to Spring Boot backend
const userService = {

    // GET all users
    getAllUsers: async () => {
        const response = await api.get('/users');
        return response.data;
    },

    // GET single user by ID
    getUserById: async (id) => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    // POST create new user
    createUser: async (userData) => {
        const response = await api.post('/users', userData);
        return response.data;
    },

    // PUT update existing user
    updateUser: async (id, userData) => {
        const response = await api.put(`/users/${id}`, userData);
        return response.data;
    },

    // DELETE user
    deleteUser: async (id) => {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    },
};

export default userService;
