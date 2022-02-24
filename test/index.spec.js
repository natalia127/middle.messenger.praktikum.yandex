import { expect } from 'chai';
// import { Block } from 'typescript';
import { router } from '../src/core/router/initRouter';

// class Block1 extends Block {
//   render() {
//     return <div>Block1</div>;
//   }
// }

// class Block2 extends Block {
//   render() {
//     return <div>Block1</div>;
//   }
// }

describe('Router', () => {
  describe('Router.use', () => {
    it('При добавлении новых блоков меняется количество routes в Router', ()=> {
      // router.use('/', Block1).use('/block2', Block2);
      // expect(router.routes).to.eq(0);
    });
  });
  // it('Переход на новую страницу должен менять состояние сущности history', () => {
  //   // window.history.pushState({ page: 'login' }, 'Login', '/login');
  //   // window.history.pushState({ page: 'register' }, 'Register', '/register');

  //   // expect(window.history.length).to.eq(3);
  // });
});
