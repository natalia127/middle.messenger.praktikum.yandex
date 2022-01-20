export const tmplSignIn: string = `
<div >
  <form class="form" >
    <div class="form__title"> {{value}}</div>
    <div class="form__inputs">
      {% inputLogin %}
      {%  inputPassword %}     
      {% button %}
      <div class="form__text"><a href="{{SIGNUP}}">signUp</a></div>
    </div>
  </form>
  </div>
`;
