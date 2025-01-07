import {FC, FormEvent, ReactNode, useEffect, useState} from "react";

import TodoForm from "./components/TodoForm/TodoForm.tsx";
import TodoList from "./components/TodoList/TodoList.tsx";
import TodoFilters from "./components/TodoFilters/TodoFilters.tsx";
import {Filters, MetaResponse, Todo, TodoInfo, TodoRequest} from "./types/types.ts";

const BASE_URL = 'https://easydev.club/api/v1';

const App: FC = (): ReactNode => {
   const [todos, setTodos] = useState<Todo[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [newTodoValue, setNewTodoValue] = useState<string>('');
   const [editedTodoValue, setEditedTodoValue] = useState<string>('');
   const [selectedFilter, setSelectedFilter] = useState<number>(0);

   const filtersArray: Filters[] = [
      {name: 'Все', count: todos.length},
      {name: 'в работе', count: todos.filter(todo => todo.isDone === false).length},
      {name: 'сделано', count: todos.filter(todo => todo.isDone === true).length}
   ];

   const [filter, setFilter] = useState(filtersArray[0].name);

   let selectedTasks = todos;

   if (filter === filtersArray[1].name) {
      selectedTasks = todos.filter(todo => todo.isDone === false)
   }

   if (filter === filtersArray[2].name) {
      selectedTasks = todos.filter(todo => todo.isDone === true)
   }

   const fetchTodos = async (): Promise<void> => {
      const response = await fetch(`${BASE_URL}/todos`);
      const metaResponse: MetaResponse<Todo, TodoInfo> = await response.json();
      const todosData = metaResponse.data;
      setTodos(todosData);
      setIsLoading(false);
   }

   const handleSubmit = async (e: FormEvent): Promise<void> => {
      e.preventDefault();

      const newRequest: TodoRequest = {
         "isDone": false,
         "title": newTodoValue
      }

      if (newTodoValue.length > 2 && newTodoValue.length < 64) {
         await fetch(`${BASE_URL}/todos`, {
            method: 'POST',
            body: JSON.stringify(newRequest),
            headers: {
               'Content-type': 'application/json'
            },
         })
            .then(res => res.json())
            .then(data => {
               setTodos(prevState => [...prevState, data])
            });
      }
      setNewTodoValue('');
   }

   const deleteTodo = async (id: number): Promise<void> => {
      console.log(id);
      await fetch(`${BASE_URL}/todos/${id}`, {
         method: 'DELETE',
         headers: {
            'Content-type': 'application/json'
         },
      })
         .then((res) => {
            if (res.status === 200) {
               setTodos(prevState => [...prevState.filter(item => item.id !== id)])
            }
         })
   }

   const completeTodo = async (id: number): Promise<void> => {
      setTodos(todos.map(todo => {
         const newRequest: TodoRequest = {...todo, isDone: !todo.isDone}
         if (todo.id === id) {
            fetch(`${BASE_URL}/todos/${id}`, {
               method: 'PUT',

               body: JSON.stringify(newRequest),
               headers: {
                  'Content-type': 'application/json'
               },
            })
            return {...todo, isDone: !todo.isDone}
         }
         return todo;
      }));
   }

   const editTodoText = async (id: number) => {
      setTodos(todos.map(todo => {
         if (todo.id === id) {
            if (editedTodoValue.length > 2 && editedTodoValue.length < 64) {
               const newRequest: TodoRequest = {...todo, title: editedTodoValue};
               todo.title = editedTodoValue
               fetch(`${BASE_URL}/todos/${id}`, {
                  method: 'PUT',
                  body: JSON.stringify(newRequest),
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
