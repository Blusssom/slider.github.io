const scrollTriggerFunc = () => {
    gsap.registerPlugin(ScrollTrigger);

    const productHTML = document.querySelector('.product')

    const images = gsap.utils.toArray('.image');

    images.forEach((image, i) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "section.products",
                start: () => "top -" + (window.innerHeight*i),
                end: () => "+=" + window.innerHeight,
                scrub: true,
                toggleActions: "play none reverse none",
                invalidateOnRefresh: true,     
            }
        })

        if (i == 0) {
            tl.to(image, { duration: 1, opacity: 0, y:"-50%" }, "+=0.5");
        } else if (i < images.length - 1) {
            tl
            .to(image, { duration: 0.4, opacity: 1, y: "0%" })
            .to(image, { duration: 0.4, opacity: 0, y:"-50%" }, 0.66);
        } else {
            tl
            .to(image, { duration: 0.4, opacity: 1, y: "0%" })
        }

        if (i < 2) {
            tl.to('.scrollbar', { y: 0 + (productHTML.offsetHeight + (window.innerWidth < 1130 ? 5 : 25)) * (i + 1)})
        }
    });

    ScrollTrigger.create({

        trigger: "section.products",
        scrub: true,
        pin: true,
        start: () => "+50% +50%",
        end: () => `+=${(images.length) * window.innerHeight}`,
        invalidateOnRefresh: true,
    });
}

const mobileResponse = () => {
    const products = document.querySelectorAll('.product') 
    const images = document.querySelectorAll('.image')
    const proposal = document.querySelector('.proposal')

    for (let i = 0; i < products.length; i++) {
        products[i].appendChild(images[i])
    }
    document.querySelector('.images').remove()

    document.querySelector('.products').appendChild(proposal)

    document.querySelector('.products__wrapper').classList.add('swiper')
    document.querySelector('.products__text-wrapper').classList.add('swiper-wrapper')
    document.querySelectorAll('.product').forEach(el => {
        el.classList.add('swiper-slide')
    })
    const productsSwiper = new Swiper('.products__wrapper', {
        allowTouchMove: true,

        pagination: {
          el: '.products__pagination',
          dynamicBullets: true,
        },
    });
}

if (window.innerWidth > 850) {
    scrollTriggerFunc()
} else {
    mobileResponse()
}