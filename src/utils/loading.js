import Loading from '@/components/Loading'

export default function loading(callback) {
    const component = () => ({
        component: callback(),
        loading: Loading
    })
    return {
        render(h) {
            return h(component)
        }
    }
}