import { Controller } from '../../src/share/constant'
let controller
export let getController = () => controller

export class Home extends Controller {
  constructor() {
    super()
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

export class List extends Controller {
  constructor() {
    super()
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

export class Detail extends Controller {
  constructor() {
    super()
    controller = this
  }
  init() {
    return this.render()
  }
  render() {
    return 'detail'
  }
}

export class NotFound extends Controller {
  constructor() {
    super()
    controller = this
  }
  init() {
    return this.render()
  }
  render() {
    return 'not found'
  }
}

export class Restore extends Controller {
  KeepAlive: boolean
  count: number
  constructor() {
    super()
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