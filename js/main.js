// CONTAINERS BEGINNING //
const menuConfigs = [
    { container: '#menu', trigger: '.collapsible', content: '.collapsible-content', closeBtn: '#close-menu', targetClass: 'expanded-panel' },
    { container: '#social', trigger: '.collapsible-social', content: '.collapsible-social-content', closeBtn: '#close-social-menu', targetClass: 'expanded-panel' },
    { container: '#translate', trigger: '.collapsible-translate', content: '.collapsible-translate-content', closeBtn: '#close-translate-menu', targetClass: 'expanded-panel' },
    { container: '#impressum', trigger: '.collapsible-impressum', content: '.collapsible-impressum-content', closeBtn: '#close-impressum-menu', targetClass: 'expanded-fullscreen' }
];
function closeMenuPanel(config) {
    const el = document.querySelector(config.content);
    if (el) el.style.maxHeight = '0px';
    const containerEl = document.querySelector(config.container);
    if (containerEl) {
        containerEl.classList.remove(config.targetClass);
    }
}
menuConfigs.forEach((config) => {
    const triggerEl = document.querySelector(config.trigger);
    const contentEl = document.querySelector(config.content);
    const closeEl = document.querySelector(config.closeBtn);
    const containerEl = document.querySelector(config.container);
    if (triggerEl && contentEl) {
        triggerEl.addEventListener('click', function(e) {
            e.stopPropagation();
            menuConfigs.forEach(otherConfig => {
                if (otherConfig.content !== config.content) {
                    closeMenuPanel(otherConfig);
                }
            });
            const currentMaxHeight = window.getComputedStyle(contentEl).maxHeight;
            if (currentMaxHeight === '0px') {
                contentEl.style.maxHeight = contentEl.scrollHeight + 'px';
                if (containerEl) containerEl.classList.add(config.targetClass);
            } else {
                contentEl.style.maxHeight = '0px';
                if (containerEl) containerEl.classList.remove(config.targetClass);
            }
        });
    }
    if (closeEl) {
        closeEl.addEventListener('click', () => closeMenuPanel(config));
    }
});
window.addEventListener('click', function(e) {
    menuConfigs.forEach(config => {
        const containerEl = document.querySelector(config.container);
        if (containerEl && !containerEl.contains(e.target)) {
            closeMenuPanel(config);
        }
    });
});
// CONTAINERS ENDING //

// MENU TRANSITIONS BEGINNING //
document.addEventListener("DOMContentLoaded", function() {
    const shield = document.getElementById("fouc-shield");
    const overlay = document.querySelector(".fade-in-overlay");
    if (shield) {
        shield.remove();
    }
    document.documentElement.style.opacity = "1";
    if (overlay) {
        setTimeout(() => {
            overlay.classList.remove("visible");
        }, 50);
    }
});
$(document).ready(function() {
    $('#menu .collapsible-content a.menu').on('click', function(e) {
        const targetUrl = $(this).attr('href');
        if (!targetUrl || targetUrl === '#') return;
        e.preventDefault();
        const overlay = $('.fade-in-overlay');
        if (overlay.length) {
            overlay.addClass('visible');
            setTimeout(function() {
                window.location.href = targetUrl;
            }, 1000);
        } else {
            window.location.href = targetUrl;
        }
    });
});
// MENU TRANSITIONS ENDING //