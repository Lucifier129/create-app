import { NativeHistory } from 'create-history'
import {
  Context,
  Callback,
  Settings,
  AppElement,
  Controller,
  RenderTo,
  HistoryNativeLocation,
  HistoryBaseLocation
} from '../share/type'

export interface App {
  render: Render
  history: NativeHistory
}

export interface Render {
  (
    requestPath: string,
    injectContext?: Context,
    callback?: Callback
  ): any
}

interface CreateApp {
  (settings: Settings): App
}

interface InitControllerReturn {
  content?: AppElement
  controller: Controller
}

interface InitController {
  (
    c: Controller | Promise<Controller>
  ): InitControllerReturn | Promise<InitControllerReturn>
}

interface CreateInitController {
  (location: HistoryBaseLocation): InitController
}

export interface FetchController {
  (
    requestPath: string,
    injectContext: Context
  ): any
}

export interface RenderToString<C> extends RenderTo<C> {
  (
    component: C,
    controller?: Controller
  ): AppElement
}