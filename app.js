'use strict';

//////DEFAULT DATA//////
let categories = [
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

//////PERCENTAGE AND SLIDER FUNCTION//////
const updateCategoryInfo = function (categories) {
  categories.forEach(function (category, i) {
    const slider = document.getElementById(`slider${i}`);
    const percentValue = document.getElementById(`percent-value${i}`);
    const dollarValue = document.getElementById(`dollar-value${i}`);

    if (slider) {
      slider.addEventListener('input', () => {
        let currentValue = parseInt(slider.value);
        let totalValue = 0;
        categories.forEach(function (cat, index) {
          if (slider && parseInt(slider.id.slice(6)) !== index) {
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
    }
  });
};

//////SHOW LIST ON DOM//////
function displayCategories(category, i) {
  const item = document.createElement('li');
  item.classList.add('category-container');
  item.innerHTML = `
    <div class="category-row">
      <div class="category-column">
        <button onclick="removeCategory(${category.id})">
          <i class="fa-solid fa-x fa-xs d-flex align-items-center" ></i>
        </button>
        <div class="name-container">
          <h3>${category.name}</h3>
        </div>
      </div>
      <div class="category-column">
        <div class="percent-container">
          <p id="percent-value${i}" class="percentage">0</p>
          <p>%</p>
        </div>
        <div class="dollar-container">
          <p id="dollar-value${i}" class="dollar font-bold">${category.dollar}</p>
        </div>
      </div>
    </div>
    
    <div class="category-row">
      <div class="slider-border">
        <input type="range" id="slider${i}" class="slider" min="0" max="100" value="${category.value}"/>
      </div>
    </div>
    
    
  

    
  `;
  listContainer.appendChild(item);
}

//////ADD CATEGORY FUNCTION//////
function addCategory(e) {
  e.preventDefault();
  if (categoryForm.value.trim() === '') {
    alert('Please add a text');
  } else {
    let amountValue = 0;
    if (amountForm.value.trim() !== '') {
      amountValue = parseFloat(amountForm.value);
    }
    const category = {
      name: categoryForm.value,
      id: generateID(),
      value: 0,
      dollar: amountValue,
    };

    categories.push(category);
    displayCategories(category, categories.length - 1);
    categoryForm.value = '';

    updateCategoryInfo(categories);
  }
}

//////DELETE CATEGORY FUNCTION//////
function removeCategory(id) {
  // console.log(`removed: ${id}`);

  const indexToRemove = categories.findIndex((category) => category.id === id);

  if (indexToRemove !== -1) {
    categories.splice(indexToRemove, 1);

    const categoryElement = document.querySelector(`#slider${indexToRemove}`)
      .parentNode.parentNode.parentNode;
    listContainer.removeChild(categoryElement);

    const sliders = document.querySelectorAll('.slider');
    const percentValues = document.querySelectorAll('.percentage');
    const dollarValues = document.querySelectorAll('.dollar');

    sliders.forEach((slider, i) => {
      slider.id = `slider${i}`;
      percentValues[i].id = `percent-value${i}`;
      dollarValues[i].id = `dollar-value${i}`;
    });

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

categoryFormContainer.addEventListener('submit', addCategory);

//////INIT APP//////
function init() {
  listContainer.innerHTML = '';
  categoriesData.forEach(displayCategories);
}

init();
updateCategoryInfo(categories);
