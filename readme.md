Usage

Replace vue's slot with the  following：

```tsx
<Box title="main-title" >
    <Box.SubTitle>subtitle</Box.SubTitle>
    <Box.Content>Content</Box.Content>
</Box>
```

Clear definition is as follows:
```tsx
import { FC } from 'vue3-tsx'
type BoxProps={
    title:string
}
const Box = FC<BoxProps>({
    setup(props) {
        return ({slot,filter})=>{
            return <div>
                <h1>{props.title}</h1>
                <h2>{slot(SubTitle)}</h2>
               
                <div>
                    {slot(Content)}
                    {filter([SubTitle, Content])}
                </div>
            </div>
        }
    },
})
const SubTitle = FC({
    setup() {
        return ({ children }) => {
            return children
        }
    },
})
const Content = FC({
    setup() {
        return ({ children }) => {
            return children
        }
    },
})
export default Object.assign(Box, { Title, Content })
```
### render args


* children: all vnodes
* slot: (slot's Component)=>vnode
* filter: (Component[])=>vnodes other than Component[]

✨ enjoy type-friendly
