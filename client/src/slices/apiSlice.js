import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
const baseURL = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    credentials: 'include',
});

export const apiSlice = createApi({
    baseQuery, 
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: (builder) => ({}),
});