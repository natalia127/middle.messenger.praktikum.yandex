export const tmpl = `
<form class="add-chat" @submit="handlerDelUserChat" >
  Удалить пользователя: {{login}}?
  <div t-if="isError" class="add-chat__error">Произошла ошибка. Пожалуйста, повторите позднее.</div>
  <Button 
    ::value='Удалить'
    ::class="add-chat__button"
  />
</form>`;
