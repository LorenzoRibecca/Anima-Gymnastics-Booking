/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

//type is either password or data
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteClass = async (data, type) => {
  const path = window.location.pathname;
  const spath = path.split('/');
  const id = spath[spath.length - 1];
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:3000/api/v1/classes/${id}`,
      data,
    });

    console.log(res.data);
    showAlert('success', 'Class deleted successfully!');
    window.setTimeout(() => {
      location.assign('/manage-classes');
    }, 1500);
  } catch (err) {
    console.log(err);

    showAlert('error', err.response.data.message);
  }
};

export const updateClassSettings = async (
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
  const path = window.location.pathname;
  const spath = path.split('/');
  const id = spath[spath.length - 1];
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/classes/${id}`,
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
        slug: name + id,
      },
    });

    if (res.data.status === 'success') {
      console.log(res.data);
      showAlert('success', 'Class updated successfully!');
      window.setTimeout(() => {
        location.assign('/manage-classes');
      }, 1500);
    }
  } catch (err) {
    console.log(err);

    showAlert('error', err.response.data.message);
  }
};
