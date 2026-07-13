import { Task } from "@/types/tasks";


type Props = {
  tasks: Task[];
  AddTask: (e: React.SubmitEvent<HTMLFormElement>) =>void;

  newDate: string;
  newTitle: string;
  editConcept: string;

  setNewDate: (value:string) => void;
  setNewTitle: (value:string) => void;
  setEditConcept: (value:string) => void;

  ArrangeTasks: () => void;

};

export default function TaskList({

  AddTask,

  newDate,
  newTitle,
  editConcept,

  setNewDate,
  setNewTitle,
  setEditConcept,

  ArrangeTasks,

}:Props){

    return (
        <>
            <form onSubmit = {AddTask} style = {{marginBottom: "8px"}} className="todo-form">
                <input
                    type = "date"
                    placeholder = "期日"
                    value = {newDate}
                    onChange = {(e) => setNewDate(e.target.value)}
                    style = {{padding: "8px", margin: "8px", width: "100px" }}
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
            <button type = "button" onClick={ArrangeTasks} style = {{marginBottom: "16px"}}>タスクを日付順に入れ替える</button>
        </>
    );
}
