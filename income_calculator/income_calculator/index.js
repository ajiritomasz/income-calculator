const type = document.querySelector("#type");
const amount = document.getElementById("amount");
const description = document.getElementById("description");
const list = document.querySelector(".list");
const expenseval = document.querySelector(".expense-value");
const incomeval = document.querySelector(".income-value");
const balanceval = document.querySelector(".balance-value");
const incomeform = document.getElementById("income-form");
const itemcontent = document.querySelector(".item-content");

let incomes = [
  //   {
  //     id: "uhiewudshirey",
  //     value: 40000,
  //     type: "income",
  //     description: "income 1",
  //   },
  //   {
  //     id: "hbjdhbwje",
  //     value: 30000,
  //     type: "income",
  //     description: "income 2",
  //   },
  //   {
  //     id: "bhgvsyt",
  //     value: 45000,
  //     type: "expense",
  //     description: "expense 1",
  //   },
];

const calculatetotals = () => {
  let expense = 0;
  let income = 0;

  incomes.map(amount => {
    if (amount.type === "expense") {
      expense += Number(amount.value);
    } else {
      income += Number(amount.value);
    }
  });

  expenseval.innerHTML = formatCurrency(expense);
  incomeval.innerHTML = formatCurrency(income);
  balanceval.innerHTML = formatCurrency(income - expense);
};

const handleSubmit = () => {
  incomes.push({
    id: String(Math.random()),
    value: amount.value,
    type: type.value,
    description: description.value,
  });
  calculatetotals();
  displayData();

  incomeform.reset();
};

const displayData = () => {
  let template = "";

  incomes.map((item, index) => {
    template += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.type}</td>
            <td style="color:${item.type === "income" ? "green" : "red"}">${formatCurrency(item.value)}</td>
            <td>${item.description}</td>
            <td><button class="delbutton" id="${item.id}">Remove Item</button></td>
        </tr>
    `;
  });

  itemcontent.innerHTML = template;
  saveData();
};

const removeItem = id => {
  const remenants = incomes.filter(income => income.id !== id);
  incomes = remenants;
  calculatetotals();
  displayData();
};

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(amount);
}

const saveData = () => {
  localStorage.setItem("incomes", JSON.stringify(incomes));
};
const loadData = () => {
  const saveditems = JSON.parse(localStorage.getItem("incomes"));
  incomes = saveditems && saveditems.length > 0 ? saveditems : incomes;
  calculatetotals();
  displayData();
};

incomeform.addEventListener("submit", e => {
  e.preventDefault();
  handleSubmit();
});

document.addEventListener("click", e => {
  if (e.target.classList.contains("delbutton")) {
    removeItem(e.target.id);
  }
});

document.addEventListener("DOMContentLoaded", loadData);
