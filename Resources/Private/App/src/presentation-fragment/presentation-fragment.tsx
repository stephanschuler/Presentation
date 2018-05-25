import { Component, Element, Prop } from '@stencil/core';

@Component({
    tag: 'presentation-fragment',
    styleUrl: 'presentation-fragment.css',
    shadow: true
})
export class PresentationFragment {

    @Element()
    readonly el: HTMLElement;

    @Prop()
    readonly tabindex!: number;

    componentDidLoad() {
        this.parentReady.then((value) => {
            value.registerFragment(this);
        });

        this.active = false;
    }

    componentDidUnload() {
        this.parentReady.then((value) => {
            value.unregisterFragment(this);
        });
    }

    set active(active: boolean) {
        this.parentElement.style.visibility = active ? 'visible' : 'hidden';
    }

    protected get parentElement() {
        let el = this.el.parentElement;
        return (el.childNodes.length <= 1) ? el.parentElement : el;
    }

    render() {
        return;
    }

    protected get parentReady() {
        return this.el.closest('presentation-slide').componentOnReady();
    }
}