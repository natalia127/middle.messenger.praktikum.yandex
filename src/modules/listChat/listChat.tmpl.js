import Input from '../../components/input/input.tmpl'
const context = {

};

const listChat = `<div class="listChat ">
{%
  Input
  context: {
    placeholder: 'имя чата',
    class: 'listChat__search',
    type: 'search',
    name: 'message'
  }
%}
<ul>
  <li>
    <div></div>
    <div class="listChat__item">
      <span class="listChat__name">name chat</span>
      <span  class="listChat__lastMessage">last message</span>
      <div class="listChat__nMessage">1</div>

    </div>
  </li>
</ul>

</div>`

const blockTemplate = function() {

  return `${listChat}
  `;
}

export  default {
  blockTemplate,
  context,
  children: {
    Input
  }
}