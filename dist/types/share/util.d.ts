import CA from './types';
export declare const isThenable: CA.IsThenable;
export declare const identity: CA.Identity;
export declare const extend: CA.Extend;
export declare class ReqError extends Error {
    status?: number;
    constructor(message?: string, status?: number);
}
export declare const createCache: CA.CreateCache;
export declare const createMap: CA.CreateMap;
