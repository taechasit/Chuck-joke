import "./App.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Axios from "axios";

function App() {
  const [user, setUser] = useState({ fname: "", lname: "", jokeNum: 10 });
  const [jokedata, setJokedata] = useState([]);

  const getJoke = (event) => {
    if (event) {
      event.preventDefault();
    }

    Axios.get(
      `http://api.icndb.com/jokes/random/${user.jokeNum}?firstName=${
        user.fname ? user.fname : "Chuck"
      }&lastName=${user.lname ? user.lname : "Norris"}`
    )
      .then((res) => {
        console.log(res.data);
        setJokedata(res.data.value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let jokemap = null;
  if (jokedata[0]) {
    jokemap = jokedata.map((item, index) => {
      return (
        <div key={index}>
          <p>{item.joke}</p>
        </div>
      );
    });
  }

  useEffect(() => {
    getJoke();
  }, []);

  return (
    <div className="App">
      <Header>
        <nav>
          <h3>
            The Internet {user.fname ? user.fname : "Chuck"}{" "}
            {user.lname ? user.lname : "Norris"} Joke
          </h3>
        </nav>
      </Header>
      <InputDiv>
        <div>
          <form onSubmit={getJoke}>
            <input
              type="text"
              placeholder="Enter your first name"
              value={user.fname}
              onChange={(event) => {
                setUser({ ...user, fname: event.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Enter your last name"
              value={user.lname}
              onChange={(event) => {
                setUser({ ...user, lname: event.target.value });
              }}
            />
            <input
              type="number"
              placeholder="Enter number of joke you will get"
              min="1"
              value={user.jokeNum}
              onChange={(event) => {
                setUser({ ...user, jokeNum: event.target.value });
              }}
            />
            <input type="submit" style={{ display: "none" }} />
          </form>
        </div>
      </InputDiv>
      <MainDiv>{jokemap}</MainDiv>
    </div>
  );
}

const Header = styled.header`
  font-family: "Prompt", sans-serif;
  box-shadow: 0px 0px 10px rgb(0, 0, 0, 0.2);
  font-size: 18px;
  height: 64px;
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  nav {
    width: 75%;
    margin: 0 auto;
  }
`;

const InputDiv = styled.div`
  min-height: 130px;
  height: auto;
  width: 80%;
  margin: 25px auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  div {
    background-color: #f8f8f8;
    box-shadow: 0px 0px 10px rgb(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    min-height: 96px;
    height: auto;
    width: 94%;
    input {
      width: 260px;
      height: 30px;
      outline: none;
      margin: 10px;
      border: 1px solid #ccc;
      padding: 0 10px;
      font-family: "Prompt", sans-serif;
      :focus {
        box-shadow: 0px 0px 10px rgb(0, 0, 0, 0.1);
      }
      :hover {
        box-shadow: 0px 0px 10px rgb(0, 0, 0, 0.1);
      }
    }
  }
`;

const MainDiv = styled.div`
  min-height: 150px;
  height: auto;
  width: 80%;
  margin: 25px auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  div {
    background-color: #f8f8f8;
    box-shadow: 0px 0px 10px rgb(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 96px;
    width: 45%;
    margin: 25px;
    padding: 10px;
    transition: all 0.2s ease-in;
    cursor: pointer;
    :hover {
      transition: all 0.2s ease-in;
      transform: scale(1.2);
    }
    p {
      text-align: center;
    }
  }
`;

export default App;
