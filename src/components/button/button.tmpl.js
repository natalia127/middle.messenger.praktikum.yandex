import { Component } from "../utils";

const context = {
  value: '',
  class: ' '
};


const blockTemplate = function() {
    return `<button class="{{class}} button" >{{value}}</button>`;
};
const component = new Component(context, blockTemplate)

export  default component