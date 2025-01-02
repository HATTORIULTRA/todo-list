import TodoForm from "./components/TodoForm/TodoForm.tsx";
import TodoList from "./components/TodoList/TodoList.tsx";
import {useEffect, useState} from "react";
import TodoFilters from "./components/TodoFilters/TodoFilters.tsx";

const BASE_URL = 'https://easydev.club/api/v1';

function App() {
   const [todos, setTodos] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [newTodoValue, setNewTodoValue] = useState('');
   const [editedTodoValue, setEditedTodoValue] = useState('');
   const [selectedFilter, setSelectedFilter] = useState(0);

   const filtersArray = [
      {name: 'Все', count: todos.length},
      // @ts-ignore
      {name: 'в работе', count: todos.filter(todo => todo.isDone === false).length},
      // @ts-ignore
      {name: 'сделано', count: todos.filter(todo => todo.isDone === true).length}
   ];

   const [filter, setFilter] = useState(filtersArray[0].name);

   let selectedTasks = todos;

   if (filter === filtersArray[1].name) {
      // @ts-ignore
      selectedTasks = todos.filter(todo => todo.isDone === false)
   }

   if (filter === filtersArray[2].name) {
      // @ts-ignore
      selectedTasks = todos.filter(todo => todo.isDone === true)
   }

   const fetchTodos = async () => {
      const response = await fetch(`${BASE_URL}/todos`);
      const metaResponse = await response.json();
      const todosData = await metaResponse.data;
      setTodos(todosData);
      setIsLoading(false);
   }

   const handleSubmit = async (e: any) => {
      e.preventDefault();

      if (newTodoValue.length > 2 && newTodoValue.length < 64) {
         await fetch(`${BASE_URL}/todos`, {
            method: 'POST',
            body: JSON.stringify({
               "isDone": false,
               "title": newTodoValue
            }),
            headers: {
               'Content-type': 'application/json'
            },
         })
            .then(res => res.json())
            .then(data => {
               // @ts-ignore
               setTodos(prevState => [...prevState, data])
            });
      }
      setNewTodoValue('')
   }

   const deleteTodo = async (id: number) => {
      console.log(id);
      await fetch(`${BASE_URL}/todos/${id}`, {
         method: 'DELETE',
         headers: {
            'Content-type': 'application/json'
         },
      })
         .then((res) => {
            if (res.status === 200) {
               // @ts-ignore
               setTodos(prevState => [...prevState.filter(item => item.id !== id)])
            }
         })
   }

   const completeTodo = async (id: number) => {
      // @ts-ignore
      setTodos(todos.map(todo => {
         // @ts-ignore
         if (todo.id === id) {
            fetch(`${BASE_URL}/todos/${id}`, {
               method: 'PUT',
               // @ts-ignore
               body: JSON.stringify({...todo, isDone: !todo.isDone}),
               headers: {
                  'Content-type': 'application/json'
               },
            })
            // @ts-ignore
            return {...todo, isDone: !todo.isDone}
         }
         return todo;
      }))
   }

   const editTodoText = async (id: number) => {
      // @ts-ignore
      setTodos(todos.map(todo => {
         // @ts-ignore
         if (todo.id === id) {
            if (editedTodoValue.length > 2 && editedTodoValue.length < 64) {
               // @ts-ignore
               todo.title = editedTodoValue
               fetch(`${BASE_URL}/todos/${id}`, {
                  method: 'PUT',
                  // @ts-ignore
                  body: JSON.stringify({...todo, title: editedTodoValue}),
                  headers: {
                     'Content-type': 'application/json'
                  },
               })
            }
         }
         return todo;
      }))
      setEditedTodoValue('')
   }

   useEffect(() => {
      fetchTodos();
   }, []);

   const handleClickSelect = (i: number = 0) => {
      setSelectedFilter(i);
      setFilter(filtersArray[i].name)
   }

   return (
      <div className='app'>
         {/* @ts-ignore*/}
         <TodoForm
            handleSubmit={handleSubmit}
            newTodoValue={newTodoValue}
            setNewTodoValue={setNewTodoValue}
         />
         <TodoFilters
            handleClickSelect={handleClickSelect}
            selectedFilter={selectedFilter}
            filtersArray={filtersArray}
         />
         {isLoading
            ? <h1>Todos is loading...</h1>
            : <TodoList
               deleteTodo={deleteTodo}
               editTodoText={editTodoText}
               completeTodo={completeTodo}
               editedTodoValue={editedTodoValue}
               setEditedTodoValue={setEditedTodoValue}
               todos={selectedTasks}
            />}
      </div>
   )
}

export default App
