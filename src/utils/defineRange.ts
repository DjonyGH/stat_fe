export const defineRange = (value: number) => {
  const ranges = [
    [-100, -3],
    [-3, -2.5],
    [-2.5, -2],
    [-2, -1.5],
    [-1.5, -1],
    [-1, -0.5],
    [-0.5, 0],
    [0, 0.5],
    [0.5, 1],
    [1, 1.5],
    [1.5, 2],
    [2, 2.5],
    [2.5, 3],
    [3, 100]
  ]
  let rangeIndex: number = -1
  ranges.forEach((range, index) => {
    if (value > range[0] && value <= range[1]) {
      rangeIndex = index
    }
  })
  return rangeIndex
}
