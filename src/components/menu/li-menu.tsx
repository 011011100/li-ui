import type {PropType} from "vue";
import {defineComponent, ref, Transition, TransitionGroup} from "vue";
import type {liItemProps} from "./li-menu-type.ts";
import './li-menu.css'

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
            menuStateMap.value[name] = !menuStateMap.value[name]
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
