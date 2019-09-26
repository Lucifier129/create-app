import { Controller, ClientController } from '../../src/client'
export let getController = () => controller

let controller: any

export class Home implements Controller {
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

export class List implements Controller {
  constructor() {
    controller = this
  }
  init() {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.render())
      }, 50)
    })
  }
  render() {
    return 'list'
  }
}

export class Detail implements Controller {
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

export class NotFound implements Controller {
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

export class Restore implements Controller {
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