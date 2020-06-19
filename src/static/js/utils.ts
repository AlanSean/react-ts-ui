import pathRegexp from 'path-to-regexp';
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getMetaFromRouter = <T extends { path: string }>(
    router: T[] = [],
    pathname: string,
): T | undefined => {
    return router.find(({ path }) => path && pathRegexp(path).exec(pathname));
};

export const delay = (timeout: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout*1000)
    })
}