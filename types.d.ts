/* eslint-disable import/no-default-export */
declare module '*.css';

declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}