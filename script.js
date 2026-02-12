// Vasuki Website JavaScript - Multi-page version

// Logo Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const leftArrow = document.querySelector('.carousel-arrow-left');
    const rightArrow = document.querySelector('.carousel-arrow-right');
    
    if (track && leftArrow && rightArrow) {
        const items = Array.from(track.children);
        const itemWidth = items[0].getBoundingClientRect().width + 50; // width + gap
        let currentIndex = 0;
        
        // Clone items for infinite scroll effect
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
        
        leftArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            }
        });
        
        rightArrow.addEventListener('click', () => {
            currentIndex++;
            track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            
            // Reset when reaching clones
            if (currentIndex >= items.length) {
                setTimeout(() => {
                    track.style.transition = 'none';
                    currentIndex = 0;
                    track.style.transform = `translateX(0)`;
                    setTimeout(() => {
                        track.style.transition = 'transform 0.5s ease';
                    }, 50);
                }, 500);
            }
        });
        
        // Auto-scroll carousel
        setInterval(() => {
            rightArrow.click();
        }, 5000);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
