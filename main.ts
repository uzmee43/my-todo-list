#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleep = () => { return new Promise(resolve => setTimeout(resolve, 2000)); };
  
async function  wellcome(){
  let rainbowTiyle = chalkAnimation.rainbow("wellcome to the todoList page");
  await sleep();
  rainbowTiyle.stop();
} 
await wellcome(); 

let todoLists:string[] = [];
let condetion = true;
while(condetion){
    let ans = await inquirer.prompt([{
        type: "list",
        name: "select",
        message:chalk.blue.bold ("select your option"),
        choices: [
            "add a new list",
            "update list",
            "view",
            "delete a list",
            "exit"]
    }]);
    if(ans.select==="add a new list"){
        let addtask = await inquirer.prompt({
            type: "input",
            name: "todo",
            message:chalk.blue.bold ("enter your task"),
            validate: function (input){
                if(input.trim() === ""){
                    return chalk.red.bold ("please enter a task");
                }
                return true;  
            }
            }
        );
        if(addtask.todo.trim() !== ""){
        todoLists.push(addtask.todo);
        todoLists.forEach(todo => console.log(todo)
        )
    }}

    if(ans.select==="update list"){
        let updateList = await inquirer.prompt({
            type: "list",
            name: "todo",
            message:chalk.blue.bold ("update items in list"),
            choices: todoLists.map(item => item)
        })
        let addtask = await inquirer.prompt([{
            type: "input",
            name: "todo",
            message:chalk.blue.bold ("enter your updatelist")
        }]);
        let newtodo = todoLists.filter(val => val !== updateList.todo)
        todoLists = [...newtodo,addtask.todo];
        todoLists.forEach(todo => console.log(todo))
    }
    if(ans.select==="view"){
        let viewList = await inquirer.prompt({
            type: "list",
            name: "todo",
            message:chalk.blue.bold ("view items in list"),
            choices: todoLists.map(item => item)
        })
        console.log(viewList.todo);
     }
    
    if(ans.select==="delete a list"){
        let deleteList = await inquirer.prompt({
            type: "list",
            name: "todo",
            message:chalk.blue.bold ("delete items in list"),
            choices: todoLists.map(item => item)
        })
        let newtodo = todoLists.filter(val => val !== deleteList.todo)
        todoLists = [...newtodo];
        todoLists.forEach(todo => console.log(todo))  

    }
    if(ans.select==="exit"){
        condetion = false;
    }

}

