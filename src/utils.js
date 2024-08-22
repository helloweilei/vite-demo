export function unary(fn, param) {
    return (...args) => fn(param, ...args)
}