import { Block } from '../../core/Block';
import { propsAndChildren } from '../../core/typeBlock';

function getStyleAvatar(size: string) {
  return (
    `"width: ${size};
    height:${size};
    border-radius: calc(${size}/2)"
    `
  );
}

const context = {
  isChange: true,
  size: '2em',
  class: '',
  srcImg: './defaultImg.png',
  _styles: getStyleAvatar('2em')
};

export class Avatar extends Block {
  constructor(props: propsAndChildren) {
    const _props = { ...context, ...props };
    _props._styles = getStyleAvatar(context.size);
    super(_props);
  }

  render(): string {
    return `<div class="avatar {{class}}" style={{_styles}}> 
      <img  class="avatar__img " src="{{srcImg}}"  />
      {% if isChange %}
        <div class="avatar__edit"></div>
      {% endif %}
    </div>`;
  }
}
