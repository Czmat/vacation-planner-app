import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import CreateVacation from './components/CreateVacation';
import Vacations from './components/Vacations';
import './App.css';

const API = 'https://acme-users-api-rev.herokuapp.com/api';

const fetchUser = async () => {
  const storage = window.localStorage;
  const userId = storage.getItem('userId');
  if (userId) {
    try {
      return (await axios.get(`${API}/users/detail/${userId}`)).data;
    } catch (ex) {
      storage.removeItem('userId');
      return fetchUser();
    }
  }
  const user = (await axios.get(`${API}/users/random`)).data;
  storage.setItem('userId', user.id);
  return user;
};

function App() {
  const [user, setUser] = useState({});
  const [vacations, setVacations] = useState([]);

  useEffect(() => {
    fetchUser().then(user => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (!user.id) {
      return;
    }
    axios
      .get(`${API}/users/${user.id}/vacations`)
      .then(response => setVacations(response.data));
  }, [user]);

  if (!user.id) {
    return '...loading';
  }

  const createVacation = async vacation => {
    const response = await axios.post(
      `${API}/users/${user.id}/vacations`,
      vacation
    );
    setVacations([...vacations, response.data]);
  };

  const destroyVacation = async vacationToDestroy => {
    await axios.delete(
      `${API}/users/${user.id}/vacations/${vacationToDestroy.id}`
    );
    setVacations(
      vacations.filter(vacation => vacation.id !== vacationToDestroy.id)
    );
  };

  return (
    <div className="container">
      <h1>
        Acme Vacation Planner for {user.fullName} ({vacations.length})
      </h1>
      <CreateVacation createVacation={createVacation} />
      <Vacations vacations={vacations} destroyVacation={destroyVacation} />
    </div>
  );
}

export default App;
