import { Avatar } from '../../../components/avatar/avatar';
import { template } from './myProfile.tmpl';
import { Block } from '../../../core/Block';
import { TPropsObject } from '../../../core/typeBlock';

import { context } from '../tempContext';
import { Router } from '../../core/router/Router';

export class MyProfile extends Block {
  constructor(props: TPropsObject) {
    const info = {
      components: {
        Avatar
      },
      data: {
        ...context,
        ...props
      },
      methods: {
        goEditProfile: function () {

        },
        goEditPassword: function () {

        },
        goExit: function () {

        }
      }
    };
    super(info);
  }

  render() {
    return template;
  }
}
