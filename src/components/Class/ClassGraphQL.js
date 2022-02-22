import "./Class.css";
import React, { useState, useEffect } from "react";

function ClassGraphQl(props) {
  const [classInfo, setClassInfo] = useState({});

  const url = "https://api.peterportal.org/graphql";

  useEffect(() => {
    const fetchData = async () => {
      const query = `
        query {
          course(id:"${props.name}") {
            id
            title
            department_name
            description
            instructor_history {
              name
            }
          }
        }`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ query }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);

      //create list of instructors and add it to response data
      var instructors = "";
      var history_arr = data.data.course.instructor_history;
      for (var i = 0; i < history_arr.length; i++) {
        instructors += history_arr[i].name + "\n";
      }
      data.data.course["instructors"] = instructors;

      setClassInfo(data.data.course);
    };
    fetchData();
  }, [props.name]);

  let info;
  if (classInfo) {
    info = (
      <div className="information">
        <p id="id">{classInfo.id}</p>
        <p id="title">{classInfo.title}</p>
        <p id="department">{classInfo.department_name}</p>
        <p id="description">{classInfo.description}</p>
        <p id="instructors">
          <b>Instructors</b>
          <br></br>
          {classInfo.instructors}
        </p>
        <p id="type">GraphQL</p>
      </div>
    );
  } else if (classInfo == null) {
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

export default ClassGraphQl;
