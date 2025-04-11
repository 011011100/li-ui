interface liItemProp {
    name: string,
    content: string,
    img?: string,
    children?: liItemProps[],
    title?: string
}

export type liItemProps = liItemProp
