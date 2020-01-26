import React, { useState, useEffect } from 'react';

import './App.css';

const API = 'https://swapi.co/api/people';

const getStarwarsData = async id => {
  const response = await fetch(`${API}/1/`);
  const data = await response.json();
  console.log(data);
  return data;
};

function App() {
  const [person, setPerson] = useState({});

  useEffect(() => {
    getStarwarsData().then(data => {
      setPerson(data);
    });
  }, []);

  return (
    <div>
      <h1>{person.name}</h1>
      <ul></ul>
    </div>
  );
}

export default App;
