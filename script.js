const taskField = document.querySelector("#input-task");
const hourField = document.querySelector("#hours");
const addButton = document.querySelector("#button");
const entryListTable = document.querySelector("#good-list");
const badListTable = document.querySelector("#bad-list");

const tasksList = [];

addButton.addEventListener("click", () => {
  let task = taskField.value;
  let hour = hourField.value;

  if (!task && !hour) return;
  const taskData = {
    task,
    hour,
  };

  tasksList.push(taskData);
  createTableRow(tasksList);

  taskField.value = "";
  hourField.value = "";
  console.log(tasksList);
});

const createTableRow = (tasksList) => {
  entryListTable.innerHTML = "";

  tasksList.forEach(({ task, hour }, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${task}</td>
        <td>${hour}</td>
        <td class="text-end">
            <button type="button" class="btn btn-danger me-1">
                <i class="ri-delete-bin-line"></i>
            </button>
            <button type="button" class="btn btn-success">
                <i class="ri-arrow-right-line"></i>
            </button>
        </td>
      `;

    entryListTable.appendChild(tr);
  });
};
