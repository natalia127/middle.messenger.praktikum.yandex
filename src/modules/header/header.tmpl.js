const context = {

};

const header = `<div class='header'>
  <div class="container">
    <span class="linkProfile"><a href="./my-profile">Мой профиль</a></span>
  </div>

</div>
`

const blockTemplate = function() {
  return `${header}`;
}

export  default {
  blockTemplate,
  context,
}