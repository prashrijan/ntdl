const taskField = document.querySelector("#input-task");
const hourField = document.querySelector("#hours");
const addButton = document.querySelector("#button");
const entryListTable = document.querySelector("#good-list");
const badListTable = document.querySelector("#bad-list");
const errorMessage = document.querySelector(".error-msg");
const totalHours = document.querySelector("#totalHours");
const badHours = document.querySelector("#badHours");
const toastLiveExample = document.getElementById("liveToast");
const toastMessage = document.getElementById("toastMessage");
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

errorMessage.classList.add("d-none");

const weeklyHours = 24 * 7;

let tasksList = [];

const getAndDisplayList = () => {
  let task = taskField.value;
  let hour = hourField.value;

  if (!task && !hour) {
    errorMessage.classList.add("d-block");
    errorMessage.classList.remove("d-none");
    return;
  }
  const taskData = {
    id: Date.now(),
    task,
    hour,
    isBad: false,
  };

  if (parseInt(taskData.hour) + calculateTotalHours() > weeklyHours) {
    alert(`Weekly Hours Exceeded`);
    return;
  }

  tasksList.push(taskData);

  createTableRow();

  taskField.value = "";
  hourField.value = "";
};

// rerender the table row each time
const createTableRow = () => {
  entryListTable.innerHTML = "";
  badListTable.innerHTML = "";

  errorMessage.classList.add("d-none");
  errorMessage.classList.remove("d-block");

  tasksList.forEach(({ id, task, hour, isBad }) => {
    let goodTr = document.createElement("tr");
    goodTr.classList.add("tr-row");
    goodTr.innerHTML = `
    <th scope="row"><input type="checkbox" onclick="toggleLineThrough(this)"></th>
    <td id="task">${task}</td>
    <td id="task">${hour} hrs</td>
    <td class="text-end">
    <button type="button" class="btn btn-danger me-1"
    onclick="deleteTask(${id})"
    >
    <i class="ri-delete-bin-line"></i>
    </button>
    <button type="button" class="btn btn-success" onclick="toggleTaskType(${id})">
    <i class="ri-arrow-right-line"></i>
    </button>
    </td>
    `;

    let badTr = document.createElement("tr");

    badTr.innerHTML = `
    <th scope="row"><input type="checkbox" onclick="toggleLineThrough(this)"></th>
    <td id="task">${task}</td>
    <td id="task">${hour} hrs</td>
    <td class="text-end">
    <button type="button" class="btn btn-warning" 
    onclick="toggleTaskType(${id})">
    <i class="ri-arrow-left-line"></i>
    </button>
    <button type="button" class="btn btn-danger me-1"
    onclick="deleteTask(${id})"
    >
    <i class="ri-delete-bin-line"></i>
    </button>
    </td>
    
    `;
    if (!isBad) {
      entryListTable.appendChild(goodTr);
    } else {
      badListTable.appendChild(badTr);
    }
  });

  totalHours.innerText = calculateTotalHours();

  badHours.innerText = calculateBadHours();
};

// convert the task type
const toggleTaskType = (id) => {
  let task = tasksList.find((task) => task.id === id);

  task.isBad = task.isBad === true ? false : true;

  createTableRow();
};

const deleteTask = (id) => {
  tasksList = tasksList.filter((task) => task.id !== id);
  createTableRow();
};

const toggleLineThrough = (checkbox) => {
  const row = checkbox.closest("tr");

  row.querySelectorAll("#task").forEach((item) => {
    item.style.textDecoration = checkbox.checked ? "line-through" : "none";
  });
};

const calculateTotalHours = () => {
  let totalHour = tasksList.reduce((acc, item) => {
    return acc + parseInt(item.hour);
  }, 0);
  return totalHour;
};

const calculateBadHours = () => {
  let badHour = tasksList.reduce((acc, item) => {
    if (item.isBad) {
      return acc + parseInt(item.hour);
    } else {
      return acc;
    }
  }, 0);

  return badHour;
};

addButton.addEventListener("click", getAndDisplayList);

addButton.addEventListener("click", () => {
  if (tasksList.length) {
    toastMessage.innerText = "Task Added Successfully.";
    toastBootstrap.show();
  } else {
    toastMessage.innerText = "Please Enter a task.";
    toastBootstrap.show();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    getAndDisplayList();
  }
});
