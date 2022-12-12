// Seleção de Elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

// Antigo nome da tarefa que deve ser salvo
let oldInputValue;

// FUNÇÕES!!!
const saveTodo = (text) => {
  //Função que cria uma nova tarefa

  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editeBtn = document.createElement("button");
  editeBtn.classList.add("edit-todo");
  editeBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editeBtn);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-todo");
  removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(removeBtn);

  //Adiciona essa tarefa na lista
  todoList.appendChild(todo);

  todoInput.value = "";
  todo.focus();
};

//Quando o editar ou cancelar é clicado, então muda quais partes do form aparecem
const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  });
};

// EVENTOS!!!
todoForm.addEventListener("submit", (e) => {
  //Esse evento salva a tarefa
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

//Evento que ocorre no documento inteiro para identificar o botão clicado
document.addEventListener("click", (e) => {
  //Váriavel que guarda o elemento atual (que foi clicado)
  const targetEl = e.target;

  //Variavel que define o elemento pai que receberá a função
  const parentEl = targetEl.closest("div");

  //Nome da tarefa para ser salvo
  let todoTitle;

  // Definindo o nome salvo da tarefa na barra de edição
  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  //Especifica qual o botão foi clicado, e então marca a tarefa como concluída
  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done"); //Toggle apenas troca a class
  }

  //Especifica qual o botão foi clicado, e então exclui a tarefa
  if (targetEl.classList.contains("remove-todo")) {
    parentEl.remove();
  }

  //Especifica qual o botão foi clicado, e então muda quais partes do form aparecem
  if (targetEl.classList.contains("edit-todo")) {
    toggleForms();

    //Deixa o nome da tarefa salvo
    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

//Quando o cancelar é clicado, então muda quais partes do form aparecem
cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    //Atualizar
    updateTodo(editInputValue);
  }

  toggleForms();
});
