export interface KeyValue<K, V> { key: K, values: V[] }

export function groupBy<T, K> (list: T[], getKey: (item: T) => K): Array<KeyValue<K, T>> {
  const result: Map<K, T[]> = list.reduce((map, item) => {
    const key = getKey(item)
    const group = map.get(key) ?? []
    map.set(key, group.concat(item))
    return map
  }, new Map<K, T[]>())

  return Array.from(result, ([key, values]) => ({ key, values }))
}
