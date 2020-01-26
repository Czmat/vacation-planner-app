import React, { useState } from 'react';
import moment from 'moment';

function CreateVacation({ createVacation }) {
  const [inputDate, setInputDate] = useState({
    startDate: moment().format('MM/DD/YYYY'),
    endDate: moment().format('MM/DD/YYYY'),
  });

  const [error, setError] = useState('');

  const onChange = e => {
    const change = {};
    change[e.target.name] = e.target.value;
    setInputDate({ ...inputDate, ...change });
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      await createVacation(inputDate);
      setError('');
      setInputDate({
        startDate: moment().format('MM/DD/YYYY'),
        endDate: moment().format('MM/DD/YYYY'),
      });
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {!!error && <span className="error">{error}</span>}
        <div className="form-group">
          <label>Start Date</label>
          <input
            name="startDate"
            type="text"
            className="form-control"
            value={inputDate.startDate}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            name="endDate"
            type="text"
            className="form-control"
            value={inputDate.endDate}
            onChange={e => onChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateVacation;
