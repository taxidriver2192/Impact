import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { url } from "inspector";
import { Contact } from "../models/contact.model";

export const contactsApi = createApi ({
    reducerPath: "contactsApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000/"}),
    tagTypes: ["Contact"],
    endpoints: (builder) => ({
        contacts: builder.query<Contact[], void>({
            query: () => "/contacts",
            providesTags: ["Contact"],
        }),
        contact: builder.query<Contact, string>({
            query: (id) => `/contacts/${id}`,
            providesTags: ["Contact"],
        }),
        addContact: builder.mutation<{}, Contact>({
            query: (contact) => ({
                url: "/contacts",
                method: "POST",
                body: contact,
            }),
            invalidatesTags: ["Contact"],
        }),
        deleteContact: builder.mutation<void, string>({
            query: (id) =>({
                url: `/contacts/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Contact"],
        }),
        updateContact: builder.mutation<void, Contact>({
            query: ({ id, ...rest }) => ({
                url: `/contact/${id}`,
                method: "PUT",
                body: rest,
            }),
            invalidatesTags: ["Contact"],
        }),
    }),
});

export const {useContactsQuery, useAddContactMutation, useDeleteContactMutation, useContactQuery, useUpdateContactMutation} = contactsApi;