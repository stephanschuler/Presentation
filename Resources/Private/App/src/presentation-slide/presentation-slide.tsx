import { Component, Element, Prop, State } from '@stencil/core';

@Component({
    tag: 'presentation-slide',
    styleUrl: 'presentation-slide.css',
    shadow: true
})
export class PresentationSlide {

    @Element()
    readonly el: HTMLElement;

    @Prop({mutable: true, reflectToAttr: true})
    @State()
    active: boolean = false;

    @Prop()
    readonly tabindex!: number;

    hostData() {
        return {
            'class': {
                'active': this.active,
                'inactive': !this.active
            }
        };
    }

    render() {
        return <slot/>;
    }
}