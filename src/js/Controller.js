import Products from "./Products";
import Validator from "./Validator";
import createForm from "./createForm";
import createTr from "./createTr";

function valid(form, fields, inputCost) {
  Validator.removeError(fields);
  Validator.checkValInputs(form, fields);
  Validator.checkCosts(inputCost);
  Validator.keyUp(fields);
}

export default class Controller {
  constructor() {
    this.products = [
      {
        name: "Samsung",
        cost: "10000",
      },
      {
        name: "Apple",
        cost: "120000",
      },
    ];

    this.container = document.querySelector(".container");
    this.formDel = document.querySelector(".delete-product");
    this.plus = document.querySelector(".btn-plus");
    this.shopList = document.querySelector(".shop-list");
  }

  start() {
    this.addProduct();
    this.createShopList();
  }

  addProduct() {
    this.shopList.innerHTML = `
			<tr class="header-table">
        <th class="header">Название</th>
        <th class="header">Стоимость</th>
        <th class="header">Действия</th>
      </tr>
		`;

    this.products.forEach((item, index) => {
      let el = createTr(item);
      this.shopList.appendChild(el);

      const changeEl = el.querySelector(".btn-pencil");
      const deleteEl = el.querySelector(".btn-cross");

      deleteEl.addEventListener("click", () => {
        this.formDel.classList.remove("invisible");
        this.formDel.classList.add("active");

        const yesBtn = this.formDel.querySelector(".delete");
        const noBtn = this.formDel.querySelector(".not-delete");

        yesBtn.addEventListener("click", (event) => {
          event.preventDefault();

          this.products.splice(index, 1);
          el.remove();

          this.formDel.classList.add("invisible");
          this.formDel.classList.remove("active");
        });

        noBtn.addEventListener("click", (event) => {
          event.preventDefault();

          this.formDel.classList.add("invisible");
          this.formDel.classList.remove("active");
        });
      });

      changeEl.addEventListener("click", () => {
        const formChange = createForm("change");
        const inputNameCh = formChange.querySelector(".name-product");
        const inputCostCh = formChange.querySelector(".cost-product");
        const inputsCh = formChange.querySelector(".product");

        this.container.appendChild(formChange);

        inputCostCh.value = item.cost;
        inputNameCh.value = item.name;

        formChange.addEventListener("submit", (event) => {
          event.preventDefault();

          valid(formChange, inputsCh, inputCostCh);

          if (Validator.isValid(inputsCh)) {
            if (inputNameCh.value !== item.name) {
              this.products[index].name = inputNameCh.value;
              el.querySelector(".name").textContent = this.products[index].name;
            }

            if (inputCostCh.value !== item.cost) {
              this.products[index].cost = inputCostCh.value;
              el.querySelector(".cost").textContent = this.products[index].cost;
            }

            formChange.reset();
          }
        });

        formChange.addEventListener("reset", (event) => {
          event.preventDefault();

          this.container.removeChild(formChange);
        });
      });
    });
  }

  createShopList() {
    this.plus.addEventListener("click", () => {
      const formAdd = createForm("add");
      this.container.insertAdjacentElement("beforeend", formAdd);

      const inputName = formAdd.querySelector(".name-product");
      let inputCost = formAdd.querySelector(".cost-product");
      let inputs = formAdd.querySelectorAll(".product");

      formAdd.addEventListener("submit", (event) => {
        event.preventDefault();

        valid(formAdd, inputs, inputCost);

        if (Validator.isValid(inputs)) {
          const newProduct = new Products(inputName.value, inputCost.value);
          this.products.push(newProduct);
          this.addProduct();

          formAdd.reset();
        }
      });

      formAdd.addEventListener("reset", (event) => {
        event.preventDefault();

        this.container.removeChild(formAdd);
      });
    });
  }
}
