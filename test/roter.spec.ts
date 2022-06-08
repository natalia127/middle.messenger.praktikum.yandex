import { expect } from 'chai';
import { Block } from '../src/core/block/Block';
import { router } from '../src/core/router/initRouter';

describe('Router', () => {
  class Block1 extends Block {
    render() {
      return '<div>Block1</div>';
    }
  }
  
  class Block2 extends Block {
    render() {
      return '<div>Block1</div>';
    }
  }
  
  it('При добавлении новых Block меняется количество routes в Router', ()=> {
    router
      .use('/', Block1)
      .use('/block2', Block2)
    expect(router.routes.length).to.eq(2);
  });

  it('длина history изначально 1', ()=> {
    expect(window.history.length).to.eq(1);
  });

  it('Переход на новую страницу должен менять состояние сущности history', ()=> {
    router.go('about:blank/block2');
    expect(window.history.length).to.eq(2);
  });

  it('Текущий роут равняется последнему переходу', ()=> {
    router.getCurrentPath();
    expect(router.getCurrentPath()).to.eq('blank/block2');
  });

  it('По запросу находит тот роутер что нужен', ()=> {    
    // const nameClassBlock = router.getRoute('/').BlockClass.name
    // expect(nameClassBlock).to.eq('Block1');
  });

});
