import { configType } from './boxShadow';
interface ShadowType {
    config: (options: Partial<configType>) => void;
    show: () => void;
    hide: () => void;
}
declare const Shadow: ShadowType;
export default Shadow;
export { ShadowType };
