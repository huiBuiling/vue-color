/** @internal */
type Data = Readonly<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in string]: () => Promise<any>
}>

const widgetData: Data = {
  base: () => import('@/assets/widgets/face/base.svg?raw'),
  hair1: () => import('@/assets/widgets/face/hair1.svg?raw')
}

export { widgetData }
