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

    protected currentOffset: number = 0;

    protected steps: number = 0;

    componentDidLoad() {
        this.loading = false;
    }

    @Method()
    registerSlide(slide: PresentationSlide) {
        if (slide.steps <= 0) {
            return;
        }
        this.slides.push(slide);
        this.slides = this.slides.sort((a, b) => {
            return a.tabindex > b.tabindex ? 1 : -1;
        });
        this.steps = this.slides
            .map(slide => slide.steps)
            .reduce((value, item) => value + item, 0);
        this.callSlide(0);
    }

    @Method()
    unregisterSlide(delinquent: PresentationSlide) {
        this.slides = this.slides.filter(slide => slide !== delinquent);
        this.steps = this.slides
            .map(slide => slide.steps)
            .reduce((value, item) => value + item, 0);
        this.callSlide(0);
    }

    @Listen('body:keydown.right')
    @Listen('body:keydown.down')
    nextSlide(ev: KeyboardEvent) {
        ev.preventDefault();
        if (this.currentOffset < this.steps - 1) {
            this.currentOffset++;
            this.callSlide(this.currentOffset);
        }
    }

    @Listen('body:keydown.left')
    @Listen('body:keydown.up')
    previousSlide(ev: KeyboardEvent) {
        ev.preventDefault();
        if (this.currentOffset > 0) {
            this.currentOffset--;
            this.callSlide(this.currentOffset);
        }
    }

    @Listen('body:mousemove')
    registerMouseMove() {
        this.mousemove = true;
        clearTimeout(this.mousemoveTimeout);
        this.mousemoveTimeout = setTimeout(() => {
            this.mousemove = false;
        }, 5000);
    }

    protected callSlide(newStep: number) {
        let indexFrom = 0;
        this.slides.forEach(slide => {
            const size = slide.steps;
            const indexTo = indexFrom + size - 1;
            slide.active = (newStep >= indexFrom && newStep <= indexTo);
            if (slide.active) {
                slide.currentOffset = newStep - indexFrom;
            }
            indexFrom += size;
        })
    }

    render() {
        return <slot/>;
    }
}