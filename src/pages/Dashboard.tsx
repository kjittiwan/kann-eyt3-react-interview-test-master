import { Button, Table, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getContactList } from "../Store/contactsSlice";
import { AppDispatch, RootState } from "../Store/store";
import { resetUserState } from "../Store/userSlice";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const contacts = useSelector((state: RootState) => state.contacts);

  const [searchText, setSearchText] = useState("");

  const handleResetUserState = () => {
    dispatch(resetUserState());
  };

  useEffect(() => {
    dispatch(getContactList(user.user?.username || ""));
  }, [user, dispatch]);
  console.log("user", user);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: Contact, b: Contact) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: Contact, b: Contact) => a.email.localeCompare(b.email),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a: Contact, b: Contact) => a.phone.localeCompare(b.phone),
    },
  ];
  console.log("contacts", contacts);
  const filteredContacts = contacts?.contactList?.filter((contact) =>
    Object.values(contact).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="main-container-dashboard">
      <header className="header">
        <div className="nav-button-container">
          <Link to="/">
            <Button>Home</Button>
          </Link>
          <Button onClick={handleResetUserState}>Log out</Button>
        </div>
        <h1 className="title">Welcome, {user.user?.username}!</h1>
      </header>
      <div className="table-container">
        <Input
          placeholder="Search contacts"
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
        <Table
          dataSource={filteredContacts as Contact[]}
          columns={columns}
          pagination={{ pageSize: 10, position: ["bottomLeft"] }}
          className="table"
        />
      </div>
    </div>
  );
}
