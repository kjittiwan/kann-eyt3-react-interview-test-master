import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { contacts } from "../contacts";

type Contact = {
  id: number;
  name?: string;
  email: string;
  phone: string;
};

export const getContactList = createAsyncThunk<Contact[], string>(
  "user/contactList",
  async (username) => {
    const contactList = contacts[username as keyof typeof contacts];
    return contactList;
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contactList: [] as Contact[],
  },
  reducers: {
    setContactList: (state, action) => {
      state.contactList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContactList.fulfilled, (state, action) => {
      state.contactList = action.payload;
    });
  },
});

export const { setContactList } = contactsSlice.actions;

export default contactsSlice.reducer;
