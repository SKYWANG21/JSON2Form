import { withModifiers, defineComponent, Ref } from 'vue';

export interface Data {
  /** 元素名 */
  type: any;
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
  /** 模板引用 */
  ref?: Ref;
}

/**
 * @param data 渲染数据
 * @param model 表单数据
 */
export const JSON2Form = defineComponent(
  (props: { data: Data[]; model?: Record<string, any> }) => {
    function translate(params: Data[]) {
      return params.map((it) => {
        const update = {};
        it.formModel?.forEach((el) => {
          update[`onUpdate:${el[1] ?? 'modelValue'}`] = (e) => {
            props.model![el[0]] = e;
          };
        });
        if (it.vIf ?? true) {
          return (
            <it.type {...it.props} {...it.event} {...update} ref={it.ref}>
              {(() => (it.children && it.children.length > 0 ? translate(it.children) : it.cont))()}
            </it.type>
          );
        } else {
          return null;
        }
      });
    }
    return () => {
      return translate(props.data);
    };
  },
  {
    props: ['data', 'model'],
  }
);
