import "./ReminderForm.css";
import { useStore } from "@tanstack/react-store";
import { useEffect, useState } from "react";
import { modesStore, reminderFormStore } from "@/store";

export default ({ onDone }: { onDone: (newChecked: number[]) => void }) => {
  const modes = useStore(modesStore);
  const reminderForm = useStore(reminderFormStore);
  const [checkedModes, setCheckedModes] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const newCheckedModes: Record<number, boolean> = {};

    modes.forEach((mode) => {
      const isIncluded = reminderForm.reminders.includes(mode.id);
      if (isIncluded) {
        newCheckedModes[mode.id] = true;
      } else {
        newCheckedModes[mode.id] = false;
      }
    });
    setCheckedModes(newCheckedModes);
  }, [modes]);

  const addRemoveModes = (id: number) => {
    const newCheckModes = { ...checkedModes };
    newCheckModes[id] = !newCheckModes[id];
    setCheckedModes(newCheckModes);
  };

  function handleDone() {
    const listOfCheckedModes = [];
    for (const key in checkedModes) {
      if (checkedModes[key] === true) {
        listOfCheckedModes.push(parseInt(key));
      }
    }
    onDone(listOfCheckedModes);

    const newCheckedModes: Record<number, boolean> = { ...checkedModes };
    Object.keys(setCheckedModes).forEach(
      (key) => (newCheckedModes[parseInt(key)] = false),
    );
  }

  return (
    <div className="AddModes">
      <fieldset>
        <legend>Available modes</legend>

        <div>
          {Object.keys(checkedModes)
            .map((id) => modes.find((x) => x.id === parseInt(id)))
            .filter((x) => x !== undefined)
            .map((mode) => (
              <div key={mode.id}>
                <input
                  type="checkbox"
                  id={`mode-${mode.id}`}
                  name={`mode-${mode.id}`}
                  checked={checkedModes[mode.id]}
                  onChange={() => addRemoveModes(mode.id)}
                />
                <label htmlFor={`mode-${mode.id}`}>
                  {mode.mode} @ {mode.address}
                </label>
              </div>
            ))}
        </div>
      </fieldset>
      <button type="button" onClick={handleDone}>
        Done
      </button>
    </div>
  );
};
