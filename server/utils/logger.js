import _debug from 'debug'

const debug = _debug('app:logger')

global.logger = (payload) => {
  if (!payload) {
    return
  }

  let log

  const options = {tags: payload.tags, level: payload.level}

  if (typeof payload === 'string') {
    log = new Error(payload)
  } else if (payload instanceof Error) {
    log = payload
  } else if (typeof payload === 'object') {
    log = new Error(JSON.stringify(payload))
  } else {
    log = new Error(payload)
  }

  if (payload.name) {
    log.name = payload.name
  }
  if (payload.stack) {
    log.stack = payload.stack
  }

  debug(log.name, log.message, log)

  Raven.captureException(log, options)
}
