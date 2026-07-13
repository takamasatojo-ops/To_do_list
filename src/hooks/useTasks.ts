import { useState } from "react";


import { Task } from "@/types/tasks";

export function useTasks(){

  const [editId, setEditId] = useState<number | null>(null);
  const [editConcept, setEditConcept] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, dueDate: "2026-07-09", title: "スーパーに行く", concept: "買うものは野菜と肉", completed: true },
    { id: 2, dueDate: "2026-07-15", title: "病院に行く", concept: "薬の相談", completed: false },
    { id: 3, dueDate: "2026-08-02", title: "掃除をする", concept: "", completed: false },
  ]);

  const reorderTasks = (
    oldIndex:number,
    newIndex:number
  )=> {
    setTasks((prev) => {
      const newTasks = [...prev];

      const [movedTask] = newTasks.splice(oldIndex,1);

      newTasks.splice(newIndex,0,movedTask);

      return newTasks;
    });

  };

  const sortedTasks = [...tasks].sort((a, b) =>
    a.dueDate.localeCompare(b.dueDate)
);

  const ArrangeTasks = () => {
    setTasks(sortedTasks);
  }

    const deleteTask = (id:number) => {
        setTasks((prev) =>
            prev.filter((task) => task.id !== id)
        );
    };

  const turnCheck = (id:number) => {
    setTasks((prev) =>
        prev.map((task) =>
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

    setTasks((prev) =>
        prev.map((task) =>
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
        id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) +1 :1,
        dueDate: newDate.trim(),
        title: newTitle.trim(),
        concept: editConcept.trim(),
        completed: false,
    };

    setTasks((prev) => [...prev, newTask]);

    setNewDate("");
    setNewTitle("");
    setEditConcept("");
  };

    return {
        tasks,
        sortedTasks,
        editId,
        editConcept,
        newTitle,
        newDate,
        setEditConcept,
        setNewDate,
        setNewTitle,
        deleteTask,
        turnCheck,
        startEdit,
        EditConcept,
        AddTask,
        ArrangeTasks,
        reorderTasks,
    };
}