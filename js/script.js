{
    const helloWorld = () => {
        console.log("Witam na zapleczu 😄!");
    };

    const tasks = [
        {
            content: "zrobić listę zadań",
            done: true,
        },
        {
            content: "otrzymać feedback",
            done: false,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
            done: false,
        });
        render();
    };

    const clearForm = () => {
        const newTaskElement = document.querySelector(".js-input");

        newTaskElement.value = "";
        newTaskElement.focus();
    }

    const toggleDoneTask = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
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
    }


    const render = () => {
        let htmlString = "";

        for (const task of tasks) {

            htmlString += `
                <li class="form__element">
                     <button class="button button__done js-doneButton">${task.done ? "✔" : ""}</button>
                     <article class = " ${task.done ? " form__taskDone " : ""}  form__task">
                     ${task.content}
                    </article>
                    <button class="button button__remove js-removeButton">🗑</button>
                </li>
             `;
        }
        document.querySelector(".js-taskList").innerHTML = htmlString;

        bindEvents();
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