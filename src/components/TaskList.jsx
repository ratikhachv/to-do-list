import TaskItem from './TaskItem'

import styles from './TaskList.module.css'

function TaskList({ tasks, removeTask, toggleTask, enterEditMode }) {


  return (
    <ul className={styles.tasks}>
        {tasks.sort((a, b) => b.id - a.id).map(task => (
            <TaskItem
             key={task.id}
             task={task}
             removeTask={removeTask}
             toggleTask={toggleTask}
             enterEditMode={enterEditMode}
            />
        ))
        }
    </ul>
  )
}

export default TaskList