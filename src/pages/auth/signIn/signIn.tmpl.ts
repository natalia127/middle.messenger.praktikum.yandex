export const tmplSignIn: string = `

  <form class="form" @submit="signIn">
    <div class="form__title"> {{value}}</div>
    <div class="form__inputs">
      <Input 
        ::placeholder="Логин"
        ::class="input--withBord form__input "
        ::name='login'
        ::needValidate="true"
      />

      <Input 
        ::placeholder="пароль"
        ::class="input--withBord form__input"
        ::name='password'
        ::type='password'
        ::needValidate="true"
      />
      <div class="form__errorSendMessage">{{ errorMessageAuth }}</div>
      <Button 
        ::value='Войти'
        ::class='form__button'
      />
      <div class="form__text"><span class="form__link" @click="goSignUp">signUp</span></div>
    </div>
  </form>

`;
