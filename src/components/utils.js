// export const setContext = (arg) => {
//   Object.entries(arg).forEach(([key, value]) => {
//     if (context.hasOwnProperty(key)) {
//       context[key] = value
//     }
//   })
// }

export class Component {
  constructor(ctx, blockTemplate) {
    this.context = ctx
    this.blockTemplate = blockTemplate
  }
  setContext(arg) {
    Object.entries(arg).forEach(([key, value]) => {
      if (this.context.hasOwnProperty(key)) {
        this.context[key] = value
      }
    })
  }
}