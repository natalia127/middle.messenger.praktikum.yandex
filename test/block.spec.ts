import { expect } from 'chai';
import { Block } from '../src/core/block/Block';
import { render } from '../src/core/utils/renderDOM';


function getReqBlockHtml (content: string) {
 return   `^<div class="root"><div data-t-id="[\\w-]+">${content}</div></div>$`
}
describe('Block', () => {

  beforeEach(()=> {
    const main= document.createElement('div')
    main.classList.add('root')
    document.body.innerHTML = ''
    document.body.appendChild(main)
  })
  it('Вставка Block в HTMLELement', ()=> {
    class Block1 extends Block {
      render() {
        return '<div>Block1</div>';
      }
    }
    const app = new Block1()
    render('.root', app);
    
    const regexp = new RegExp('^<div class="root"><div data-t-id="[\\w-]+">Block1</div></div>$');
    
    expect(regexp.test(document.body.innerHTML)).to.be.true    
  });

  it('Передача данных в блок через прорпсы', ()=> {
    class Block1 extends Block {
      constructor(props) {
        super({data: props})
      }
      render() {
        return '<div>{{ test }}</div>';
      }
    }
    const app = new Block1({
      test: 123
    })

    const content = app.getContent().innerHTML;
    expect(content).to.eq('123');
  });

  it('Рендер компонента с одним дочерним компонентом', ()=> {
    class ChildrenBlock extends Block {
      render() {
        return '<div>ChildrenBlock</div>';
      }
    }
    class Block1 extends Block {
      constructor(props) {
        super({
          data: props,
          components: {
            ChildrenBlock
          }

        })
      }
      render() {
        return '<div><ChildrenBlock /></div>';
      }
    }
    const app = new Block1({})
    const content = app.getContent().innerHTML;
    const regexp = new RegExp('<div data-t-id="[\\w-]+">ChildrenBlock</div>');

    expect(regexp.test(content)).to.be.true  
 
  });

  it('Рендер компонента с несколькими одинаковыми дочерними компонентоми', ()=> {
    class ChildrenBlock extends Block {
      render() {
        return '<div>ChildrenBlock</div>';
      }
    }
    class Block1 extends Block {
      constructor(props) {
        super({
          data: props,
          components: {
            ChildrenBlock
          }

        })
      }
      render() {
        return '<div><ChildrenBlock /><ChildrenBlock /></div>';
      }
    }
    const app = new Block1({})
    const regexp = new RegExp('<div data-t-id="[\\w-]+">ChildrenBlock</div><div data-t-id="[\\w-]+">ChildrenBlock</div>');

    expect(regexp.test(app.getContent().innerHTML)).to.be.true
  });

  it('Передача параметров в дочерние компоненты', ()=> {
    class ChildrenBlock extends Block {
      constructor(props) {
        super({
          data: {text: 'Дочерний',...props},
        })
      }
      render() {
        return '<div>{{text}}</div>';
      }
    }
    class Block1 extends Block {
      constructor(props) {
        super({
          data: props,
          components: {
            ChildrenBlock
          }
        })
      }
      render() {
        return '<div><ChildrenBlock ::text="Первый" /><ChildrenBlock ::text="Второй"/></div>';
      }
    }
    const app = new Block1({})
    const regexp = new RegExp('<div data-t-id="[\\w-]+">Первый</div><div data-t-id="[\\w-]+">Второй</div>');
    expect(regexp.test(app.getContent().innerHTML)).to.be.true    
  });

  it('Скрытие блока t-else по условию из контекста', ()=> {
    class Block1 extends Block {
      constructor() {
        super({
          data: {isValid: true},

        })
      }
      render() {
        return '<div><div t-if="isValid">isValid</div><div t-else="">isError</div></div>';
      }
    }
    const app = new Block1()
    const content = app.getContent().innerHTML;
    
    expect(content).to.eq('<div>isValid</div><div class="hidden">isError</div>');
  });

  it('Скрытие блока t-if по условию из контекста', ()=> {
    class Block1 extends Block {
      constructor() {
        super({
          data: {isValid: false},

        })
      }
      render() {
        return '<div><div t-if="isValid">isValid</div><div t-else="">isError</div></div>';
      }
    }
    const app = new Block1()
    const content = app.getContent().innerHTML;
    
    expect(content).to.eq('<div class="hidden">isValid</div><div>isError</div>');
  });
});


(async function() {
  class Block1 extends Block {
    constructor(props) {
      super({data: props})
    }
    render() {
      return '<div>{{ test }}</div>';
    }
  }
  const app = new Block1({
    test: 'Тест'
  })

  app.setProps({
    test: 'Новый Тест'
  })

  await new Promise(resolve => {
    setTimeout(resolve, 500);
  });

  describe('Ассинхронные операции с Block', function() {

    it(`Обновление пропсов`, function () {
      const content = app.getContent().innerHTML;
      expect(content).to.eq('Новый Тест');
    });

  });

  run();
})();
