import "./ModeForm.css";
import { useStore } from "@tanstack/react-store";
import { modeStore, modesStore } from "@/store";
import type { TModeField } from "@/types";

var returnedNewReminder = {
  id: 34,
  title: "Buy gifts from amazon 22434343",
  date: "2026-27-30T04:58:47.231Z",
  reminders: [{ mode: "email", address: "dev7c4@gmail.com" }],
  alerts: [1000],
  is_recurring: false,
  description: "This is a reminder to go and buy a bunch of gifts from amazon",
};

var reminderCreate = {
  title: "Buy gifts from amazon 22434343",
  date: "2026-27-30T04:58:47.231Z",
  reminders: [{ mode: "email", address: "dev7c4@gmail.com" }],
  alerts: [1000],
  is_recurring: false,
  description: "This is a reminder to go and buy a bunch of gifts from amazon",
};

export default () => {
  const mode = useStore(modeStore);
  const modes = useStore(modesStore);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: TModeField,
  ) {
    const newFormState = { ...modeStore.state };
    newFormState[field] = e.target.value as never;
    modeStore.setState(newFormState);
  }

  function handleForm(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const newModes = [...modes];
    const id = newModes.length === 0 ? 1 : newModes[newModes.length - 1].id + 1;
    const newMode = { id, mode: mode.mode, address: mode.address };
    newModes.push(newMode);
    modesStore.setState(newModes);
  }

  return (
    <div
      className="ModeForm"
      style={{ border: "2px solid pink", padding: "10px", margin: "10px" }}
    >
      <form onSubmit={handleForm} method="POST" className="ModeForm__form">
        <div className="form-group">
          <label htmlFor="reminder-mode">Mode</label>
          <select
            onChange={(e) => handleChange(e, "mode")}
            value={mode.mode}
            name="reminder_mode"
            className="custom-select"
          >
            <button>
              {/* @ts-ignore */}
              <selectedcontent></selectedcontent>
              <span className="chevron">▼</span>
            </button>
            <option value="email">
              <div className="option-content">
                <span>Email</span>
              </div>
            </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="reminder-address">Address</label>
          <input
            id="reminder-address"
            type="text"
            value={mode.address}
            name="reminder_address"
            onChange={(e) => handleChange(e, "address")}
          />
        </div>
        <div className="form-group">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};
