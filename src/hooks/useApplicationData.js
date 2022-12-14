import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview, edit = false) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      //checks if an we are editing the appointment and if we are it will not call the updateSpots function as the count does not need to change
      edit
        ? setState({ ...state, appointments })
        : setState({ ...state, appointments, days: updateSpots(id, false) });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({ ...state, appointments, days: updateSpots(id, true) });
    });
  }

  //takes in two variables, an appointment id and a boolean on whether increment or not
  function updateSpots(id, increment) {
    let index = 0;

    const day = state.days.find((day, i) => {
      index = i;

      if (day.appointments.includes(id)) {
        return day;
      }

      return undefined;
    });

    increment ? day.spots++ : day.spots--;

    const days = [...state.days];

    days.splice(index, 1, day);

    return days;
  }

  return { state, setDay, bookInterview, cancelInterview };
}
