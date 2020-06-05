import axios from 'axios';
import { showAlert } from './alerts';

export const newClass = async (
  name,
  venue,
  term,
  day,
  time,
  time1,
  duration,
  startDate,
  endDate,
  age,
  age1,
  maxCapacity,
  description,
  fullPrice,
  classPrice
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/classes',
      data: {
        name,
        venue,
        term,
        day,
        time: `${time} - ${time1}`,
        duration,
        startDate,
        endDate,
        age: `${age} - ${age1}`,
        maxCapacity,
        description,
        fullPrice,
        classPrice,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Class created successfully!');
      window.setTimeout(() => {
        location.assign('/me');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
