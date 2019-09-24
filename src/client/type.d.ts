import { NativeHistory } from 'create-history'
import {
  Context,
  Callback,
  Settings,
  AppElement,
  Controller,
  ControllerConstructor,
  RenderTo,
  Listener,
  HistoryNativeLocation,
  HistoryBaseLocation
} from '../share/type'
interface CreateApp {
  (settings: Settings): App
}

interface Render {
  (targetPath: string | HistoryNativeLocation): any
}

interface Start {
  (
    callback?: Callback,
    shouldRenderWithCurrentLocation?: boolean
  ): () => void
}

interface Stop {
  (): void
}

interface Publish {
  (location: HistoryNativeLocation): void
}

interface App {
  start: Start
  stop: Stop
  render: Render
  history: NativeHistory
  subscribe: Subscribe
}

interface Subscribe {
  (listener: Listener): () => void
}

interface InitController {
  (
    c: ControllerConstructor | Promise<ControllerConstructor>
  ): AppElement
}

interface CreateInitController {
  (location: HistoryNativeLocation): InitController
}

interface RenderToContainer<C> extends RenderTo<C> {
  (
    component: C,
    controller?: Controller
  ): AppElement
}

interface ClearContainer {
  (): void
}

interface DestoryContainer {
  (): void
}

interface GetContainer {
  (): HTMLElement
}

interface GetControllerByLocation {
  (location: HistoryNativeLocation): Controller
}