import { Templator } from '../src/core/templateEngine/Templator';
import { expect } from 'chai';

describe('Templator', () => {
  it('Возвращает HTMLElement', ()=> {
    const content = new Templator({
      template: '<div>123</div>',
      context: {

      }
    }).compile();
    expect(content).to.be.an.instanceof(HTMLElement);
  });

  it('Шаблонизатор заменяет {{ <<value>> }} на переменную из контекста', ()=> {
    const content = new Templator({
      template: '<div><span>{{ text }}</span></div>',
      context: {
        text: 'Тест тест'
      }
    }).compile();
    expect(content.innerHTML).to.eq('<span>Тест тест</span>');
  });

  it('вставляет в атрибуты data-child c именем child', ()=> {
    const content = new Templator({
      template: '<div><Block1 /></div>',
      context: {
        text: 'Тест тест'
      }
    }).compile();
    expect(content.innerHTML).to.eq('<div data-child="Block1"></div>');
  });

  it('вставляет в атрибуты data-events c событиями, где ## - разделить между ключом и значением', ()=> {
    const content = new Templator({
      template: '<div><div @click="handlerClick">123</div></div>',
      context: {
        text: 'Тест тест'
      }
    }).compile();

    expect(content.innerHTML).to.eq('<div data-events="click##handlerClick;">123</div>');
  });

  it('вставляет в атрибуты data-events c событиями, где ## - разделить между ключом и значением; Для нескольких событий', ()=> {
    const content = new Templator({
      template: '<div><div @click="handlerClick" @customEvent="handlerCustomEvent">123</div></div>',
      context: {
        text: 'Тест тест'
      }
    }).compile();

    expect(content.innerHTML).to.eq('<div data-events="click##handlerClick;customEvent##handlerCustomEvent;">123</div>');
  });

  it('вставляет в атрибуты data-props c переданными значениями, где ## - разделить между ключом и значением;', ()=> {
    const content = new Templator({
      template: '<div><Block1 ::name=\'title\' /></div>',
      context: {
      }
    }).compile();

    expect(content.innerHTML).to.eq('<div data-props="name##title;" data-child="Block1"></div>');
  });

  it('вставляет в атрибуты data-props c переданными значениями из контекста, где ## - разделить между ключом и значением;', ()=> {
    const content = new Templator({
      template: '<div><Block1 ::name=title /></div>',
      context: {
        title: 'Другой заголовок'
      }
    }).compile();

    expect(content.innerHTML).to.eq('<div data-props="name##Другой заголовок;" data-child="Block1"></div>');
  });

  it('вставляет в атрибуты data-if , data-else, где ## - разделить между ключом и значением;', ()=> {
    const content = new Templator({
      template: '<div><div t-if="isError">123</div><div t-else="">456</div></div>',
      context: {
      }
    }).compile();

    expect(content.innerHTML).to.eq('<div data-if="isError">123</div><div data-else="">456</div>');
  });
});
