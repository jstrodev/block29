import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const playersApi = createApi({
  reducerPath: 'playersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fsa-puppy-bowl.herokuapp.com/api/2408-ftb-et-web-am/' }),
  endpoints: (builder) => ({
    fetchAllPlayers: builder.query({
      query: () => 'players',
    }),
  }),
});

export const { useFetchAllPlayersQuery } = playersApi;