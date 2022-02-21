import { Block } from '../../core/block/Block';
import { TPropsObject } from '../../core/typeBlock';

export class Blackout extends Block {
  constructor(props: TPropsObject) {
    const data = { ...props };
    const info = {
      data,
      methods: {

      }
    };
    super(info);
  }

  render() {
    return '<div class="blackout"></div>';
  }
}
