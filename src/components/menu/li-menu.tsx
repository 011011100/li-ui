import type {CSSProperties, PropType} from "vue";
import {defineComponent, ref, Transition, TransitionGroup} from "vue";
import type {liItemProps} from "./li-menu-type.ts";

const LiMenu = defineComponent({
    name: 'LiMenu',
    props: {
        liItem: {
            type: Array as PropType<liItemProps[]>,
            default: [],
        },
        haveImg: {
            type: Boolean,
            default: true
        },
        _menuStateMap: {
            type: Object as PropType<Record<string, boolean>>,
            default: () => ({}),
        }
    },
    setup(props, {expose}) {

        const menuStateMap = ref(props._menuStateMap);
        const toggleMenu = ({name}: any) => {
            menuStateMap.value[name] = !menuStateMap.value[name]
        }

        const ulStyle: CSSProperties = {
            listStyle: 'none',
            padding: 'unset',
            margin: 'unset',
        };

        const liItemDivStyle: CSSProperties = {
            paddingLeft: '8px'
        };

        const liDivStyle: CSSProperties = {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }

        expose({
            liDivStyle,
            menuStateMap,
            ulStyle,
            liItemDivStyle,
            toggleMenu
        });

        return {
            liDivStyle,
            menuStateMap,
            ulStyle,
            liItemDivStyle,
            toggleMenu
        }
    },
    render() {
        return <TransitionGroup name="list" tag="div">
            {this.liItem.map((item: any) => (
                <ul style={this.ulStyle} key={item}>
                    <li style={this.liItemDivStyle}
                        onClick={(e) => {
                            e.stopPropagation()
                            this.toggleMenu(item)
                        }}>
                        <div style={this.liDivStyle}>
                            {item.content}
                            <span hidden={!item.img && !item.children}>
                                <img style={{display: this.menuStateMap[item.name] ? '' : 'none'}}
                                     src={'AngleDown.svg'}
                                     alt={"向下"}
                                     width={12}
                                     height={12}
                                />
                                <img style={{display: !this.menuStateMap[item.name] ? '' : 'none'}}
                                     src={'AngleUp.svg'}
                                     alt={"向上"}
                                     width={12}
                                     height={12}
                                />
                            </span>
                        </div>
                        <Transition name="fade">
                            {!this.menuStateMap[item.name] && (
                                <LiMenu liItem={item.children}
                                        _menuStateMap={this.menuStateMap}
                                />
                            )}
                        </Transition>
                    </li>
                </ul>
            ))}
        </TransitionGroup>
    },
})

export default LiMenu
