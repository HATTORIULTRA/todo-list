import {FC, ReactNode, useState} from "react";
import {Todo} from "../../types/types.ts";
import s from "./TodoList.module.scss";
import TodoItem from "../TodoItem/TodoItem.tsx";

interface TodoListProps {
   todos: Todo[];
   deleteTodo: (id: number) => void;
   editTodoText: (id: number) => void;
   completeTodo: (id: number) => void;
   editedTodoValue: string;
   setEditedTodoValue: (value: string) => void;
}

const TodoList: FC<TodoListProps> = ({
                                        todos,
                                        deleteTodo,
                                        completeTodo,
                                        editTodoText,
                                        editedTodoValue,
                                        setEditedTodoValue,
                                     }): ReactNode => {
   const [todoIdForEdit, setTodoIdForEdit] = useState<number | null>(null);

   return (
      <ul className={s.todoList}>
         {todos.map((item) => (
            <TodoItem
               key={item.id}
               completeTodo={() => completeTodo(item.id)}
               deleteTodo={() => deleteTodo(item.id)}
               editTodoText={() => editTodoText(item.id)}
               editedTodoValue={editedTodoValue}
               setEditedTodoValue={setEditedTodoValue}
               todoIdForEdit={todoIdForEdit}
               setTodoIdForEdit={setTodoIdForEdit}
               {...item}
            />
         ))}
      </ul>
   );
};

export default TodoList;
