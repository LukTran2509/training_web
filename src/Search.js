import React, { useState } from "react";
import { ImSearch } from "react-icons/im";

const Search = ({employees}) => {
  const [search, setSearch] = useState("");

  const filter = employees.filter((employee) => {
    if(!search)return false
    return (
      employee.first_name.toLowerCase().includes(search.toLowerCase()) ||
      employee.last_name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase())
    )
  })
  return (
    <div>
      <form>
        <ImSearch style={{transform: "translate(160%, 17%)" }} />
        <input
          className="Search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
      </form>
      <div className="Employee">
      {filter
          .map((employee) => (
            <div key={employee.id}>
            <img className="img" src={employee.avatar} alt="" />
            <p style={{ lineHeight: "1.5", fontWeight: "bold" }}> ID: {employee.id} </p>
            <p> Name: {employee.first_name} {employee.last_name} </p>
            <p> Email: {employee.email} </p>
          </div>
          ))
      } </div>
    </div>
  );
};

export default Search;
