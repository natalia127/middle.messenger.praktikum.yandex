export const tmpl = `
<form class="add-chat" @submit="handlerAddChat">
  <Input 
    ::placeholder="Имя чата"
    ::class="input--withBord add-chat__input"
    ::name='title'
    ::needValidate="true"
  />
  <div t-if="isError" class="add-chat__error">Произошла ошибка. Пожалуйста, повторите позднее.</div>
  <Button 
    ::value='Создать'
    ::class="add-chat__button"
  />
</form>`;
