import { useState } from "react";

//custom hooks
import useLocalStorage from './hooks/useLocalStorage'

//custom components
import { CustomForm } from "./components/CustomForm";
import { EditForm } from "./components/EditForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useLocalStorage('react-todo.tasks', [])
  const [editedTask, setEditedTask] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [previousFocusEl, setPreviousFocusEl] = useState(null)

  function addTask(task){
    setTasks(prevState => [...prevState, task])
  }

  function removeTask(taskToRemove){
    setTasks(prevState => prevState.filter(task => task !== taskToRemove ))
  }

  function toggleTask(taskToToggle){
    setTasks(prevState => prevState.map(task => (
      task === taskToToggle ? {...task, checked: !task.checked} : task)))
  }

  function updateTask(taskToUpdate){
    setTasks(prevState => prevState.map(task => (
      task.id === taskToUpdate.id 
      ? {...task, name: taskToUpdate.name}
       : task)))
    closeEditMode()
  }

  function closeEditMode(){
    setIsEditing(false)
    previousFocusEl.focus()
  }

  function enterEditMode(task){
    setEditedTask(task)
    setIsEditing(true)
    setPreviousFocusEl(document.activeElement)
  }

  return (
    <div className="container">
      <header>
        <h1>my task list</h1>
      </header>
      {isEditing && <EditForm 
        editedTask={editedTask}
        updateTask={updateTask}
        closeEditMode={closeEditMode}
      />}
      <CustomForm addTask={addTask}/>
      {tasks && <TaskList tasks={tasks} 
      removeTask={removeTask}
      toggleTask = {toggleTask}
      enterEditMode={enterEditMode}
      />}
    </div>
  );
}

export default App;
