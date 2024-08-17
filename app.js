// Select elements
const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
const formStepsLi = [...multiStepForm.querySelectorAll("[data-step-li]")];
const buttonCheck = document.querySelectorAll("#button");
const boxChose = document.querySelectorAll(".boxs-chose");
const boxMonthly = document.querySelector(".boxs-monthes");
const boxYearly = document.querySelector(".boxs-years");
const yearsPrice = document.querySelector(".yearsprice");
const monthPrice = document.querySelector(".montheprice");
const yearText = document.querySelector(".yearText");
const monthText = document.querySelector(".monthText");
const totalMonth = document.querySelector(".totla_month");
const totalYear = document.querySelector(".totla_year");
const checkbox = document.getElementById('billing-toggle');
const boxAddOns = document.querySelectorAll(".box_add-ons");
const confirmBtn = document.getElementById("confirmBtn");
const thankYouPage = document.getElementById("thank_you_page");
const step4 = document.querySelector(".step_4");
const form = document.getElementById("personal-info-form");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");
const monthsBoxes = document.querySelectorAll('.boxs-monthes .boxs-chose');
const yearsBoxes = document.querySelectorAll('.boxs-years .boxs-chose');
const monthlyAddOnsContainer = document.getElementById('monthly-add-ons');
const yearlyAddOnsContainer = document.getElementById('yearly-add-ons');
const totalPriceYearlyElement = document.querySelector(".total_price_yearly");
const totalPriceMonthlyElement = document.querySelector(".total_price_monthly");

// Initialize current steps
let currentStep = formSteps.findIndex(step => step.classList.contains("active")) || 0;
let currentStepLi = formStepsLi.findIndex(step => step.classList.contains("step-inactive")) || 0;

// Function to show the current step
function showCurrentStep() {
  formSteps.forEach((step, index) => step.classList.toggle("active", index === currentStep));
}

// Function to show the current step for list items
function showCurrentStepLi() {
  formStepsLi.forEach((step, index) => {
    step.classList.toggle("step-inactive", index === currentStepLi);
    step.classList.toggle("step-active", index !== currentStepLi);
  });
}

// Initial display
showCurrentStep();
showCurrentStepLi();

// Event listener for navigation
multiStepForm.addEventListener("click", e => {
  if (!form.classList.contains("error")) {
    if (e.target.matches("[data-next]")) {
      currentStep = Math.min(formSteps.length - 1, currentStep + 1);
      currentStepLi = Math.min(formStepsLi.length - 1, currentStepLi + 1);
    } else if (e.target.matches("[data-before]")) {
      currentStep = Math.max(0, currentStep - 1);
      currentStepLi = Math.max(0, currentStepLi - 1);
    }
    showCurrentStep();
    showCurrentStepLi();
  }
});

// Validate form inputs
buttonCheck.forEach(button => {
  button.addEventListener('click', validateForm);
});

function validateForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  const phonePattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  let hasError = false;

  // Clear previous error messages
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  form.classList.remove("error");

  // Validate Name
  if (name === "") {
    nameError.textContent = "Name cannot be empty.";
    hasError = true;
  }

  // Validate Email
  if (email === "") {
    emailError.textContent = "Email cannot be empty.";
    hasError = true;
  } else if (!emailPattern.test(email)) {
    emailError.textContent = "Invalid email format.";
    hasError = true;
  }

  // Validate Phone
  if (phone === "") {
    phoneError.textContent = "Phone number cannot be empty.";
    hasError = true;
  } else if (!phonePattern.test(phone)) {
    phoneError.textContent = "Invalid phone number format.";
    hasError = true;
  }

  // Add error class if there are validation errors
  if (hasError) {
    form.classList.add("error");
  }
}

// Handle billing toggle
function handleToggle() {
  if (checkbox.checked) {
    // Yearly
    boxMonthly.classList.add("hidden");
    boxYearly.classList.remove("hidden");
    monthPrice.classList.add("hidden");
    yearsPrice.classList.remove("hidden");
    yearText.classList.add("text-[#2d3d55]", "font-medium");
    monthText.classList.remove("text-[#2d3d55]", "font-medium");
    totalMonth.classList.add("hidden");
    totalYear.classList.remove("hidden");
  } else {
    // Monthly
    boxMonthly.classList.remove("hidden");
    boxYearly.classList.add("hidden");
    monthPrice.classList.remove("hidden");
    yearsPrice.classList.add("hidden");
    yearText.classList.remove("text-[#2d3d55]", "font-medium");
    monthText.classList.add("text-[#2d3d55]", "font-medium");
    totalMonth.classList.remove("hidden");
    totalYear.classList.add("hidden");
  }
  updateTotalPrice(); // Update total price on toggle
}

window.onload = function() {
  checkbox.addEventListener('change', handleToggle);
  // Initial call to set the correct state based on the checkbox's initial state
  handleToggle();
};

// Handle box selection and color change
function selectPlan(element) {
  // Uncheck all radio inputs
  document.querySelectorAll('input[type="radio"]').forEach(radioInput => radioInput.checked = false);

  // Check the radio input within the clicked element
  element.querySelectorAll('input[type="radio"]').forEach(radioInput => radioInput.checked = true);
}

