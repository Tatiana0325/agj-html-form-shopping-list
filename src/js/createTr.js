export default function createTr(item) {
  let el = document.createElement("tr");
  el.classList.add(".string-table");
  el.innerHTML = `
		<td class="title name">${item.name}</td>
		<td class="title cost">${item.cost} руб.</td>
		<td class="title">
			<div class="change-group">
				<div class="btn-pencil">
					<img src="./img/pencil.png" alt="Изменить" class="pencil">
				</div>
				<div class="btn-cross">
					<img src="./img/cross.png" alt="Удалить" class="cross">
				</div>
			</div>
		</td>
	`;

  return el;
}
