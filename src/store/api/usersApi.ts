import { createApi } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "../../firebase-config";

const firebaseBaseQuery = async ({ baseUrl, url, method, body }) => {
  switch (method) {
    case "GET":
      const snapshot = await getDocs(collection(db, url));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return { data };

    case "GET_BY_ID":
      const oneDoc = await getDoc(doc(db, url, body));
      return { data: { id: oneDoc.id, ...oneDoc.data() } };

    case "POST":
      const docRef = await addDoc(collection(db, url), body);
      return { data: { id: docRef.id, ...body } };

    case "DELETE":
      await deleteDoc(doc(db, url, body));
      return { data: `Deleted id ${body}` };

    case "PUT":
      await updateDoc(doc(db, url, body.id), body);
      return { data: { ...body } };

    default:
      throw new Error(`Unhandled method ${method}`);
  }
};

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: firebaseBaseQuery,
  tagTypes: ["users"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ user }) => ({
        baseUrl: "",
        url: "users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
    getUsers: builder.query<any, void>({
      query: () => ({
        baseUrl: "",
        url: "users",
        method: "GET",
        body: "",
      }),
      providesTags: ["users"],
    }),
    getUser: builder.query<any, string>({
      query: (id) => ({
        baseUrl: "",
        url: "users",
        method: "GET_BY_ID",
        body: id,
      }),
      providesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        baseUrl: "",
        url: "users",
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: ({ user }) => ({
        baseUrl: "",
        url: "users",
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["users"],
    })
  }),
});

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserQuery
} = usersApi;
