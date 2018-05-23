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

    componentDidLoad() {
        this.applySettingsFromImages();
    }

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

    protected applySettingsFromImages() {

        Array.from(this.el.querySelectorAll('img[src][alt="background"]')).forEach(img => {
            const columns = this.el;
            let style = columns.hasAttribute('style') ? columns.getAttribute('style') : '';
            style += 'background-image: url(' + img.getAttribute('src') + ');';
            columns.setAttribute('style', style);
        });

        Array.from(this.el.querySelectorAll('img[src][alt="column-background"]')).forEach(img => {
            const columns = img.closest('section');
            let style = columns.hasAttribute('style') ? columns.getAttribute('style') : '';
            style += 'background-image: url(' + img.getAttribute('src') + ');';
            columns.setAttribute('style', style);
        });

    }
}