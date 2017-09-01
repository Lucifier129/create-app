let controller
export let getController = () => controller

export class Home {
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

export class List {
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

export class Detail {
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

export class NotFound {
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

export class Restore {
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