function changeColor(element, boxes) {
  boxes.forEach(box => {
    box.classList.remove("bg-blue-50", "border-[#19355b]");
    box.classList.add("border-[#bababf]");
    
  });

  element.classList.add("bg-blue-50", "border-[#19355b]");
  element.classList.remove("border-[#bababf]");
}
document.addEventListener('DOMContentLoaded', function () {
  // Set initial state for boxes
  function setInitialState(boxes) {
    boxes.forEach(box => {
      if (box.querySelector('input[type="radio"]').checked) {
        changeColor(box, boxes);
      }
    });
  }

  setInitialState(monthsBoxes);
  setInitialState(yearsBoxes);

  // Add event listeners
  monthsBoxes.forEach(box => {
    box.addEventListener('click', () => changeColor(box, monthsBoxes));
  });

  yearsBoxes.forEach(box => {
    box.addEventListener('click', () => changeColor(box, yearsBoxes));
  });

  // Set the first radio input checked by default
  const firstRadioInput = document.querySelector('.boxs-monthes input[type="radio"]');
  if (firstRadioInput) {
    firstRadioInput.checked = true;
  }
});

// Handle confirmation and thank you page
confirmBtn.addEventListener('click', () => {
  step4.classList.add("hidden");
  step4.classList.remove("active");
  thankYouPage.classList.remove("hidden");
});

// Handle add-ons checkbox
function handleAddOnChange(event) {
  const checkbox = event.target;
  const boxAddOns = checkbox.closest('.box_add-ons');
  
  // Ensure the boxAddOns element is found
  if (!boxAddOns) return;

  const nameElement = boxAddOns.querySelector('.nameAdd_ons');
  const priceElement = boxAddOns.querySelector('.priceAdd_ons');

  const name = nameElement ? nameElement.textContent : '';
  const price = priceElement ? priceElement.textContent : '';

  // Determine if it's a monthly or yearly add-on
  const isMonthly = price.includes('/mo');

  if (checkbox.checked) {
    console.log(`Checked - Name: ${name}, Price: ${price}`);

    // Choose the container based on the add-on type
    const container = isMonthly ? monthlyAddOnsContainer : yearlyAddOnsContainer;

    // Check if the add-on already exists
    const existingAddOn = Array.from(container.querySelectorAll('.your_checked_add_name'))
      .find(div => div.textContent === name);

    if (!existingAddOn) {
      // Create and add the checked add-on to the container
      const addOnDiv = document.createElement('div');
      addOnDiv.className = 'flex justify-between items-center';
      addOnDiv.innerHTML = `
        <p class="your_checked_add_name text-[#9b9ca2]">${name}</p>
        <span class="your_checked_add_price text-[#29344a] font-medium">${price}</span>
      `;
      container.appendChild(addOnDiv);
    } else {
      // Update the existing add-on
      existingAddOn.nextElementSibling.textContent = price;
    }
  } else {
    console.log(`Unchecked - Name: ${name}, Price: ${price}`);

    // Choose the container based on the add-on type
    const container = isMonthly ? monthlyAddOnsContainer : yearlyAddOnsContainer;
    
    // Remove the unchecked add-on from the container
    const addOnDivs = container.querySelectorAll('.your_checked_add_name');
    addOnDivs.forEach(div => {
      if (div.textContent === name) {
        container.removeChild(div.parentElement);
      }
    });
  }

  updateTotalPrice(); // Update total price when add-ons are changed
}

// Function to calculate and update the total price
function updateTotalPrice() {
  let totalMonthly = 0;
  let totalYearly = 0;

  // Calculate total monthly
  monthlyAddOnsContainer.querySelectorAll('.your_checked_add_price').forEach(priceSpan => {
    const price = parseFloat(priceSpan.textContent.replace('$', '').replace('/mo', '').trim());
    if (!isNaN(price)) {
      totalMonthly += price;
    }
  });

  // Calculate total yearly
  yearlyAddOnsContainer.querySelectorAll('.your_checked_add_price').forEach(priceSpan => {
    const price = parseFloat(priceSpan.textContent.replace('$', '').replace('/yr', '').trim());
    if (!isNaN(price)) {
      totalYearly += price;
    }
  });

  // Update the displayed total price based on the billing toggle
  if (checkbox.checked) {
    totalPriceYearlyElement.textContent = totalYearly.toFixed(2);
    totalPriceMonthlyElement.textContent = (totalYearly / 12).toFixed(2); // Example conversion
  } else {
    totalPriceMonthlyElement.textContent = totalMonthly.toFixed(2);
    totalPriceYearlyElement.textContent = (totalMonthly * 12).toFixed(2); // Example conversion
  }
}

// Attach event listeners to all checkboxes
document.querySelectorAll('input[name="add-on"]').forEach(checkbox => {
  checkbox.addEventListener('change', handleAddOnChange);

  // Trigger change event to handle the initial state
  if (checkbox.checked) {
    checkbox.dispatchEvent(new Event('change'));
  }
});

// Handle add-ons checkbox
document.querySelectorAll('.box_add-ons input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const box = this.closest('.box_add-ons');
    if (this.checked) {
      box.classList.add('border-[#544f97]', 'bg-blue-50');
    } else {
      box.classList.remove('border-[#544f97]', 'bg-blue-50');
    }
  });

  // Initial state check
  if (checkbox.checked) {
    checkbox.dispatchEvent(new Event('change'));
  }
});

document.querySelectorAll('.boxs-chose').forEach(box => {
  box.addEventListener('click', function() {
    const name = this.querySelector('.nameBox').textContent;
    const price = this.querySelector('.princBox').textContent;
    // console.log(Plan: ${name}, Price: ${price});
    
    document.querySelector('.nameYourcheckY').textContent = `${name} (Yearly)`;
    document.querySelector('.nameYourcheckM').textContent = `${name} (Monthly)`;

    document.querySelectorAll('.priceYourcheck').forEach(element => {
      element.textContent = price;
    });
  });
});