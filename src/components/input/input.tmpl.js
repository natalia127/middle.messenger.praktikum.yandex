import { Component } from "../utils";

const context = {
  value: ' ',
  placeholder: 'placeholder',
  type: 'text',
  class: '',
  name: ' ',
  handler: function(){
    return false
  }
};

const blockTemplate = function() {

return `<input type="{{type}}"  class="input {{class}}" placeholder="{{placeholder}}" value="{{value}}" />`
}

const component = new Component(context, blockTemplate)
export  default component