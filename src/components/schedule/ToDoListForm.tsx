// app/page.tsx
"use client";

import { useState } from "react";
import { Task } from "@/components/schedule/tasks";

export default function Home() {
  // useStateでタスクを管理
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, dueDate: "7/10", title: "スーパーに行く", concept: "買うものは野菜と肉", completed: true },
    { id: 2, dueDate: "7/10", title: "病院に行く", concept: "薬の相談", completed: false },
    { id: 3, dueDate: "7/10", title: "掃除をする", concept: "", completed: false },
  ]);

  const [editId, setEditId] = useState<number | null>(null);
  const [editConcept, setEditConcept] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const controldelete = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const turnCheck = (id:number) => {
    setTasks((prevTasks) =>
        prevTasks.map((task) =>
            task.id === id
            ? {...task, completed: !task.completed} :task
        )
    );
  }

  const startEdit = (task:Task) => {
    setEditId(task.id)
    setNewTitle(task.title)
    setEditConcept(task.concept)
    setNewDate(task.dueDate)
  }

  const EditConcept = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTitle.trim()) return;
    if (!newDate.trim()) return;

    setTasks((prevTasks) =>
        prevTasks.map((task) =>
            task.id===editId
            ? {...task, title:newTitle, concept:editConcept, dueDate: newDate}:task
        )
    );

    setEditId(null);
    setEditConcept("")
    setNewDate("")
  };

  //フォーム送信時に呼び出される関数
  const AddTask = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTitle.trim()) return;
    if (!newDate.trim()) return;

    const newTask: Task = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id +1 :1,
        dueDate: newDate.trim(),
        title: newTitle.trim(),
        concept: editConcept.trim(),
        completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);

    setNewDate("");
    setNewTitle("");
    setEditConcept("");
  };

  return (
    <main>
        <form onSubmit = {AddTask} style = {{marginBottom: "16px"}} className="todo-form">
            <input
                type = "text"
                placeholder = "期日"
                value = {newDate}
                onChange = {(e) => setNewDate(e.target.value)}
                style = {{padding: "8px", margin: "8px", width: "50px" }}
            />
            <input
                type = "text"
                placeholder = "新しいタスクを入力"
                value = {newTitle}
                onChange = {(e) => setNewTitle(e.target.value)}
                style = {{padding: "8px", margin: "8px", width: "200px" }}
            />
            <input
                type = "text"
                placeholder = "タスクの内容"
                value = {editConcept}
                onChange = {(e) => setEditConcept(e.target.value)}
                style = {{padding: "8px", marginRight: "8px", width: "400px" }}
            />
            <button type = "submit">追加</button>
        </form>

        <ul>
            {tasks.map((task) => (
            <li key={task.id} className="task" >
                <input
                    type = "checkbox"
                    checked = {task.completed}
                    onChange = {() => turnCheck(task.id)}
                    style = {{marginRight: "8px"}}
                />
                {task.completed ? "✅" : "⬜️"}
                <span style={{ margin: "12px"}}>
                    {task.dueDate && task.dueDate.toString()}
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
                        type = "text"
                        placeholder = "日付変更"
                        value = {newDate}
                        onChange = {(e) => setNewDate(e.target.value)}
                        style = {{padding: "8px", marginRight: "8px", width: "50px" }}
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
                <button onClick={() => controldelete(task.id)} style={{marginLeft: "8px"}}>
                タスク削除
                </button>
            </li>
            ))}
        </ul>
    </main>
  );
}