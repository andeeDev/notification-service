import { Builder } from './Builder';

export abstract class MessageBuilder<K> extends Builder {
    public message: K;
}
