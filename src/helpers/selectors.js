export function getAppointmentsForDay(state, day) {
  let arr = [];
  state.days.forEach(element => {
    if(element.name === day) {
      if(!element.appointments) {
        return [];
      }
      element.appointments.forEach(appointment => {
        arr.push(state.appointments[appointment]);
      });
    }
  });

  return arr;
}

export function getInterviewersForDay(state, day) {
  let arr = [];

  state.days.forEach(element => {
    if(element.name === day) {
      if(!element.interviewers) {
        return [];
      }
      element.interviewers.forEach(interviewer => {
        arr.push(state.interviewers[interviewer]);
      });
    }
  });

  return arr;

}

export function getInterview(state, interview) {
  
  if(!interview) {
    return null;
  }

  const interviewerID = interview["interviewer"];
  interview.interviewer = state.interviewers[interviewerID];
  return interview;
}

