let sliderDollar = document.querySelectorAll('.dollar');
let sliders = document.querySelectorAll('.slider');
let userInput = document.querySelector('#user-input');
let submitBtn = document.querySelector('#submit');
let userInputValue;

// submitBtn.addEventListener('click', function () {
//   if (userInput) {
//     userInputValue = parseInt(userInput.value);
//     return userInputValue;
//   }
// });

userInput.addEventListener('input', function () {
  let userInputValue = userInput.value;
  userInputValue = userInputValue.replace(/[^0-9.]/g, '');
  console.log(userInputValue);

  // Update dollar values for all sliders
  sliders.forEach(function (slider, index) {
    let dollarOutput = document.querySelector('#dollar-value' + (index + 1));
    dollarOutput.innerHTML =
      '$' + parseInt(userInputValue * (slider.value / 100));
  });
});

// SLIDER FUNCTION
sliders.forEach(function (slider, index) {
  let percentOutput = document.querySelector('#percent-value' + (index + 1));
  let dollarOutput = document.querySelector('#dollar-value' + (index + 1));
  percentOutput.innerHTML = slider.value + '%';
  dollarOutput.innerHTML =
    '$' + parseInt(userInput.value * (slider.value / 100));

  slider.oninput = function () {
    let currentValue = parseInt(this.value);
    let totalValue = 0;

    sliders.forEach(function (slider) {
      totalValue += parseInt(slider.value);
    });

    if (totalValue > 100) {
      let excess = totalValue - 100;
      this.value = currentValue - excess;
      percentOutput.innerHTML = this.value + '%';
    } else {
      percentOutput.innerHTML = currentValue + '%';
    }
    // Update dollar values for this slider
    dollarOutput.innerHTML =
      '$' + parseInt(userInput.value * (slider.value / 100));
  };
});
