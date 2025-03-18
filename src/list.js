import React from "react";
import "./style.css";

const List = React.memo(({ items }) => {
  console.log("Rendering List Component(After Optimization");
  return (
    <ul className="list">
      {items.map((item) => (
        <li key={item.id} className="list-item">
          {item.name}
        </li>
      ))}
    </ul>
  );
});

export default List;

/*const List = ({ items }) => {
  console.log("🔴 Rendering List Component (Before Optimization)");
  return (
    <ul className="list">
      {items.map((item) => (
        <li key={item.id} className="list-item">
          {item.name}
        </li>
      ))}
    </ul>
  );
};
export default List;
*/
