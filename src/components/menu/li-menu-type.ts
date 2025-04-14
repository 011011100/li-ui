import type {Component, DefineComponent, VNode} from "vue";

interface liItemProp {
    name: string,
    content: string,
    img?: string,
    children?: liItemProps[],
    title?: string,
    comp?: DefineComponent | VNode | Component
}

export type liItemProps = liItemProp
