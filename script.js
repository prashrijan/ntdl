const taskField = document.querySelector("#input-task");
const hourField = document.querySelector("#hours");
const addButton = document.querySelector("#button");
const entryListTable = document.querySelector("#good-list");
const badListTable = document.querySelector("#bad-list");
const errorMessage = document.querySelector(".error-msg");

errorMessage.classList.add("d-none");

const tasksList = [];

addButton.addEventListener("click", () => {
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

  tasksList.push(taskData);
  createTableRow();

  taskField.value = "";
  hourField.value = "";
});

const createTableRow = () => {
  entryListTable.innerHTML = "";
  badListTable.innerHTML = "";

  errorMessage.classList.add("d-none");
  errorMessage.classList.remove("d-block");

  tasksList.forEach(({ id, task, hour, isBad }, index) => {
    let goodTr = document.createElement("tr");
    goodTr.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${task}</td>
        <td>${hour} hrs</td>
        <td class="text-end">
            <button type="button" class="btn btn-danger me-1">
                <i class="ri-delete-bin-line"></i>
            </button>
            <button type="button" class="btn btn-success" onclick="toggleTaskType(${id})">
                <i class="ri-arrow-right-line"></i>
            </button>
        </td>
      `;

    let badTr = document.createElement("tr");
    badTr.innerHTML = `
      <th scope="row">${index + 1}</th>
        <td>${task}</td>
        <td>${hour} hrs</td>
        <td class="text-end">
            <button type="button" class="btn btn-warning" 
            onclick="toggleTaskType(${id})">
            <i class="ri-arrow-left-line"></i>
            </button>
            <button type="button" class="btn btn-danger me-1">
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
};

const toggleTaskType = (id) => {
  let task = tasksList.find((task) => task.id === id);

  task.isBad = task.isBad === true ? false : true;

  createTableRow();
};
