import CH from 'create-history';
import BaseTypes from '../share/types';
declare const CA: CA.CreateApp;
export default CA;
declare namespace CA {
    interface Callback extends BaseTypes.Callback {
    }
    interface Listener extends BaseTypes.Listener {
    }
    interface CreateHistory extends BaseTypes.CreateHistory {
    }
    interface Settings extends BaseTypes.Settings {
    }
    interface Route extends BaseTypes.Route {
    }
    interface Loader extends BaseTypes.Loader {
    }
    interface Matcher extends BaseTypes.Matcher {
    }
    interface Matches extends BaseTypes.Matches {
    }
    interface Controller extends BaseTypes.Controller {
    }
    interface Location extends BaseTypes.Location {
    }
    interface Context extends BaseTypes.Context {
    }
    interface Cache<T> extends BaseTypes.Cache<T> {
    }
    interface AppMap<K, V> extends BaseTypes.AppMap<K, V> {
    }
    interface ControllerCacheFunc extends BaseTypes.ControllerCacheFunc {
    }
    interface ControllerConstructor extends BaseTypes.ControllerConstructor {
    }
    interface LoadController extends BaseTypes.LoadController {
    }
    interface WrapController extends BaseTypes.WrapController {
    }
    interface RenderTo<E> extends BaseTypes.RenderTo<E> {
    }
    interface ViewEngine extends BaseTypes.ViewEngine {
    }
    interface ViewEngineRender<E = string> extends BaseTypes.ViewEngineRender<E> {
    }
    type CreateHistoryType = BaseTypes.CreateHistoryType;
    type AppElement = BaseTypes.AppElement;
    interface App {
        render?: Render;
        history?: CH.NativeHistory;
    }
    interface Render {
        (requestPath: string, injectContext?: Context, callback?: Callback): any;
    }
    interface CreateApp {
        (settings: Settings): App;
    }
    interface InitControllerReturn {
        content?: BaseTypes.AppElement;
        controller: Controller;
    }
    interface InitController {
        <E>(c: Controller | Promise<Controller>): InitControllerReturn | Promise<InitControllerReturn>;
    }
    interface CreateInitController {
        (location: Location): InitController;
    }
    interface FetchController {
        (requestPath: string, injectContext: Context): any;
    }
    interface RenderToString<E> extends RenderTo<E> {
        (element: E, controller?: Controller): BaseTypes.AppElement;
    }
}
