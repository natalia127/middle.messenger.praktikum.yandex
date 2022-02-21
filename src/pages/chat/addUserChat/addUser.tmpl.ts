export const tmpl = `
<form class="add-chat" @submit="handlerAddUserChat" >
  <Input 
    ::placeholder="Логин пользователя"
    ::class="input--withBord add-chat__input"
    ::name='login'
    ::needValidate="true"
  />
  <div t-if="isError" class="add-chat__error">Произошла ошибка. Пожалуйста, повторите позднее.</div>
  <Button 
    ::value='Добавить'
    ::class="add-chat__button"
  />
</form>`;
