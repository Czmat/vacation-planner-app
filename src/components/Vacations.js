import React from 'react';
import moment from 'moment';

function Vacations({ vacations, destroyVacation }) {
  return (
    <div>
      <h3>Vacations</h3>
      <ul>
        {vacations.map(vacation => {
          let startDate = moment(vacation.startDate)
            .add(1, 'days')
            .format('L');
          let endDate = moment(vacation.endDate)
            .add(1, 'days')
            .format('L');
          let diff = moment(vacation.endDate)
            .add(1, 'days')
            .diff(moment(vacation.startDate).add(1, 'days'), 'days');

          return (
            <li key={vacation.id}>
              <button onClick={() => destroyVacation(vacation)}>X</button>
              {startDate} to {endDate} ({diff})
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Vacations;
