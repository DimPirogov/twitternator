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

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: firebaseBaseQuery,
  tagTypes: ["posts"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: ({ post }) => ({
        baseUrl: "",
        url: "posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["posts"],
    }),
    getPosts: builder.query<any, void>({
      query: () => ({
        baseUrl: "",
        url: "posts",
        method: "GET",
        body: "",
      }),
      providesTags: ["posts"],
    }),
    getPost: builder.query<any, string>({
      query: (id) => ({
        baseUrl: "",
        url: "posts",
        method: "GET_BY_ID",
        body: id,
      }),
      providesTags: ["posts"],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        baseUrl: "",
        url: "posts",
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["posts"],
    }),
    updatePost: builder.mutation({
      query: ({ post }) => ({
        baseUrl: "",
        url: "posts",
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["posts"],
    })
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetPostQuery
} = postsApi;
