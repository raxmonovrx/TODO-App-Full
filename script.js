const todoInput = document.querySelector("#todoInput"),
    inputForm = document.querySelector(".input-group"),
    todoAddBtn = document.querySelector(".add-btn"),
    modal = document.querySelector(".modal"),
    modalError = document.querySelector(".modalError"),
    ErrBtnOk = document.querySelector(".ErrBtnOk"),
    todoList = document.querySelector(".todo-list"),
    modalCon = document.querySelector(".modal-content"),
    editForm = document.querySelector(".editForm"),
    editInput = document.querySelector("#editInput");

let editItemId;
// check
let todos = JSON.parse(localStorage.getItem("list"))
    ? JSON.parse(localStorage.getItem("list"))
    : [];

if (todos.length) showTodos();
// Set todos to localStorage
function setTodos() {
    localStorage.setItem("list", JSON.stringify(todos));
}

// function date
function getDate() {
    const date = new Date();

    const min =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

    const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();

    const day = date.getDay() < 10 ? "0" + date.getDay() : date.getDay();

    const month =
        date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;

    const year = date.getFullYear();

    return `${hour}:${min} | ${day}.${month}.${year}`;
}
getDate();

// show Todos
function showTodos() {
    const todos = JSON.parse(localStorage.getItem("list"));
    todoList.innerHTML = "";
    todos.forEach((item, i) => {
        todoList.innerHTML += `
        <li class="task ${
            item.complated == true ? "complated" : ""
        }" ondblclick="setComplated(${i})" >
        <span class="todo-task">${item.text}</span>
        <div class="dataAddData">
            <span class="task-date">${item.time}</span> 
            <div class="btnTodo">
                <button class="edit-btn" 
                onclick="editTodo(${i}), openModal()">
                    Edit
                </button>
                <button class="delete-btn" onclick=(deleteTodo(${i}))>Delete</button>
            </div> 
        </div>
    </li>
        
        
        `;
    });
}

// get todos
inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = inputForm.todoInput.value.trim();
    e.target.reset();

    if (todoText.length > 0) {
        todos.push({ text: todoText, time: getDate(), complated: false });

        setTodos();
        showTodos();
        n;
    } else {
        modalError.style.display = "flex";
        setTimeout(() => {
            modalError.style.display = "none";
        }, 1500);
    }
});

// deleteTodo
function deleteTodo(id) {
    const deletedTodos = todos.filter((item, i) => {
        return i !== id;
    });

    todos = deletedTodos;
    setTodos();
    showTodos();
}

// setComplated
function setComplated(id) {
    const complatedTodos = todos.map((item, i) => {
        if (id == i) {
            return {
                ...item,
                complated: item.complated == true ? false : true,
            };
        } else {
            return { ...item };
        }
    });

    todos = complatedTodos;
    setTodos();
    showTodos();
}

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = editForm.editInput.value.trim();
    e.target.reset();

    if (todoText.length) {
        todos.splice(editItemId, 1, {
            text: todoText,
            time: getDate(),
            complated: false,
        });

        setTodos();
        showTodos();
        modal.style.display = "none";
    } else {
        modalError.style.display = "flex";
        setTimeout(() => {
            modalError.style.display = "none";
        }, 1500);
    }
});

// Edit TODO
function editTodo(id) {
    editItemId = id;
}
