import createApp from './createApp'

export default createApp

export { createHistory } from './createApp'

export {
  App,
  ServerController
} from './type'

export {
  Route,
  Settings,
  CreateHistoryType,
  Params,
  Matches,
  Matcher,
  ViewEngine,
  ViewEngineRender,
  ViewEngineClear,
  Loader,
  LoadController,
  Context,
  HistoryBaseLocation,
  HistoryNativeLocation,
  Controller,
  ControllerConstructor,
  Cache,
  CacheStorage,
  AppMap
} from '../share/type'

export {
  Actions
} from 'create-history'