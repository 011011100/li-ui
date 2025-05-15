import {defineComponent} from "vue";

const LiIcon = defineComponent({
    name: 'LiIcon',
    props: {
        name: String,
        alt: String,
        height: {
            type: Number,
        },
        width: {
            type: Number,
        },
        size: {
            type: Number,
            default: 24,
        }
    },
    setup(props, {expose}) {
        const svgName = "#icon-" + props.name

        expose({
            svgName
        })

        return {
            svgName
        }
    },
    render() {
        return <svg aria-hidden="true"
                    style={{pointerEvents: 'none'}}
                    height={this.height || this.size}
                    width={this.width || this.size}>
            <use xlinkHref={this.svgName}/>
        </svg>
    }
})

export default LiIcon
