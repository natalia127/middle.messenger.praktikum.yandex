import { Component } from "../utils";

const context = {
  isChange: true,
  size: '2em',
  class: '',
  srcImg: './defaultImg.png',
  _styles: getStyleAvatar('2em'),
  handler: function(){
    return false
  }
};

function getStyleAvatar(size) {
  return (
    `"width: ${size};
    height:${size};
    border-radius: calc(${size}/2)"
    `
  )

}


let contextProxy = new Proxy(context, {
  set: function (obj, prop, value) {
    if (prop === 'size') {
      obj._styles = getStyleAvatar(value)
    }
    obj[prop] = value
    return true
  }
});



const blockTemplate = function() {

return `<div class="avatar {{class}}" style={{_styles}}> 
  <img  class="avatar__img " src="{{srcImg}}"  />
  {% if isChange %}
  <div class="avatar__edit"></div>
  {% endif %}
</div>`
}

const component = new Component(contextProxy, blockTemplate)


export  default component