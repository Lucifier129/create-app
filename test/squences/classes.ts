import CA from '../../src/share/types'
export let getController = () => controller

let controller

export class Home implements CA.Controller {
  constructor() {
    controller = this
  }
  init() {
    return this.render()
  }
  render() {
    return 'home'
  }
  restore() {
    controller = this
    return this.render()
  }
}

export class List implements CA.Controller {
  constructor() {
    controller = this
  }
  init() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.render())
      }, 50)
    })
  }
  render() {
    return 'list'
  }
}

export class Detail implements CA.Controller {
  constructor() {
    controller = this
  }
  init() {
    return this.render()
  }
  render() {
    return 'detail'
  }
}

export class NotFound implements CA.Controller {
  constructor() {
    controller = this
  }
  init() {
    return this.render()
  }
  render() {
    return 'not found'
  }
}

export class Restore implements CA.Controller {
  KeepAlive: boolean
  count: number
  constructor() {
    controller = this
    this.KeepAlive = true
    this.count = 0
  }
  init() {
    return this.render()
  }
  restore() {
    this.count += 1
    controller = this
    return this.render()
  }
  render() {
    return 'restore'
  }
}