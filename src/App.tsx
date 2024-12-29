import TodoForm from "./components/TodoForm/TodoForm.tsx";
import TodoList from "./components/TodoList/TodoList.tsx";
import {useState} from "react";
import TodoFilters from "./components/TodoFilters/TodoFilters.tsx";

function App() {
   const [todos, setTodos] = useState([
      {id: 1, text: 'Fake todo number one', done: false},
      {id: 2, text: 'Learn HTML today', done: true},
      {id: 3, text: 'JavaScript is cool!', done: false},
      {id: 4, text: 'Fake todo number four', done: false},
      {id: 5, text: "Свежий ветер, звёздный свет, мечты ведут в далёкий след.", done: false},
   ]);

   return (
      <div className='app'>
         <TodoForm/>
         <TodoFilters />
         {/* @ts-ignore*/}
         <TodoList todos={todos} />
      </div>
   )
}

export default App
