// app/page.tsx
"use client";

import { useState } from "react";
import { Task } from "@/components/schedule/tasks";

export default function Home() {
  // useStateでタスクを管理
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "スーパーに行く", concept: "買うものは野菜と肉", completed: true },
    { id: 2, title: "病院に行く", concept: "薬の相談", completed: false },
    { id: 3, title: "掃除をする", concept: "", completed: false },
  ]);

  const [editId, setEditId] = useState<number | null>(null);
  const [editConcept, setEditConcept] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const controldelete = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const startEdit = (task:Task) => {
    setEditId(task.id)
    setEditConcept(task.concept)
  }
    

  const EditConcept = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTasks((prevTasks) =>
        prevTasks.map((task) =>
            task.id===editId
            ? {...task, concept:editConcept}:task
        )
    );

    setEditId(null);
    setEditConcept("")
  };

    

  //フォーム送信時に呼び出される関数
  const AddTask = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTitle.trim()) return;

    const newTask: Task = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id +1 :1,
        title: newTitle.trim(),
        concept: "",
        completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);

    setNewTitle("");
  };

  return (
    <main>
        <form onSubmit = {AddTask} style = {{marginBottom: "16px"}}>
            <input
                type = "text"
                placeholder = "新しいタスクを入力"
                value = {newTitle}
                onChange = {(e) => setNewTitle(e.target.value)}
                style = {{padding: "8px", marginRight: "8px", width: "400px" }}
            />
            <button type = "submit">追加</button>
        </form>

        <ul>
            {tasks.map((task) => (
            <li key={task.id}>
                {task.completed ? "✅" : "⬜️"} {task.title}
                <p className="text-black/50">
                    {task.concept}
                </p>
                <button onClick={() => startEdit(task)} style={{marginRight: "8px"}}>
                    内容編集
                </button>
                <form onSubmit = {EditConcept} style = {{marginBottom: "16px", display: editId === task.id ? "block" : "none"}}>
                    <input
                        type = "text"
                        placeholder = "内容の編集"
                        value = {editConcept}
                        onChange = {(e) => setEditConcept(e.target.value)}
                        style = {{padding: "8px", marginRight: "8px", width: "220px" }}
                    />
                    <button type = "submit">保存</button>
                </form>
                <button onClick={() => controldelete(task.id)} style={{marginLeft: "8px"}}>
                削除
                </button>
            </li>
            ))}
        </ul>
    </main>
  );
}
