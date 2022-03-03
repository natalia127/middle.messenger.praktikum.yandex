export const tmplSignUp = `

  <form class="form" @submit="signUp">
    <div class="form__title"> {{value}}</div>
    <div class="form__inputs">
    <Input 
      ::placeholder="имя"
      ::class="input--withBord form__input"
      ::name='first_name'
      ::needValidate="true"
    />
    <Input 
      ::placeholder="Фамилия"
      ::class="input--withBord form__input"
      ::name='second_name'
      ::needValidate="true"
    />
    <Input 
      ::placeholder="Логин"
      ::class="input--withBord form__input"
      ::name='login'
      ::needValidate="true"
    />
    <Input 
      ::placeholder="e-mail"
      ::class="input--withBord form__input"
      ::name='email'
      ::type='email'
      ::needValidate="true"
    />
    <Input 
      ::placeholder="Телефон"
      ::class="input--withBord form__input"
      ::name='phone'
      ::type='number'
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
      ::value='Зарегестрироваться'
      ::class='form__button'
    />

    </div>
  </form>

`;
