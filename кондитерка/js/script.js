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
    if (window.scrollY > 140) {
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
        new Propeller(assortmentList, {inertia: 0.98, speed: 10.4})
    }
};
const observer = new IntersectionObserver(callback, options);
observer.observe(assortmentList);