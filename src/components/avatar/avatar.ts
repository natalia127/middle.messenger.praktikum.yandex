import { Block } from '../../core/Block';
import { TPropsObject } from '../../core/typeBlock';

const personIcon = new URL('../../img/account.svg', import.meta.url);

const context = {
  isChange: false,
  className: 'avatar-sm',
  srcImg: personIcon.href
};

export class Avatar extends Block {
  constructor(props: TPropsObject) {
    const data = { ...context, ...props };

    super({ data });
  }

  render(): string {
    return `
    <div class="avatar {{className}}"> 
      <img  class="avatar__img " src="{{srcImg}}"  />
      <div t-if="isChange" class="avatar__edit"></div>
    </div>`;
  }
}
