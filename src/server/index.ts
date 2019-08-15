import CH from 'create-history'
import BaseTypes from '../share/types'
import createApp from './createApp'

const CA = createApp

export default CA

declare namespace CA {
  interface Callback extends BaseTypes.Callback {}
  interface Listener extends BaseTypes.Listener {}

  interface CreateHistory extends BaseTypes.CreateHistory {}
  interface Settings extends BaseTypes.Settings {}
  interface Route extends BaseTypes.Route {}
  interface Loader extends BaseTypes.Loader {}
  interface Matcher extends BaseTypes.Matcher {}
  interface Matches extends BaseTypes.Matches {}
  interface Controller extends BaseTypes.Controller {}
  interface Location extends BaseTypes.Location {}
  interface Context extends BaseTypes.Context {}
  interface Cache<T> extends BaseTypes.Cache<T> {}
  interface AppMap<K, V> extends BaseTypes.AppMap<K, V> {}
  interface ControllerCacheFunc extends BaseTypes.ControllerCacheFunc {}
  interface ControllerConstructor extends BaseTypes.ControllerConstructor {}
  interface LoadController extends BaseTypes.LoadController {}
  interface WrapController extends BaseTypes.WrapController {}
  interface RenderTo<E = string>  extends BaseTypes.RenderTo<E> {}
  interface ViewEngine extends BaseTypes.ViewEngine {}
  
  type CreateHistoryType = BaseTypes.CreateHistoryType

  export interface App {
    render?: Render
    history?: CH.NativeHistory
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
  
  interface InitController<E = string> {
    <E = string>(
      c: Controller | Promise<Controller>
    ): HTMLElement | Element | string | number | boolean | null | undefined
  }

  interface CreateInitController {
    (location: Location): InitController
  }
  
  export interface FetchController {
    (
      requestPath: string,
      injectContext: Context
    ): any
  }

  export interface RenderToString<E = string> extends RenderTo<E> {
    (
      component: E,
      controller?: Controller
    ): Element
  }
}