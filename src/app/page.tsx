"use client";

import dynamic from "next/dynamic"

import TaskForm from "@/components/schedule/TaskForm"
import { useTasks } from "@/hooks/useTasks";

const TaskList = dynamic(
  () => import("@/components/schedule/TaskList"),
  {
    ssr:false
  }
);

export default function Home() {
  // useStateでタスクを管理

  const {
        tasks,
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
  } =useTasks()

  return (
    <main>
      <>
        <TaskForm
                tasks={tasks}
                AddTask={AddTask}
                newDate={newDate}
                newTitle={newTitle}
                editConcept={editConcept}

                setNewDate={setNewDate}
                setNewTitle={setNewTitle}
                setEditConcept={setEditConcept}

                ArrangeTasks={ArrangeTasks}
        />
      </>

      <>
        <TaskList
                tasks={tasks}
                turnCheck={turnCheck}
                startEdit={startEdit}
                deleteTask={deleteTask}
                newDate={newDate}
                newTitle={newTitle}
                editConcept={editConcept}
                editId={editId}

                setNewDate={setNewDate}
                setNewTitle={setNewTitle}
                setEditConcept={setEditConcept}

                EditConcept={EditConcept}
                reorderTasks={reorderTasks}
        />
      </>
    </main>
  );
}