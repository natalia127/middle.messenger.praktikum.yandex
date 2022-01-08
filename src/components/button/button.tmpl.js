import { Component } from "../utils";

const context = {
  value: '',
  class: ' ',
  handler: function(){
    return false
  }
};


const blockTemplate = function() {

return `<button class="{{class}} button" onClick="{{handler}}">{{value}}</button>`
}
const component = new Component(context, blockTemplate)

export  default component