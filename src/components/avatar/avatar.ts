import { Block } from '../../core/Block';
import { propsAndChildren } from '../../core/typeBlock';

const personIcon = new URL('../../img/account.svg', import.meta.url);
function getStyleAvatar(size: string) {
  return (
    `"width: ${size};
    height:${size};
    border-radius: calc(${size}/2);"
    `
  );
}

const context = {
  isChange: false,
  size: '2em',
  class: '',
  srcImg: personIcon.href,
  _styles: getStyleAvatar('2em')
};

export class Avatar extends Block {
  constructor(props: propsAndChildren) {
    const _props = { ...context, ...props };
    _props._styles = getStyleAvatar(_props.size);
    if (_props.isChange) {
      _props._styles = _props._styles.replace(';', ';cursor: pointer;');
    }

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
