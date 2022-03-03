import { Block } from '../../core/block/Block';
import { TPropsObject } from '../../core/block/typeBlock';

const personIcon = new URL('../../img/account.svg', import.meta.url);

export class Avatar extends Block {
  constructor(props: TPropsObject) {
    const info = {
      data: {
        isChange: false,
        className: 'avatar-sm',
        srcImg: personIcon.href,
        ...props
      },

      methods: {
        handlerClick(e) {
          let event = new CustomEvent('handlerClickAvatar', {
            detail: {
              file: e.target.files[0]
            },
            bubbles: true
          });
          this.getContent().dispatchEvent(event);
        }
      }
    };

    super(info);
  }

  render(): string {
    return `
    <div class="avatar {{className}}">
      <img  class="avatar__img " src="{{srcImg}}"  />
      <div t-if="isChange" class="avatar__edit">
        <input @change="handlerClick" class="avatar__input" type="file" accept="image/*"/>
      </div>
    </div>`;
  }
}
