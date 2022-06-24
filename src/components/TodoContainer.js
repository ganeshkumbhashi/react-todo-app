import React from "react";

import TodosList from  "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo";

import {v4 as uuidv4} from "uuid";

class TodoContainer extends React.Component
{
   state = {

    todos : [
        {
            id: uuidv4(),
            title: "Setup dev environment",
            completed: true
        },
        {
            id: uuidv4(),
            title: "Setup sit environment",
            completed: false
        },
        {
            id: uuidv4(),
            title: "Setup uat environment",
            completed: false
        }
    ]

   };

   setUpdate = (updatedTitle, id) => {
       console.log(updatedTitle,id);
       this.setState({
           todos: this.state.todos.map(todo => {
               if(todo.id === id)
               {
                   todo.title = updatedTitle
               }
               return todo;
           })
       })
   }

   deleteItem = id => {
       this.setState({
           todos: [
               ...this.state.todos.filter(todo => {
                return todo.id !== id   
               })
            ]
       });
      
   };

   addTodoItem = (title) => {
    const newTodo = {
        id : uuidv4(),
        title: title,
        completed: false
    }
    this.setState({
        todos: [...this.state.todos,newTodo]
    });
   };

   handleChange = (id) => {
      this.setState(prevState => (
          {
              todos: prevState.todos.map( todo => {
                  if(todo.id === id)
                  {
                      return{
                          ...todo,
                          completed : !todo.completed,
                      }
                      
                  }
                  return todo;
              }),
              
          }
      ))
   }

    render(){
        return (
            <div className="container">
               <div className="inner">
                   <Header/>
                   <InputTodo addTodoItem={this.addTodoItem}/>
                   <TodosList todos={this.state.todos} handleChangeProps={this.handleChange} handleDelete={this.deleteItem} handleUpdate={this.setUpdate} />
               </div>   
            </div>   
        );
    }
}

export default TodoContainer