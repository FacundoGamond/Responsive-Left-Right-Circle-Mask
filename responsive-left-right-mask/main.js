class MaskMagic {
    constructor(element, gap, breakpoint = 768) {
        this.container = element;
        this.master = element.querySelector('.master-mask-magic');
        this.slave = element.querySelector('.slave-mask-magic');
        this.gap = gap;
        this.breakpoint = breakpoint
        this.observerResize();
    }

    observerResize() {
        const self = this;
        new ResizeObserver((e) => {
            let masterHeight = e[0].target.clientHeight;
            let slaveRadio = masterHeight / 2;

            let mask = `radial-gradient(circle at -50px 50%, transparent 0, transparent ${slaveRadio + self.gap}px, black 0%, black 100%, transparent 0%, transparent)`;
            if (window.innerWidth <= self.breakpoint) {
                let masterWidth = e[0].target.clientWidth
                slaveRadio = masterWidth / 2;
                mask = `radial-gradient(circle at 50% -50px, transparent 0, transparent ${slaveRadio + self.gap}px, black 0%, black 100%, transparent 0%, transparent)`;
                self.slave.setAttribute('style', `mask-image: ${mask}; -webkit-mask-image: ${mask}; margin-top: -${slaveRadio - this.gap*2}px; height: calc(100% + ${slaveRadio - this.gap*2}px);`);
            }else{
                self.slave.setAttribute('style', `mask-image: ${mask}; -webkit-mask-image: ${mask}; margin-left: -${slaveRadio - this.gap*2}px; width: calc(100% + ${slaveRadio - this.gap*2}px);`);
            }
        }).observe(this.master);
    }
}

const element = document.querySelector('.magic-mask');
new MaskMagic(element, 20);