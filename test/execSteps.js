const execSteps = ({ steps, subscribe, location }, done) => {
  let index = 0, unsubscribe

  const cleanup = (...args) => {
    unsubscribe()
    done(...args)
  }

  const execNextStep = (...args) => {
    try {
      steps[index++](...args)

      if (index === steps.length)
        cleanup()
    } catch (error) {
      cleanup(error)
    }
  }

  if (steps.length) {
    unsubscribe = subscribe(execNextStep)
    execNextStep(location)
  } else {
    done()
  }
}

export default execSteps