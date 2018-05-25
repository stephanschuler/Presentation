import { Component, Element, Method, Prop, State, Watch } from '@stencil/core';
import { PresentationFragment } from '../presentation-fragment/presentation-fragment';

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

    protected fragment: PresentationFragment[] = [];

    steps: number = 1;

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

    @Watch('currentOffset')
    watchCurrentOffset(currentOffset: number) {
        this.fragment.forEach((fragment, offset) => {
            fragment.active = (currentOffset > offset);
        });
    }

    @Method()
    registerFragment(fragment: PresentationFragment) {
        this.fragment.push(fragment);
        this.fragment = this.fragment.sort((a, b) => {
            return a.tabindex > b.tabindex ? 1 : -1;
        });
        this.steps = this.fragment.length + 1;
    }

    @Method()
    unregisterFragment(delinquent: PresentationFragment) {
        this.fragment = this.fragment.filter(fragment => fragment !== delinquent);
        this.steps = this.fragment.length + 1;
    }

    render() {
        return <slot/>;
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