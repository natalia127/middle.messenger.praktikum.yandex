export const tmplSignUp = `

  <form class="form" >
    <div class="form__title"> {{value}}</div>
    <div class="form__inputs">
      {% inputFirstName %}
      {% inputSecondName %}
      {% inputLogin %}
      {% inputEmail %}
      {% inputPhone %}
      {% inputPassword %}
      {% button %}

    </div>
  </form>

`;
