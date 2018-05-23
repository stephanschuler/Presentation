import { Component, Method, Prop, State } from '@stencil/core';
import { PresentationSlide } from "../presentation-slide/presentation-slide";

@Component({
    tag: 'presentation-container',
    styleUrl: 'presentation-container.css',
    shadow: true
})
export class PresentationContainer {

    @State()
    protected slides: PresentationSlide[] = [];

    @Prop({mutable: true, reflectToAttr: true})
    protected loading: boolean = true;

    componentDidLoad() {
        this.loading = false;
    }

    render() {
        return <slot/>;
    }

    @Method()
    registerSlide(slide: PresentationSlide) {
        this.slides.push(slide);
        this.slides = this.slides.sort((a, b) => {
            return a.tabindex > b.tabindex ? 1 : -1;
        });
    }

    @Method()
    unregisterSlide(delinquent: PresentationSlide) {
        this.slides = this.slides.filter(slide => slide !== delinquent);
    }
}