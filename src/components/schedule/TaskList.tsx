"use client";

import {
  DndContext,
} from '@dnd-kit/core';
import {
  SortableContext,
} from '@dnd-kit/sortable';

import TaskItem from "./TaskItem";
import { Task } from "@/types/tasks";

type Props = {
  tasks: Task[];
  turnCheck: (id:number) => void;
  startEdit: (task:Task) => void;
  deleteTask: (id:number) => void;

  newDate: string;
  newTitle: string;
  editConcept: string;
  editId: number|null;

  setNewDate: (value:string) => void;
  setNewTitle: (value:string) => void;
  setEditConcept: (value:string) => void;

  EditConcept: (e: React.SubmitEvent<HTMLFormElement>) =>void;

  reorderTasks: (oldIndex: number, newIndex: number) => void;

};

export default function TaskList({
    tasks,
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

  reorderTasks,

}:Props){

  const handleDragEnd = (event: any) => {

    const {
        active,
        over
    } = event;

    if(!over) return;

    if(active.id !== over.id){

        const oldIndex =
        tasks.findIndex(
            task => task.id === active.id
        );

        const newIndex =
        tasks.findIndex(
            task => task.id === over.id
        );

        reorderTasks(
            oldIndex,
            newIndex
        );
    }
  }

    return (
  <DndContext
    onDragEnd ={handleDragEnd}
  >

    <SortableContext items={tasks}>
            {tasks.map((task)=>(
                <TaskItem
                key={task.id}
                task={task}
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

                />
                
            ))}
    </SortableContext>

  </DndContext>
        
    );
}
