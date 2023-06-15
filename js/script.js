const dynamicHeader = document.querySelector('.dynamic_header')
const orderForm = document.querySelector('.order_form')
const aboutUsBtn = document.querySelector('.about_us_btn')
const cakesToOrderBtns = document.querySelectorAll('.cakes_to_order_list_btn')
const orderFormCross = document.getElementById('order_form_cross')
const overlay = document.querySelector('.overlay')
const assortmentList = document.querySelector('.assortment_list')
const assortmentItems = document.querySelectorAll('.assortment_item')

function showOrderForm() {
    orderForm.style.visibility = 'visible'
    orderForm.style.opacity = 1
}

function closeOrderForm() {
    orderForm.style.visibility = 'hidden'
    orderForm.style.opacity = 0
}

// Bind functions
aboutUsBtn.onclick = showOrderForm
cakesToOrderBtns.forEach(item => item.onclick = showOrderForm)
orderFormCross.onclick = closeOrderForm
overlay.onclick = closeOrderForm

// Dynamic header
window.onscroll = () => {
    if (window.scrollY > 640) {
        dynamicHeader.style.visibility = 'visible'
        dynamicHeader.style.top = '-40px'
    } else {
        dynamicHeader.style.visibility = 'hidden'
        dynamicHeader.style.top = '-200px'
    }
}

// Carousel
let started = 0
const options = {
    rootMargin: '0px',
    threshold: 0.4
}
const callback = (entries, observer) => {
    if (started < 2) {
        started += 1
        new Propeller(assortmentList, { inertia: 0.98, speed: 10.4 })
    }
};
const observer = new IntersectionObserver(callback, options);
observer.observe(assortmentList);

////////////////////////////////////////////////////////////////

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let skewSetter = gsap.quickTo('.main_screen_right_decore', 'skewX')
rotateSetter = gsap.quickTo('.swipe_tip', 'rotation')
clamp = gsap.utils.clamp(-10, 10)


let smoother = ScrollSmoother.create({
    smooth: 1,
    effects: true,
    smoothTouch: 0.1,
    onUpdate: (self) => {
        skewSetter(clamp(self.getVelocity() / -50))
        rotateSetter(clamp(self.getVelocity() / -50))
    },
    onStop: () => {
        if (window.innerWidth > 768) skewSetter(0)
        rotateSetter(0)
    }
});

if (window.innerWidth > 768) {
    smoother.effects(".main_screen_right_decore", {
        lag: (i) => i * 0.04,
    })
}

smoother.effects(".about_us_img_wrapper > img", {
    speed: (i) => {
        if (i > 0) {
            return 1.2
        }
    },
})

let mySplitText = new SplitText(".cakes_to_order_title", { type: "words,chars" });
let chars = mySplitText.chars;

chars.forEach((char, i) => {
    let lag;
    if (i < chars.length / 2) {
      lag = (i + 1) * 0.02;
    } else {
      lag = ((chars.length - i) + 1) * 0.02;
    }
    smoother.effects(char, { speed: 1, lag: lag });
  });
  

gsap.to(".about_us_img", {
    scrollTrigger: {
        trigger: ".about_us",
        scrub: true,
    },
    rotate: 30
});

const features = document.getElementsByClassName('feature');
[...features].forEach(i => {
    i.style.opacity = 0
    i.style.transform = 'scale(3)'

    gsap.to(i, {
        scrollTrigger: {
            trigger: i,
            start: "-=100px center",
        },
        opacity: 1,
        scale: 1
    })
})

const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId == '#body' || targetId == '#header' || targetId == '#') {
            smoother.scrollTo(0);
        } else {
            smoother.scrollTo(targetId, true, "center center")
        }
    });
});

// gsap.fromTo(".subscribe_form",
//     {
//         scale: 0
//     },
//     {
//         scrollTrigger: {
//             trigger: ".subscribe_form",
//             start: "-=300px center"
//         },
//         scale: 1,
//         ease: "elastic",
//     }
// );

// Mobile browsers top placeholder fix
// window.addEventListener('resize', () => {
//     document.body.style.height = window.innerHeight + 'px'
// })
// document.body.style.height = window.innerHeight + 'px'