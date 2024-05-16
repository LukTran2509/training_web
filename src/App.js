import React, { useState } from "react";
import "./App.css";
import { ImSearch } from "react-icons/im";
import {
  useGetUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
} from "./api";

const App = () => {
  const { data, isLoading } = useGetUserQuery();
  const [createUser] = useCreateUserMutation();
  // const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [editUser] = useEditUserMutation();

  const [showForm, setShowForm] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [newId, setNewId] = useState(7);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const employees = await createUser({
        id: newId,
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        avatar: employee.avatar,
      });
      console.log(employees);
      setShowForm(false);
      setNewId(newId + 1);
      setEmployee({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        avatar: "",
      });
    } catch (error) {
      console.error("checkkkk", error);
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const result = { id: employee.id, firstName, lastName, email };
      console.log("Update ", result);
    } catch (error) {
      console.log("Failed to update user ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const remove = await deleteUser(id);
      console.log("Delete", remove);
    } catch (error) {
      console.log("Failedddddd", error);
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleUpdateEdit = async () => {
    try {
      const result = await editUser({ firstName, lastName, email });
      setEditId(null);
      console.log("Edit ", result);
    } catch (error) {
      console.log("Failed to edit user", error);
    }
  };

  const filter = data ? data.filter((employee) => {
        if (!search)          //search empty
          return true;        //false: ẩn ds, true: hiện ds
        return (
          employee.first_name.toLowerCase().includes(search.toLowerCase()) ||
          employee.last_name.toLowerCase().includes(search.toLowerCase()) ||
          employee.email.toLowerCase().includes(search.toLowerCase())
        );
      })
    : [];

  return (
    <div className="App">
      <p style={{ fontSize: "50px", fontWeight: "bold", marginTop: "20px", marginBottom: "35px" }}>
        Hello ReqRes users! </p>

      <form>
        <ImSearch style={{ transform: "translate(160%, 13%)", fontSize: "16px" }} />
        <input
          className="Search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..." />
      </form>

      <button className="Add" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Employee"}
      </button>
      <button style={{ marginLeft: "70px" }} className="Add" onClick={handleUpdate}> Update User </button>
      {showForm && (
        <form className="Form" onSubmit={handleCreateUser}>
          <label style={{ fontSize: "15px", fontWeight: "bold" }}>
            First Name:
            <input
              className="Input"
              type="text"
              name="first_name"
              value={employee.first_name}
              onChange={handleChange} />
          </label>
          <br />
          <label style={{ fontSize: "15px", fontWeight: "bold" }}>
            Last Name:
            <input
              style={{ marginLeft: "26px" }}
              className="Input"
              type="text"
              name="last_name"
              value={employee.last_name}
              onChange={handleChange}/>
          </label>
          <br />
          <label style={{ fontSize: "15px", fontWeight: "bold" }}>
            Email:
            <input
              style={{ marginLeft: "56px" }}
              className="Input"
              type="text"
              name="email"
              value={employee.email}
              onChange={handleChange}/>
          </label>
          <br />
          <button className="Post" type="submit"> ADD </button>
        </form>
      )}

      <div className="Employee">
        {filter.map((employee) => (
          <div key={employee.id}>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div key={employee.id}>
                {employee.id === editId ? (
                  <div className="Edit">
                    <img style={{ marginBottom: "8px" }} className="img" src={employee.avatar} alt=""/>
                    <br />
                    <input
                      style={{ height: "18px" }}
                      type="text"
                      placeholder="First name"
                      onChange={(e) => setFirstName(e.target.value)}/>
                    <br />
                    <input
                      style={{ height: "18px", marginTop: "5px" }}
                      type="text"
                      placeholder="Last name"
                      onChange={(e) => setLastName(e.target.value)}/>
                    <br />
                    <input
                      style={{ height: "18px", marginTop: "5px" }}
                      type="text"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}/>
                    <br />
                    <button style={{ marginTop: "10px" }} onClick={handleUpdateEdit}> Update </button>
                  </div>
                ) : (
                  <>
                    <img className="img" src={employee.avatar} alt="" />
                    <p style={{ lineHeight: "1.5", fontWeight: "bold" }}> ID: {employee.id} </p>
                    <p> Name: {employee.first_name} {employee.last_name} </p>
                    <p> Email: {employee.email} </p>
                    <button className="Button" onClick={() => handleDelete(employee.id)}> Delete </button>
                    <button className="Button" onClick={() => handleEdit(employee.id)}> Edit </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
