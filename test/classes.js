let controller
export let getController = () => controller

export class Home {
    constructor() {
        controller = this
    }
    init() {
        return this.render()
    }
    update() {
        this.isUpdate = true
        this.refreshView()
    }
    render() {
        if (this.isUpdate) {
            return 'home_update'
        }
        return 'home'
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
