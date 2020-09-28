export default class Validitor {
  static isValid(inputs) {
    const notValidEl = [...inputs].find((el) => el.classList.contains("error"));
    if (notValidEl) {
      notValidEl.focus();
      return false;
    }
    return true;
  }

  static removeError(inputs) {
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("error");
    }
  }

  static checkValInputs(form, fields) {
    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].value) {
        fields[i].classList.add("error");
      }
    }
  }

  static checkCosts(input) {
    if (Number(input.value) <= 0) {
      input.classList.add("error");
      input.focus();
    }
  }

  static keyUp(fields) {
    [...fields].forEach((item) => {
      item.addEventListener("keyup", () => {
        item.classList.remove("error");
      });
    });
  }
}
