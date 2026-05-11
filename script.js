// ===== 动态几何线条背景 =====
const bgAnimation = document.getElementById('bg-animation');

function createBackgroundLines() {
    // 清除旧线条（用于窗口大小调整时重建）
    bgAnimation.innerHTML = '';
    const lineCount = 15;
    
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.classList.add('bg-line');
        
        // 随机水平位置
        line.style.left = Math.random() * 100 + '%';
        
        // 随机动画延迟与持续时间
        line.style.animationDelay = Math.random() * 8 + 's';
        line.style.animationDuration = (6 + Math.random() * 10) + 's';
        
        // 随机高度
        const height = 60 + Math.random() * 120;
        line.style.height = height + 'px';
        
        bgAnimation.appendChild(line);
    }
}

createBackgroundLines();

// 窗口大小改变时重建背景
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createBackgroundLines, 300);
});

// ===== 移动端菜单 =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// 点击导航链接后关闭菜单
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
    });
});

// ===== 导航高亮（滚动监听） =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSectionId) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===== 技能条动画（进入视口时触发） =====
const skillFills = document.querySelectorAll('.skill-fill');

function animateSkillBars() {
    skillFills.forEach(fill => {
        const targetWidth = fill.getAttribute('data-width');
        const rect = fill.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            fill.style.width = targetWidth + '%';
        }
    });
}

// 初始加载时检查
window.addEventListener('load', animateSkillBars);
window.addEventListener('scroll', animateSkillBars);

// ===== 终端模拟器中动态文本效果（可选装饰） =====
const cursorElement = document.querySelector('.cursor-blink');
if (cursorElement) {
    // 保持光标闪烁动画
    setInterval(() => {
        cursorElement.classList.toggle('blink-off');
    }, 530);
}

// ===== 页面加载完成后的入场动画 =====
document.addEventListener('DOMContentLoaded', () => {
    // 确保终端模拟器的入场动画触发
    const terminal = document.querySelector('.terminal-mockup');
    if (terminal) {
        setTimeout(() => {
            terminal.style.opacity = '1';
        }, 200);
    }
    
    // 为各部分添加延迟入场效果
    const scrollElements = document.querySelectorAll('.about-card, .skill-item, .project-card, .contact-card');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    };
    
    const hideScrollElement = (element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
    };
    
    // 初始化所有元素的初始状态
    scrollElements.forEach((el) => {
        hideScrollElement(el);
        el.style.transition = 'all 0.6s ease';
    });
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };
    
    window.addEventListener('load', () => {
        handleScrollAnimation();
    });
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // 立即检查一次
    handleScrollAnimation();
});