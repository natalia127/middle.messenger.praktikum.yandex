export const tmplSignUp = `

  <form class="form"  @submit="validateForm">
    <div class="form__title"> {{value}}</div>
    <div class="form__inputs">
    <Input 
      ::placeholder="имя"
      ::class="input--withBord form__input"
      ::name='first_name'
      @blur="validateInput"
      @focus="validateInput"
    />
    <Input 
      ::placeholder="Фамилия"
      ::class="input--withBord form__input"
      ::name='second_name'
      @blur="validateInput"
      @focus="validateInput"
    />
    <Input 
      ::placeholder="Логин"
      ::class="input--withBord form__input"
      ::name='login'
      @blur="validateInput"
      @focus="validateInput"
    />
    <Input 
      ::placeholder="e-mail"
      ::class="input--withBord form__input"
      ::name='email'
      ::type='email'
      @blur="validateInput"
      @focus="validateInput"
    />
    <Input 
      ::placeholder="Телефон"
      ::class="input--withBord form__input"
      ::name='phone'
      ::type='number'
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
      ::value='Зарегестрироваться'
      ::class='form__button'
    />

    </div>
  </form>

`;
