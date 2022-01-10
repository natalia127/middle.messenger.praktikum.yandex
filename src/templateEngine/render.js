import { Templator } from "./Templator";
import app from "../layout/app.tmpl"

export function render() {
  const tmpl = new Templator(app);

  const renderedTemplate = tmpl.compile();
  
  const root = document.querySelector('.root');
  root.innerHTML = ''
  root.appendChild(renderedTemplate)
  afterCompile()
}

function afterCompile() {
  const forms = document.getElementsByTagName('form');
  Array.from(forms).forEach(form =>
    form.addEventListener('submit', (e)=>{
      e.preventDefault()})  
  )
}