import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Task } from "@/types/tasks";

type Props = {
  task: Task;
  turnCheck: (id:number) => void;
  startEdit: (task:Task) => void;
  deleteTask: (id:number) => void;

  newDate: string;
  newTitle: string;
  editConcept: string;
  editId: number|null;

  setNewDate: (value:string) => void;
  setNewTitle: (value:string) =>void;
  setEditConcept: (value:string) =>void;

  EditConcept: (e: React.SubmitEvent<HTMLFormElement>) =>void;
};

export default function TaskItem({
    task,
    turnCheck,
    startEdit,
    deleteTask,

  newDate,
  newTitle,
  editConcept,
  editId,

  setNewDate,
  setNewTitle,
  setEditConcept,

  EditConcept,

}:Props){

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: task.id
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

  return (
            <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="task" >
                <span {...listeners}>
                    ≡
                </span>
                <input
                    type = "checkbox"
                    checked = {task.completed}
                    onChange = {() => turnCheck(task.id)}
                    style = {{marginRight: "8px"}}
                />
                {task.completed ? "✅" : "⬜️"}
                <span style={{ margin: "12px"}}>
                    {task.dueDate}
                </span>
                {task.title}
                <span style={{color:"rgba(0,0,0,0.5)", margin: "12px"}}>
                    {task.concept}
                </span>
                <button onClick={() => startEdit(task)} style={{marginRight: "12px"}}>
                    内容編集
                </button>
                <form onSubmit = {EditConcept} style = {{marginBottom: "16px", display: editId === task.id ? "block" : "none"}}>
                    <input
                        type = "date"
                        placeholder = "日付変更"
                        value = {newDate}
                        onChange = {(e) => setNewDate(e.target.value)}
                        style = {{padding: "8px", marginRight: "8px", width: "100px" }}
                    />
                    <input
                        type = "text"
                        placeholder = "タスク修正"
                        value = {newTitle}
                        onChange = {(e) => setNewTitle(e.target.value)}
                        style = {{padding: "8px", margin: "8px", width: "200px" }}
                    />
                    <input
                        type = "text"
                        placeholder = "内容の編集"
                        value = {editConcept}
                        onChange = {(e) => setEditConcept(e.target.value)}
                        style = {{padding: "8px", marginRight: "8px", width: "400px" }}
                    />
                    <button type = "submit">保存</button>
                </form>
                <button onClick={() => deleteTask(task.id)} style={{marginLeft: "8px"}}>
                タスク削除
                </button>
            </li>
  );
}