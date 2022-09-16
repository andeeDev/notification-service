import { Builder } from './Builder';

export abstract class MessageBuilder<K, V> extends Builder<V> {
    public abstract readonly message: K;
}
