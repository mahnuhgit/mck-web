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

            // Force close and shrink all other menus first
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


