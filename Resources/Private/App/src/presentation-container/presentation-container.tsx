import { Component, Listen, Method, Prop, State } from '@stencil/core';
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

    @Prop({mutable: true, reflectToAttr: true})
    protected mousemove: boolean = false;

    protected mousemoveTimeout;

    componentDidLoad() {
        this.loading = false;
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

    @Listen('body:keydown.right')
    @Listen('body:keydown.down')
    nextSlide(ev: KeyboardEvent) {
        ev.preventDefault();
        this.currentOffset += 1;
    }

    @Listen('body:keydown.left')
    @Listen('body:keydown.up')
    previousSlide(ev: KeyboardEvent) {
        ev.preventDefault();
        this.currentOffset -= 1;
    }

    @Listen('body:mousemove')
    registerMouseMove() {
        this.mousemove = true;
        clearTimeout(this.mousemoveTimeout);
        this.mousemoveTimeout = setTimeout(() => {
            this.mousemove = false;
        }, 5000);
    }

    get currentOffset() {
        return this.slides.indexOf(this.activeSlide);
    }

    set currentOffset(nextOffset: number) {
        if (nextOffset >= 0 && nextOffset < this.slides.length) {
            if (this.activeSlide) {
                this.activeSlide.active = false;
            }
            this.slides[nextOffset].active = true;
        }
    }

    get activeSlide(): PresentationSlide {
        const active = this.slides.filter(slide => slide.active);
        return active.length === 0 ? null : active[0];
    };

    render() {
        return <slot/>;
    }
}