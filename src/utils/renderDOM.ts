export function render(query, block) {
  const root = document.querySelector(query);
  root.innerHTML = '';

  root.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}
