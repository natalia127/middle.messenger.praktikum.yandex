export const tmplSignIn: string = `

  <form class="form" @submit="validateForm">
    <div class="form__title"> {{value}}</div>
    <div class="form__inputs">
      <Input 
        ::placeholder="Логин"
        ::class="input--withBord form__input "
        ::name='login'
        @blur="validateInput"
        @focus="validateInput"
      />

      <Input 
        ::placeholder="пароль"
        ::class="input--withBord form__input"
        ::name='password'
        ::type='password'
        @blur="validateInput"
        @focus="validateInput"
      />   
      <Button 
        ::value='Войти'
        ::class='form__button'
      />
      <div class="form__text"><span class="form__link" @click="goSignUp">signUp</span></div>
    </div>
  </form>

`;
