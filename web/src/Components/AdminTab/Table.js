import React from "react";

export function Table(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          {props.tableHeader.map((item) => {
            return (
              <th scope="col" key={item}>
                {item}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody style={{ overflow: "scroll", height: "100px" }}>
        {props.children}
      </tbody>
    </table>
  );
}
