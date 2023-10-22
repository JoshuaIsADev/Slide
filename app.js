let sliderDollar = document.querySelectorAll('.dollar');
let sliders = document.querySelectorAll('.slider');

sliders.forEach(function (slider, index) {
  let output = document.querySelector('#value' + (index + 1));
  output.innerHTML = slider.value + '%';

  slider.oninput = function () {
    let currentValue = parseInt(this.value);
    let totalValue = 0;

    sliders.forEach(function (slider) {
      totalValue += parseInt(slider.value);
    });

    if (totalValue > 100) {
      let excess = totalValue - 100;
      this.value = currentValue - excess;
      output.innerHTML = this.value + '%';
    } else {
      output.innerHTML = currentValue + '%';
    }
  };
});
