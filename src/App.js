import React from "react";
import API from "./utils/api";

import "./normalize.css";
import "./App.css";

const School = props => {
  return (
    <div className="school">
      <h1 className="school-name">{props.school.Name}</h1>
      <p className="school-desc">
        {props.school.Description}
        <br />
        <span className="school-enrollment">
          {props.school.Name} is currently{" "}
          <b>{props.school.IsOpen ? "open" : "closed"}</b> for enrollment.
        </span>
      </p>
      <div className="school-teachers">
        {props.school.Teachers.map(teacher => (
          <div key={teacher.Id}>
            <h2>{teacher.Name}</h2>
            <h3>Students</h3>
            <ol>
              {teacher.Students.map(student => (
                <li key={student.Id}>
                  {student.Name} (
                  <b>{student.IsEnrolled ? "enrolled" : "not enrolled"}</b>)
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
};

class App extends React.Component {
  state = {
    schools: [],
    currentSchool: null
  };
  componentDidMount() {
    API.get().then(res => {
      const schools = res.data.Schools;
      this.setState({ schools, currentSchool: schools[0] });
      console.log(schools);
    });
  }
  selectSchool(school) {
    this.setState({ currentSchool: school });
  }
  render() {
    if (!this.state.currentSchool) return null;
    return (
      <div className="app">
        <nav className="nav">
          {this.state.schools.map(school => (
            <span
              className="nav-item"
              key={school.Id}
              onClick={() => this.selectSchool(school)}
            >
              {school.Name}
            </span>
          ))}
        </nav>
        <div className="container">
          <School school={this.state.currentSchool} />
        </div>
      </div>
    );
  }
}

export default App;
