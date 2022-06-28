import React, { useState,useEffect } from "react";

import TodosList from  "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo";


import {v4 as uuidv4} from "uuid";

const TodoContainer = () => 
{
   
   const [todos, setTodos] = useState(getInitialTodos())

   function getInitialTodos()  {
        const temp = localStorage.getItem("todos")
        const savedTodos = JSON.parse(temp)
        return savedTodos || []
   }

   const setUpdate = (updatedTitle, id) => {
       console.log(updatedTitle,id);
       setTodos(
           todos.map(todo => {
               if(todo.id === id)
               {
                   todo.title = updatedTitle
               }
               return todo;
           })
       )
   }

   const deleteItem = id => {
      setTodos([
               ...todos.filter(todo => {
                return todo.id !== id   
               })
            ]
       );
      
   };

   const addTodoItem = title => {
    const newTodo = {
        id : uuidv4(),
        title: title,
        completed: false
    }
    setTodos([...todos,newTodo]);
   };

   const handleChange = id => {
      setTodos(prevState => (
          prevState.todos.map( todo => {
                  if(todo.id === id)
                  {
                      return{
                          ...todo,
                          completed : !todo.completed,
                      }
                      
                  }
                  return todo;
              })
      ))
   }


   useEffect(() => {
        const temp = JSON.stringify(todos)
        localStorage.setItem("todos", temp)
  },[todos])


   

  
        return (
            <div className="container">
               <div className="inner">
                   <Header/>
                   <InputTodo addTodoItem={addTodoItem}/>
                   <TodosList todos={todos} handleChangeProps={handleChange} handleDelete={deleteItem} handleUpdate={setUpdate} />
               </div>   
            </div>   
        );
    
}

export default TodoContainer