export default function createForm(name) {
  const form = document.createElement("form");
  form.classList.add(`shop-list-${name}`);
  form.setAttribute('novalidate', '');
  form.innerHTML = `
		<div class="name-group">
      <div class="header">Название</div>
        <input type="text" class="name-product product" placeholder="Ведите название товара"/>
        <span class="error-text">нет имени</span>
      </div>

      <div class="cost-group">
        <div class="header">Стоимость</div>
        <input type="number" class="cost-product product" min="1" placeholder="Ведите стоимость товара"/>
        <span class="error-text">нет стоимости</span>
      </div>

      <div class="button-group">
        <button class="save-product" type="submit">Сохранить</button>
        <button class="closing" type="reset">Отмена</button>
      </div>
	`;
	
  return form;
}
