import React, { useEffect } from "react";
import "./App.css";
import { useGetUserQuery } from "./api";
// import EmployeeList from "./AddEmployee";
// import Search from "./Search";
// import axios from "axios";

// Reducers
const App = () => {
  // const {posts, loading} = useSelector((state) => state.post);      //Hook để lấy state từ Redux store

  // const dispatch = useDispatch();     //Hook để dispatch actions
  // useEffect(() => {
  //   dispatch(user());
  // }, [dispatch]);

  // const handleDelete = (id) => {
  //   axios.delete("https://reqres.in/api/users?page=2")
  //   .then(() => {
  //     dispatch({ type: "REMOVE_EMPLOYEE", payload: id });
  // })
  //   .catch((error) => console.error(error));
  // };

  const { data } = useGetUserQuery(2);
  return (
    <div className="App">
      <p style={{ fontSize: "50px", fontWeight: "bold", marginTop: "20px" }}>
        {" "}
        Hello ReqRes users!{" "}
      </p>
      {/* <Search employees={[]} />
      <EmployeeList employees={[]} /> */}

      {false ? (
        <p>Loading posts...</p>
      ) : (
        <div className="Employee">
          {data.map((employee) => (
            <div key={employee.id}>
              <img className="img" src={employee.avatar} alt="" />
              <p style={{ lineHeight: "1.5", fontWeight: "bold" }}>
                {" "}
                ID: {employee.id}{" "}
              </p>
              <p>
                {" "}
                Name: {employee.first_name} {employee.last_name}{" "}
              </p>
              <p> Email: {employee.email} </p>
              {/* <button onClick={() => handleDelete(employee.id)}> Delete </button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
