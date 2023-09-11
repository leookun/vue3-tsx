import { type DefineComponent, type SetupContext,type VNode } from 'vue'
import { find,filter,equals } from 'ramda'
type UnionToIntersection<U> = (U extends never ? never : (arg: U) => never) extends (
  arg: infer I
) => void
  ? I
  : never

export type TupleOf<T> = UnionToIntersection<T extends never ? never : (t: T) => T> extends (
  _: never
) => infer W
  ? [...TupleOf<Exclude<T, W>>, W]
  : []



export type RenderOptions={
  slot: (Component: DefineComponent<any>) => (VNode|undefined),
  filter: (Component: DefineComponent<any>[]) => (VNode | undefined),
  children:any
}

export type Options<Props> = {
  props?: TupleOf<keyof Props>
  setup: (props: Props, ctx: SetupContext) => RenderFunction
}
export type RenderFunction = (options: RenderOptions,context:any)=>any

export const FC = <Props extends Record<string, unknown>>(option: Options<Props>) =>{
  const setup=option.setup
  return Object.assign(option as unknown as DefineComponent<Props>,{
    setup(props: any, ctx: any) {
       const render = setup(props, ctx)
       return (context: any) =>{
         const slots = context.$slots.default?.()
         function slot(Component: DefineComponent<any>) {
           return find(({ type }) => type === Component, slots || []) as VNode||undefined
         } 
         const eq = (a: any) => (b: any) => a === b
         
         function filterSlot(Components: DefineComponent<any>[]){
           return filter(({ type }) => !find(eq(type), Components), slots || []) as VNode || undefined
         }
         return render({ slot, children: slots, filter: filterSlot },context)
       }
    },
  })
}
 
export const fc = FC
export const component = FC
export const defineComponent = FC
