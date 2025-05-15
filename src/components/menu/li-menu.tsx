import type {PropType} from "vue";
import {defineComponent, ref, Transition, TransitionGroup} from "vue";
import type {liItemProps} from "./li-menu-type.ts";
import './li-menu.css'
import LiIcon from "../icon/li-icon.tsx";

const LiMenu = defineComponent({
    name: 'LiMenu',
    props: {
        liItem: {
            type: Array as PropType<liItemProps[]>,
            default: [],
        },
        collapse: {
            type: Boolean,
            default: false
        },
        __menuStateMap: {
            type: Object as PropType<Record<string, boolean>>,
            default: () => ({}),
        }
    },
    setup(props, {expose}) {

        const menuStateMap = ref(props.__menuStateMap);
        const toggleMenu = ({name}: any) => {
            if (!props.collapse) {
                menuStateMap.value[name] = !menuStateMap.value[name]
            }
        }

        expose({
            menuStateMap,
            toggleMenu
        });

        return {
            menuStateMap,
            toggleMenu
        }
    },
    render() {
        return <TransitionGroup name="list" tag="div">
            {this.liItem.map((item: any) => (
                <ul class={'li-ul'}
                    key={item}>
                    <li class={'li-item'}
                        onClick={(e) => {
                            e.stopPropagation()
                            this.toggleMenu(item)
                        }}>
                        <div class={'li-item-div'}>
                            {this.collapse === false ?
                                <>
                                    {item.comp ?
                                        <>
                                            <item.comp></item.comp>
                                            <span hidden={!item.children}>
                                                <LiIcon style={{display: this.menuStateMap?.[item.name] ? '' : 'none'}}
                                                        name={'AngleDown'}
                                                        size={12}
                                                />
                                                <LiIcon style={{display: !this.menuStateMap?.[item.name] ? '' : 'none'}}
                                                        name={'AngleUp'}
                                                        size={12}
                                                />
                                            </span>
                                        </> :
                                        <>
                                            <span>
                                                {
                                                    item.img ?
                                                        <img class={'li-item-div-img'}
                                                             src={item.img}
                                                             alt={item.name}
                                                             width={12}
                                                             height={12}/> :
                                                        ''
                                                }
                                                {item.content}
                                            </span>
                                            <span hidden={!item.children}>
                                                <LiIcon style={{display: this.menuStateMap?.[item.name] ? '' : 'none'}}
                                                        name={'AngleDown'}
                                                        size={12}
                                                />
                                                <LiIcon style={{display: !this.menuStateMap?.[item.name] ? '' : 'none'}}
                                                        name={'AngleUp'}
                                                        size={12}
                                                />
                                            </span>
                                        </>
                                    }
                                </> :
                                <>
                                    {item.img ?
                                        <img class={'li-item-div-img'}
                                             src={item.img}
                                             alt={item.name}
                                             width={12}
                                             height={12}/> :
                                        (item.content)
                                    }
                                </>
                            }
                        </div>
                        <Transition name="fade">
                            {this.collapse === false ?
                                <Transition name="fade">
                                    {!this.menuStateMap[item.name] && (
                                        <LiMenu liItem={item.children}
                                                __menuStateMap={this.menuStateMap}
                                        />
                                    )}
                                </Transition> :
                                ''
                            }
                        </Transition>
                    </li>
                </ul>
            ))}
        </TransitionGroup>
    },
})

export default LiMenu
