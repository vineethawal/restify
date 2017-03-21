import {Router} from 'express'
import apis from '../apis'

const router = new Router()
for (const Resource in apis) {
  const routes = new Router()
  const endPoints = apis[Resource]
  for (const i in endPoints) {
    if (endPoints[i] && endPoints[i].verb && endPoints[i].url && endPoints[i].func) {
      const endPoint = endPoints[i]
      routes[endPoint.verb](
        endPoint.url,
        endPoint.func
      )
    }
  }
  router.use(`/${Resource}`, routes)
}

export default router
