import "./ReminderForm.css";
import { useStore } from "@tanstack/react-store";
import { dialogStore, modesStore, reminderFormStore } from "@/store";
import { type TCreateReminderField } from "@/types";
import AddModes from "./AddModes";

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
  const reminderForm = useStore(reminderFormStore);
  const dialog = useStore(dialogStore);
  const modes = useStore(modesStore);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: TCreateReminderField,
    type?: string,
  ) {
    const newFormState = { ...reminderForm };
    if (type && type === "checkbox") {
      newFormState[field] = (e.target as HTMLInputElement).checked as never;
    } else {
      newFormState[field] = e.target.value as never;
    }
    reminderFormStore.setState(newFormState);
  }

  function onDoneAddingModes(listOfCheckedModes: number[]) {
    dialogStore.setState({ ...dialog, isOpen: false });

    reminderFormStore.setState({
      ...reminderForm,
      reminders: listOfCheckedModes,
    });
  }

  function handleAddMode() {
    dialogStore.setState({
      ...dialog,
      isOpen: true,
      children: <AddModes onDone={onDoneAddingModes} />,
    });
  }
  console.log("reminderForm = ", reminderForm);

  return (
    <div
      className="ReminderForm"
      style={{ border: "2px solid cyan", padding: "10px", margin: "10px" }}
    >
      <form method="POST" className="ReminderForm__form">
        <div className="form-group">
          <label htmlFor="reminder-title">Title</label>
          <input
            id="reminder-title"
            type="text"
            value={reminderForm.title}
            onChange={(e) => handleChange(e, "title")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reminder-date">Date</label>
          <input
            id="reminder-date"
            type="date"
            value={reminderForm.date}
            onChange={(e) => handleChange(e, "date")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reminder-is-recurring">Recurring</label>
          <input
            id="reminder-is-recurring"
            type="checkbox"
            checked={reminderForm.is_recurring}
            onChange={(e) => handleChange(e, "is_recurring", "checkbox")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reminder-description">Recurring</label>
          <textarea
            id="reminder-description"
            value={reminderForm.description}
            onChange={(e) => handleChange(e, "description")}
          ></textarea>
        </div>
        <div className="form-group">
          <p>Reminder modes:</p>
          <button type="button" onClick={handleAddMode}>
            Update modes
          </button>
          {reminderForm.reminders.length <= 0 ? (
            <p>No added modes</p>
          ) : (
            <>
              <p>Added modes:</p>
              <ul>
                {reminderForm.reminders
                  .map((id) => modes.find((x) => x.id === id))
                  .filter((x) => x !== undefined)
                  .map((mode) => {
                    return (
                      <li key={mode.id}>
                        {mode.mode} @ {mode.address}{" "}
                        <button
                          type="button"
                          onClick={() => {
                            reminderFormStore.setState((prevState) => {
                              return {
                                ...prevState,
                                reminders: reminderForm.reminders.filter(
                                  (x) => x !== mode.id,
                                ),
                              };
                            });
                          }}
                        >
                          x
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
