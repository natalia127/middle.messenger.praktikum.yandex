import { mockListChatTs } from './mockListChat';

const itemsChat = mockListChatTs.reduce((acc, item) => {
  acc += `<ItemChat 
  ::name="${item.name}" 
  ::lastMessage="${item.lastMessage}" 
  ::countUnRead="${item.countUnRead}" /> \n`;
  return acc;
}, '');
export const listChatTmpl: string = `<div class="listChat ">
  <Input 
    ::placeholder='имя чата'
    ::class="listChat__search"
    ::name='message'
    ::type='search'
  />
  <ul>
    ${itemsChat}
  </ul>    
</div>`;
