'use strict';

//////DATA//////
const categories = [
  {
    name: 'Housing',
    id: 1,
    value: 25,
    dollar: 0,
  },

  {
    name: 'Emergency fund',
    id: 2,
    value: 0,
    dollar: 0,
  },

  {
    name: 'Debt',
    id: 3,
    value: 0,
    dollar: 0,
  },

  {
    name: 'Savings',
    id: 4,
    value: 15,
    dollar: 0,
  },

  {
    name: 'Charity',
    id: 5,
    value: 10,
    dollar: 0,
  },

  {
    name: 'Food',
    id: 6,
    value: 12,
    dollar: 0,
  },

  {
    name: 'Transportation',
    id: 7,
    value: 10,
    dollar: 0,
  },

  {
    name: 'Entertainment',
    id: 8,
    value: 8,
    dollar: 0,
  },
];

let sliderDollar = document.querySelectorAll('.dollar');
let sliders = document.querySelectorAll('.slider');
let amountForm = document.querySelector('#amount-form');
let submitBtn = document.querySelector('#submit');
let categoriesData = categories;

const categoryFormContainer = document.querySelector(
  '#category-form-container'
);
const categoryForm = document.querySelector('#category-form');
const listContainer = document.querySelector('#list-container');
const categoryAddBtn = document.querySelector('.category-add-btn');

//////ADD CATEGORY FUNCTION//////
function addCategory(e) {
  e.preventDefault();
  if (categoryForm.value.trim() === '') {
    alert('Please add a text');
  } else {
    let amountValue = parseFloat(amountForm.value);
    const category = {
      name: categoryForm.value,
      id: generateID(),
      value: 0,
      dollar: (amountValue = 0),
    };

    categories.push(category);
    displayCategories(category, categories.length - 1);
    categoryForm.value = '';

    updateCategoryInfo(categories);
  }
}

//////GENERATE RANDOM ID//////
function generateID() {
  return Math.floor(Math.random() * 1000);
}

//////USER AMOUNT EVENT LISTENER//////
amountForm.addEventListener('input', function () {
  let amountFormValue = amountForm.value;
  amountFormValue = amountFormValue.replace(/[^0-9.]/g, '');

  if (!isNaN(amountFormValue)) {
    categories.forEach(function (category) {
      category.dollar = amountFormValue;
    });
    updateCategoryInfo(categories);
  }
});

//////SHOW LIST ON DOM//////
function displayCategories(category, i) {
  const item = document.createElement('li');
  item.classList.add('category-container');
  item.innerHTML = `
    <div class="category-info">
      <div class="percent-container">
        <p id="percent-value${i}" class="percentage">0</p>
        <p class="percent-sign">%</p>
      </div>
      <div class="category-title">
        <p class="name">${category.name}</p>
        <p id="dollar-value${i}" class="dollar">${category.dollar}</p>
      </div>
    </div>
    <div class="slider-border">
      <input type="range" id="slider${i}" class="slider" min="0" max="100" value="${category.value}"/>
    </div>
  `;
  listContainer.appendChild(item);
}

//INIT APP//
function init() {
  listContainer.innerHTML = '';

  categoriesData.forEach(displayCategories);
}

init();

categoryFormContainer.addEventListener('submit', addCategory);

//////PERCENTAGE AND SLIDER FUNCTION//////
const updateCategoryInfo = function (categories) {
  categories.forEach(function (category, i) {
    const slider = document.getElementById(`slider${i}`);
    const percentValue = document.getElementById(`percent-value${i}`);
    const dollarValue = document.getElementById(`dollar-value${i}`);

    slider.addEventListener('input', () => {
      let currentValue = parseInt(slider.value);
      let totalValue = 0;

      categories.forEach(function (cat, index) {
        if (i !== index) {
          totalValue += parseInt(
            document.getElementById(`slider${index}`).value
          );
        }
      });

      if (totalValue + currentValue > 100) {
        let excess = totalValue + currentValue - 100;
        slider.value = currentValue - excess;
        percentValue.textContent = `${slider.value}`;
      } else {
        percentValue.textContent = currentValue;
      }

      const dollarAmount = (slider.value / 100) * category.dollar;
      dollarValue.textContent = `$${Intl.NumberFormat('en-US').format(
        dollarAmount.toFixed(2)
      )}`;
    });

    percentValue.textContent = `${slider.value}`;

    const dollarAmount = (slider.value / 100) * category.dollar;
    dollarValue.textContent = `$${Intl.NumberFormat('en-US').format(
      dollarAmount.toFixed(2)
    )}`;
  });
};

updateCategoryInfo(categories);
