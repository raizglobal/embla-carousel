import { Limit } from './limit'

type Params = {
  contentSize: number
  loop: boolean
  isContained: boolean
}

export type ScrollLimit = {
  measure: (scrollSnaps: number[]) => Limit
}

export function ScrollLimit(params: Params): ScrollLimit {
  const { contentSize, loop, isContained } = params

  function measure(scrollSnaps: number[]): Limit {
    const startSnap = scrollSnaps[0]

    let min

    if (loop) {
      min = startSnap - contentSize;
    } else if (isContained) {
      min = 0;
    } else {
      // @TODO
      // needs tobe contentWidth - viewportWidth expressed as %
      min = scrollSnaps[scrollSnaps.length - 1];
    }
    const max = startSnap
    // if slides inside viewport min =0;
    // else min = something larger than current  viewport-length (as percentage)

    return Limit({ min, max })
  }

  const self: ScrollLimit = {
    measure,
  }
  return Object.freeze(self)
}
