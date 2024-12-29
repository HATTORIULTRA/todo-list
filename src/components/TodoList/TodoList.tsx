import s from './TodoList.module.scss'
import TodoItem from "../TodoItem/TodoItem.tsx";

// @ts-ignore
const TodoList = ({todos}) => {
   return (
      <ul className={s.todoList}>
         {todos.map(item => (
            <TodoItem key={item.id} {...item} />
         ))}
      </ul>
   );
};

export default TodoList;