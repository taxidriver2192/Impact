import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { url } from "inspector";
import { Beer } from "../models/beer.model";

export const beersApi = createApi ({
    reducerPath: "beersApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000/"}),
    tagTypes: ["Beer"],
    endpoints: (builder) => ({
        beers: builder.query<Beer[], void>({
            query: () => "/beers",
            providesTags: ["Beer"],
        }),
        Beer: builder.query<Beer, string>({
            query: (id) => `/beers/${id}`,
            providesTags: ["Beer"],
        }),
        addBeer: builder.mutation<{}, Beer>({
            query: (Beer) => ({
                url: "/beers",
                method: "POST",
                body: Beer,
            }),
            invalidatesTags: ["Beer"],
        }),
        deleteBeer: builder.mutation<void, string>({
            query: (id) =>({
                url: `/beers/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Beer"],
        }),
        updateBeer: builder.mutation<void, Beer>({
            query: ({ id, ...rest }) => ({
                url: `/beers/${id}`,
                method: "PUT",
                body: rest,
            }),
            invalidatesTags: ["Beer"],
        })
        
    }),
});

export const {useBeersQuery, useAddBeerMutation, useDeleteBeerMutation, useBeerQuery, useUpdateBeerMutation } = beersApi;