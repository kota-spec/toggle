import { makeArray } from './_make-array';
import gsap from 'gsap';

const width = 50;

class Toggle {
  constructor () {
    this.toggle = document.getElementById('js-toggle');
    this.lineWraps = makeArray(document.querySelectorAll('.js-line-wrap'));
    this.lines = makeArray(document.querySelectorAll('.js-line'));

    this.isHover = false; // ホバー中かどうか
    this.isAnimation = false; // アニメーション中かどうか

    this.onMouseenter = this.onMouseenter.bind(this);
    this.onMouseleave = this.onMouseleave.bind(this);
  }

  init () {
    console.log(this.lineWraps);
    this.onListener();
  }

  onListener () {
    this.toggle.addEventListener('mouseenter', this.onMouseenter);
    this.toggle.addEventListener('mouseleave', this.onMouseleave);
  }

  onMouseenter () {
    if (!this.isHover) {
      this.isAnimation = true;
      this.lines.forEach((el, i) => {
        gsap.to(el, {
          x: width,
          duration: 0.3,
          delay: i * 0.1,
          ease: 'expo.out',
          onComplete: () => {
            gsap.set(el, {
              x: -width
            });

            gsap.to(el, {
              x: 0,
              duration: 0.3,
              ease: 'expo.out',
              onComplete: () => {
                this.isAnimation = false;
              }
            });
          }
        });
      });
    }

    this.isHover = true;
  }

  onMouseleave () {
    this.isHover = false;

    // this.lines.forEach(el => {
    //   gsap.killTweensOf(el);
    // });
  }
}

const toggle = new Toggle();
toggle.init();
