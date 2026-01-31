import "./ModesTable.css";
import { modesStore } from "@/store";

export default () => {
  return (
    <div
      className="ModesTable"
      style={{ border: "2px solid green", padding: "10px", margin: "10px" }}
    >
      <table>
        <thead>
          <tr>
            <th>Mode</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {modesStore.state.map((mode, i) => {
            return (
              <tr key={i}>
                <td>{mode.mode}</td>
                <td>{mode.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
