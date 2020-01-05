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
    this.isClick = false;

    this.onMouseenter = this.onMouseenter.bind(this);
    this.onMouseleave = this.onMouseleave.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  init () {
    console.log(this.lineWraps);
    this.onListener();
  }

  onListener () {
    this.toggle.addEventListener('click', this.onClick);
    this.toggle.addEventListener('mouseenter', this.onMouseenter);
    this.toggle.addEventListener('mouseleave', this.onMouseleave);
  }

  onClick () {
    this.isClick = !this.isClick;

    if (this.isClick) {
      this.lineWraps.forEach(r => {
        r.classList.add('open');
      });
    } else {
      this.lineWraps.forEach(r => {
        r.classList.remove('open');
      });
    }

    this.animation();
  }

  onMouseenter () {
    if (!this.isHover) {
      this.isAnimation = true;
      this.animation();
    }

    this.isHover = true;
  }

  onMouseleave () {
    this.isHover = false;
  }

  animation () {
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
}

const toggle = new Toggle();
toggle.init();
