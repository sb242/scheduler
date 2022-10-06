import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  
  const dayListItemArr = props.days.map((dayListItem) => {
    return(
      <DayListItem
        key={dayListItem.id}
        name={dayListItem.name}
        spots={dayListItem.spots}
        selected={dayListItem.name === props.value}
        setDay={props.onChange}
      />
    );
  })

  return (
    <ul>
      {dayListItemArr}
    </ul>
  );


}