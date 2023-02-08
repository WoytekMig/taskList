{
    const helloWorld = () => {
        console.log("Witam na zapleczu 😄!");
    };

    let tasks = [
        {
            content: "zrobić listę zadań",
            done: true,
        },
        {
            content: "otrzymać feedback",
            done: false,
        },
    ];

    let hideDoneTask = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
                done: false,
            },
        ];
        render();
    };

    const clearForm = () => {
        const newTaskElement = document.querySelector(".js-input");

        newTaskElement.value = "";
        newTaskElement.focus();
    };

    const doneAllTask = () => {
        tasks = tasks.map(task => ({ ...task, done: true }));
        render();
    };

    const toggleDoneTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleHideDone = () => {
        hideDoneTask = !hideDoneTask;
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const bindEvents = () => {
        const doneButtons = document.querySelectorAll(".js-doneButton");
        doneButtons.forEach((doneButton, taskIndex) => {
            doneButton.addEventListener("click", () => {
                toggleDoneTask(taskIndex);
            });
        });

        const removeButtons = document.querySelectorAll(".js-removeButton");
        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindButtonsEvents = () => {

        const doneAllElement = document.querySelector(".js-doneAll");
        if (doneAllElement) {
            doneAllElement.addEventListener("click", () => {
                doneAllTask();
            });
        };
        const toggleHideDoneElements = document.querySelector(".js-toggleShowing");
        if (toggleHideDoneElements) {
            toggleHideDoneElements.addEventListener("click", () => {
                toggleHideDone();
            });
        };
    };

    const renderTasks = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
            <li class="form__element ${task.done && hideDoneTask ? "section__hide" : ""}">
                 <button class="button button__done js-doneButton ">${task.done ? "✔" : ""}</button>
                 <article class = " ${task.done ? " form__taskDone " : ""}  form__task">
                 ${task.content}
                </article>
                <button class="button button__remove js-removeButton">🗑</button>
            </li> `;
        }
        document.querySelector(".js-taskList").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let htmlButtons = "";
        if (tasks.length > 0) {
            htmlButtons +=
                `<button class="section__button js-toggleShowing"> ${hideDoneTask ? "Pokaż" : "Ukryj"} ukończone</button>
        <button ${tasks.every(({ done }) => done) ? "disabled" : ""} class="section__button js-doneAll" >Ukończ wszystkie</button>`
        }
        document.querySelector(".js-buttonsDiv").innerHTML = htmlButtons;
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-input").value.trim();
        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
        clearForm();
    };

    const init = () => {
        helloWorld();
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}