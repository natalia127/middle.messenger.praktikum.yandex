import { Router } from './Router';
import { authStore } from '../store/AuthStore';
import { authorizedPaths } from './namePath';
import { EPATH } from './namePath';

const router = new Router('.js-router');
router.setCallbackDidTransition(function (pathname) {
  // if (!authStore.getState().isAuth && authorizedPaths.includes(pathname)) {
  //   // router.go(EPATH.SIGNIN);
  //   return false;
  // }
  return true;
});
export { router };
