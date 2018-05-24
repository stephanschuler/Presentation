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

    @Prop({mutable: true, reflectToAttr: true})
    @State()
    currentOffset: number = 0;

    @Prop()
    readonly tabindex!: number;

    componentDidLoad() {
        this.parentReady.then((value) => {
            value.registerSlide(this);
        });

        this.applySettingsFromImages();
    }

    componentDidUnload() {
        this.parentReady.then((value) => {
            value.unregisterSlide(this);
        });
    }

    hostData() {
        const step = this.currentOffset + 1;
        let classNames = [];
        classNames['active'] = this.active;
        classNames['inactive'] = !this.active;
        classNames['step-' + step] = this.active;
        classNames['of-' + this.steps] = this.active;
        return {
            'class': classNames
        };
    }

    render() {
        return <slot/>;
    }

    get steps(): number {
        const lis = this.el.querySelectorAll('li').length;
        return lis ? lis : 1;
    }

    protected applySettingsFromImages() {
        const mappings = [{
            fromSelector: 'img[src][alt="background"]',
            toContainer: 'presentation-slide'
        }, {
            fromSelector: 'img[src][alt="column-background"]',
            toContainer: 'section'
        }];
        mappings.forEach(mapping => {
            Array.from(this.el.querySelectorAll(mapping.fromSelector)).forEach(img => {
                const container = img.closest(mapping.toContainer);
                let style = container.hasAttribute('style') ? container.getAttribute('style') : '';
                style += 'background-image: url(' + img.getAttribute('src') + ');';
                container.setAttribute('style', style);
            });
        });

    }

    protected get parentReady() {
        return this.el.closest('presentation-container').componentOnReady();
    }
}