export let symbol: any = typeof Symbol !== void 0 ? Symbol : void 0
let idCounter = 0

if (!symbol) {
  symbol = function Symbol(key: any) {
    return `__${key}_${Math.floor(Math.random() * 1e9)}_${++idCounter}__`
  }

  symbol.iterator = symbol('Symbol.iterator')
}
