import { withModifiers, defineComponent } from 'vue';
export interface Data {
  /** 元素名 */
  name: any;
  /** 属性 */
  props?: { [key: string]: any };
  /** 表单数据 */
  formModel?: [value: string, key?: string][];
  /** 事件 */
  event?: { [key: string]: () => any | keyof typeof withModifiers<(...args: any[]) => any> };
  /** 子元素 */
  children?: Data[];
  /** 条件渲染 */
  vIf?: boolean;
  /** innerText */
  cont?: string;
}

export const JSON2Form = defineComponent(
  (props: { data: Data[]; model: Record<string, any> }) => {
    function translate(params: Data[]) {
      return params.map((it) => {
        const update = {};
        it.formModel?.forEach((el) => {
          update[`onUpdate:${el[1] ?? 'modelValue'}`] = (e) => {
            props.model[el[0]] = e;
          }
        });
        if (it.vIf ?? true) {
          return (
            <it.name {...it.props} {...it.event} {...update}>
              {(() => (it.children && it.children.length > 0 ? translate(it.children) : it.cont))()}
            </it.name>
          )
        } else {
          return null;
        }
      })
    }
    return () => {
      return translate(props.data);
    };
  },
  {
    props: ['data', 'model'],
  }
);
