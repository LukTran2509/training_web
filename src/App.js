import React, {useState} from "react";
import "./App.css";
import { useGetUserQuery, useCreateUserMutation} from "./api";

const App = () => {
  const { data, isLoading } = useGetUserQuery(2);
  const [createUser] = useCreateUserMutation();

  const [showForm, setShowForm] = useState(false);
  const [employee, setEmployee] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });
  const [newId, setNewId] = useState(13);
  
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
      console.log("Posting data", employees);
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

  return (
    <div className="App">
      <p style={{ fontSize: "50px", fontWeight: "bold", marginTop: "20px" }}>
        Hello ReqRes users! </p>

      <button className="Add" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Employee"}
      </button>
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
          </label> <br />
          <label style={{ fontSize: "15px", fontWeight: "bold" }}>
            Last Name:
            <input
              style={{ marginLeft: "26px" }}
              className="Input"
              type="text"
              name="last_name"
              value={employee.last_name}
              onChange={handleChange} />
          </label>  <br />
          <label style={{ fontSize: "15px", fontWeight: "bold" }}>
            Email:
            <input
              style={{ marginLeft: "56px" }}
              className="Input"
              type="text"
              name="email"
              value={employee.email}
              onChange={handleChange} />
          </label> <br />
          <button className="Post" type="submit"> ADD </button>
        </form>
      )}

      {isLoading ? (
        <p> Loading ... </p>
      ) : (
        <div className="Employee">
          {data && data.map((employee) => (
            <div key={employee.id}>
              <img className="img" src={employee.avatar} alt=""/>
              <p style={{ lineHeight: "1.5", fontWeight: "bold" }}> ID: {employee.id} </p>
              <p> Name: {employee.first_name} {employee.last_name} </p>
              <p> Email: {employee.email} </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
