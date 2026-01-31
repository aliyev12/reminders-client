import "./NewReminder.css";
import { modesStore, showAddNewModeFormStore } from "@/store";
import { useStore } from "@/hooks/useStore";
import ModeForm from "@/components/mode-form/ModeForm";
import ModesTable from "@/components/modes-table/ModesTable";
import ReminderForm from "@/components/reminder-form/ReminderForm";

export default () => {
  const showAddNewModeForm = useStore(showAddNewModeFormStore);

  function addNewMode({ mode, address }: { mode: string; address: string }) {
    const newModes = [...modesStore.state];
    const id = newModes.length === 0 ? 1 : newModes[newModes.length - 1].id + 1;
    const newMode = { id, mode, address };
    newModes.push(newMode);
    modesStore.setState(newModes);
  }

  return (
    <div className="NewReminder">
      <ModesTable />
      {!showAddNewModeForm && (
        <button onClick={() => showAddNewModeFormStore.setState(true)}>
          Add new mode
        </button>
      )}
      {showAddNewModeForm && <ModeForm addNewMode={addNewMode} />}
      <ReminderForm />
    </div>
  );
};
