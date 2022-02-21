export const tmpl = `
<form class="add-chat" @submit="handlerDelChat">
  Удалить чат: {{nameChat}}?
  <div t-if="isError" class="add-chat__error">Произошла ошибка. Пожалуйста, повторите позднее.</div>
  <Button 
    ::value='Удалить'
    ::class="add-chat__button"
  />
</form>`;
