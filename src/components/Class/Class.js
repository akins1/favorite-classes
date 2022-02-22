import "./Class.css";
import React, { useState, useEffect } from "react";

function Class(props) {
  const [classInfo, setClassInfo] = useState({});

  const url = "https://api.peterportal.org/rest/v0/courses/";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url + props.name);
      const data = await response.json();
      console.log(data);
      setClassInfo(data);
    };
    fetchData();
  }, [props.name]);
  let info;
  if (classInfo.id) {
    info = (
      <div className="information">
        <p id="id">{classInfo.id}</p>
        <p id="title">{classInfo.title}</p>
        <p id="department">{classInfo.department_name}</p>
        <p id="description">{classInfo.description}</p>
        <p id="type">REST</p>
      </div>
    );
  } else if (classInfo.error) {
    info = (
      <p>
        <b>{props.name}</b> Not Found
      </p>
    );
  } else {
    info = <p>Loading...</p>;
  }

  return (
    <div className="class">
      <div>{info}</div>
    </div>
  );
}

export default Class;
