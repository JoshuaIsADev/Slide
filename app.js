'use strict';

//////DATA//////
const categories = [
  {
    name: 'Housing',
    value: 25,
    dollar: 0,
  },

  {
    name: 'Emergency fund',
    value: 0,
    dollar: 0,
  },

  {
    name: 'Debt',
    value: 0,
    dollar: 0,
  },

  {
    name: 'Savings',
    value: 15,
    dollar: 0,
  },

  {
    name: 'Charity',
    value: 10,
    dollar: 0,
  },

  {
    name: 'Food',
    value: 0,
    dollar: 0,
  },

  {
    name: 'Transportation',
    value: 12,
    dollar: 0,
  },

  {
    name: 'Entertainment',
    value: 0,
    dollar: 0,
  },
];

let sliderDollar = document.querySelectorAll('.dollar');
let sliders = document.querySelectorAll('.slider');
let userInput = document.querySelector('#input-amount');
let submitBtn = document.querySelector('#submit');
let userInputValue;

const categoryInput = document.querySelector('#category-input');
const listContainer = document.querySelector('#list-container');
const categoryAddBtn = document.querySelector('.category-add-btn');

//////ADD CATEGORY FUNCTION//////
// function addCategory() {
//   if (categoryInput.value === '') {
//     alert('You must add something');
//   } else {
//     let li = document.createElement('li');
//     // li.innerHTML = categoryInput.value + 'hello';
//     li.innerHTML = `
//       <p class="name">${categoryInput.value}</p>
//       <input type="range" id="slider9" class="slider" min="0" max="100" value="0"/>
//       <div class="category-result">
//         <p id="percent-value9" class="percentage"></p>
//         <p id="dollar-value9" class="dollar"></p>
//       </div>`;
//     listContainer.appendChild(li);
//   }
//   initializeSliders(sliders, userInput);
// }

//////ADD CATEGORY BTN EVENT LISTENER//////
// categoryAddBtn.addEventListener('click', function () {
//   addCategory();
//   initializeSliders(sliders, userInput);
// });

// userInput.addEventListener('input', function () {
//   let userInputValue = userInput.value;
//   userInputValue = userInputValue.replace(/[^0-9.]/g, '');
//   console.log(userInputValue);

//   // Update dollar values for all sliders
//   sliders.forEach(function (slider, index) {
//     let dollarOutput = document.querySelector('#dollar-value' + (index + 1));
//     dollarOutput.innerHTML =
//       '$' +
//       new Intl.NumberFormat('en-US').format(
//         parseFloat(userInput.value * (slider.value / 100)).toFixed(2)
//       );
//   });
// });

function initializeSliders(sliders, userInput) {
  sliders.forEach(function (slider, index) {
    let percentOutput = document.querySelector('#percent-value' + (index + 1));
    let dollarOutput = document.querySelector('#dollar-value' + (index + 1));

    function updateSliderValues() {
      let currentValue = parseInt(`${category.value}`);
      let totalValue = 0;

      sliders.forEach(function (s) {
        totalValue += parseInt(s.value);
      });

      if (totalValue > 100) {
        let excess = totalValue - 100;
        slider.value = currentValue - excess;
        percentOutput.innerHTML = slider.value + '%';
      } else {
        percentOutput.innerHTML = currentValue + '%';
      }

      // Update dollar values for this slider
      dollarOutput.innerHTML =
        '$' +
        new Intl.NumberFormat('en-US').format(
          parseFloat(userInput.value * (slider.value / 100)).toFixed(2)
        );
    }

    slider.oninput = updateSliderValues;
    updateSliderValues();
  });
}

initializeSliders(sliders, userInput);

////////////////////////////////////
////////////////////////////////////
//////USER AMOUNT EVENT LISTENER//////
userInput.addEventListener('input', function () {
  let userInputValue = userInput.value;
  userInputValue = userInputValue.replace(/[^0-9.]/g, '');

  if (!isNaN(userInputValue)) {
    categories.forEach(function (category) {
      category.dollar = userInputValue;
    });
    updateCategoryInfo(categories);
  }
});

////////////////////////////////////
////////////////////////////////////
//////SHOW CATEGORIES FUNCTION//////
const displayCategories = function (categories) {
  categories.forEach(function (category, i) {
    const html = `
      <li class="category-container">
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
      </li>
    `;
    listContainer.insertAdjacentHTML('beforeend', html);
  });
};

const updateCategoryInfo = function (categories) {
  categories.forEach(function (category, i) {
    const slider = document.getElementById(`slider${i}`);
    const percentValue = document.getElementById(`percent-value${i}`);
    const dollarValue = document.getElementById(`dollar-value${i}`);

    // Add an event listener to each slider
    slider.addEventListener('input', () => {
      let currentValue = parseInt(slider.value);
      let totalValue = 0;

      // Calculate the total value based on all sliders
      categories.forEach(function (cat, index) {
        if (i !== index) {
          totalValue += parseInt(
            document.getElementById(`slider${index}`).value
          );
        }
      });

      // Handle the totalValue logic
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

    // Initialize the DOM values when the page loads
    percentValue.textContent = `${slider.value}`;

    const dollarAmount = (slider.value / 100) * category.dollar;
    dollarValue.textContent = `$${Intl.NumberFormat('en-US').format(
      dollarAmount.toFixed(2)
    )}`;
  });
};

displayCategories(categories);
updateCategoryInfo(categories);
