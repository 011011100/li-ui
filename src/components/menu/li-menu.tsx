import AngleDown from '@/assets/AngleDown.svg';
import AngleUp from '@/assets/AngleUp.svg';
import type {CSSProperties, PropType} from "vue";
import {defineComponent, ref} from "vue";

type liItem = {
    content: string,
    img?: string
}

const liMenu = defineComponent({
    name: 'liMenu',
    props: {
        liItem: {
            type: Array as PropType<liItem[]>,
            default: [],
        },
        haveImg: {
            type: Boolean,
            default: true
        }
    },
    setup(props, {expose}) {
        const menuHidden = ref<boolean>(false);

        const toggleMenu = () => {
            menuHidden.value = !menuHidden.value;
        }

        const ulStyle: CSSProperties = {
            listStyle: 'none',
            padding:'unset'
        };

        const liItemDivStyle: CSSProperties = {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '8px'
        };

        expose({
            menuHidden,
            ulStyle,
            liItemDivStyle,
            toggleMenu
        });

        return {
            menuHidden,
            ulStyle,
            liItemDivStyle,
            toggleMenu
        }
    },
    render() {
        const slot = this.$slots
        return <ul style={this.ulStyle}>
            <div onClick={this.toggleMenu} style={{display: 'flex', alignItems: 'center'}}>
                <img style={{paddingRight: '8px'}}
                    src={'vue.svg'}
                    alt={'title img'}
                    width={16}
                    height={16}
                />
                {slot.title ? slot.title() : <span>title</span>}
                <span hidden={!this.$props.haveImg}>
                    {slot.img ? slot.img() :
                        <>
                            <img
                                hidden={this.menuHidden}
                                src={AngleDown}
                                alt={"向下"}
                                width={12}
                                height={12}
                            />
                            <img
                                hidden={!this.menuHidden}
                                src={AngleUp}
                                alt={"向上"}
                                width={12}
                                height={12}
                            />
                        </>
                    }
                </span>
            </div>
            <span hidden={!this.menuHidden}>
              {this.liItem.map((item: any) => (
                  <div style={this.liItemDivStyle}>
                      {item.img ?
                          <img style={{paddingRight: '8px'}}
                               width={16}
                               height={16}
                               src={item.img}
                               alt={item.content}
                          /> :
                          null}
                      <li>{item.content}</li>
                  </div>
              ))}
            </span>
        </ul>
    },
})

export default liMenu
