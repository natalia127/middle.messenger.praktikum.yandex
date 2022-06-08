import { IBlock } from '../block/typeBlock';

export function render(query: string, block: IBlock) {
  const root = document.querySelector(query);
  if (root) {
    root.appendChild(block.getContent());

    block.dispatchComponentDidMount();
  }

  return root;
}
