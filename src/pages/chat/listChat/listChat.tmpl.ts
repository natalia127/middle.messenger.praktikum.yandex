export function getTempl(itemsChat: string) {
  return `<div class="listChat ">
  <span class="listChat__add" @click="handlerClickIconAdd" ><img src="{{iconPlus}}" alt="" /></span>
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
}
