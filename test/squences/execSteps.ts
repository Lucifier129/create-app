import { Step, Subscribe, Done } from './type'

const execSteps: (
  steps: Step[],
  subscribe: Subscribe,
  done: Done
) => void = (steps, subscribe, done) => {
  let index: number = 0
  let unsubscribe: Function

  const cleanup = (...args: any[]) => {
    unsubscribe()
    done(...args)
  }

  const execNextStep = (...args: any[]) => {
    try {
      steps[index++](...args)

      if (index === steps.length)
        cleanup()
    } catch (error) {
      cleanup(error)
    }
  }

  if (steps.length > 0) {
    unsubscribe = subscribe(execNextStep)
  } else {
    done()
  }
}

export default execSteps