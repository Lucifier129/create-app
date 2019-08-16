import History, { Location as HistoryLocation } from 'create-history';
import pathToRegexp from 'path-to-regexp';
import Client from '../client';
import Server from '../server';
export default CA;
declare namespace CA {
    interface Route {
        keys?: pathToRegexp.Key[];
        regexp?: RegExp;
        path?: pathToRegexp.Path;
        controller?: ControllerConstructor | string;
    }
    interface Params {
        [propName: string]: any;
    }
    interface Matches {
        path: pathToRegexp.Path;
        params: Params;
        controller: ControllerConstructor;
    }
    interface Matcher {
        (pathname: string): Matches;
    }
    interface ViewEngine {
        render: ViewEngineRender<any> | RenderTo<any>;
        clear?: ViewEngineClear;
    }
    interface ViewEngineClear {
        (container: Element): void;
    }
    interface RenderTo<E = string> {
        (element: E): any;
    }
    type CreateHistoryType = 'createHashHistory' | 'createMemoryHistory' | 'createBrowserHistory' | 'createHistory';
    interface Settings extends History.HistoryOptions {
        container?: string | HTMLElement;
        basename?: string;
        context?: Context;
        type?: CreateHistoryType;
        loader?: Loader;
        cacheAmount?: number;
        routes?: Route[];
        viewEngine?: ViewEngine;
    }
    type App = Client.App | Server.App;
    interface CreateHistory {
        (settings: Settings): History.NativeHistory;
    }
    interface ControllerCacheFunc {
        (controller: Controller): void;
    }
    type CreateApp = Server.CreateApp | Client.CreateApp;
    type Render = Client.Render | Server.Render;
    interface WrapController {
        (IController: ControllerConstructor): any;
    }
    type Listener = Function;
    type Callback = Function;
    interface Context {
        isClient?: boolean;
        isServer?: boolean;
        prevLocation?: object | null;
        location?: Location;
        [propName: string]: any;
    }
    interface Location extends HistoryLocation {
        raw?: string;
        pattern?: pathToRegexp.Path;
        params?: Params;
    }
    interface Loader {
        (controller: ControllerConstructor | LoadController | string, location?: Location, context?: Context): ControllerConstructor | Promise<ControllerConstructor>;
    }
    interface LoadController {
        (location?: Location, context?: Context): ControllerConstructor | Promise<ControllerConstructor>;
    }
    interface ControllerConstructor {
        new (location?: Location, context?: Context): Controller;
    }
    interface Controller {
        location?: Location;
        context?: Context;
        history?: History.NativeHistory;
        matcher?: Matcher;
        loader?: Function;
        routes?: Route[];
        KeepAlive?: boolean;
        count?: number;
        restore?(location?: Location, context?: Context): any;
        init?(): any;
        render?(): AppElement;
        destroy?(): void;
        getContainer?(): Element;
        refreshView?(): any;
    }
    interface CreateController {
        (c: CA.ControllerConstructor, location: CA.Location, context: CA.Context): CA.Controller;
    }
    interface Cache<T> {
        keys: () => string[];
        get: (key: string) => T;
        set: (key: string, value: T) => void;
        remove: (key: string) => void;
        getAll: () => CacheStorage<T>;
    }
    interface CacheStorage<T> {
        [key: string]: T;
    }
    interface CreateCache {
        <T>(amount?: number): Cache<T>;
    }
    interface AppMap<K, V> {
        get: (key: K) => V;
        set: (key: K, value: V) => void;
        has: (key: K) => boolean;
        remove: (key: K) => void;
    }
    interface MapItem<K, V> {
        key: K;
        value: V;
    }
    interface CreateMap {
        <K, V>(): AppMap<K, V>;
    }
    interface IsThenable {
        (obj: any): boolean;
    }
    interface Identity {
        (obj: object): object;
    }
    interface Extend {
        (to: object, from: object): object;
    }
    interface OtherElement {
        [propName: string]: any;
    }
    type AppElement = Element | OtherElement | string | number | boolean | null | undefined;
    interface ViewEngineRender<E = string> {
        (element: E, container: Element | null, controller?: Controller): AppElement;
    }
}
