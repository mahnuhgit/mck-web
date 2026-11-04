// MENUS BEGINNING //
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
// MENUS ENDING //

// LOADERS BEGINNING //
$(document).ready(function() {
    const isLang = sessionStorage.getItem('langTransition') === 'true';
    const isNormal = sessionStorage.getItem('normalTransition') === 'true';
    sessionStorage.removeItem('langTransition');
    sessionStorage.removeItem('normalTransition');
    if (isNormal) {
        const $loader = $('.page-loader');
        $loader.css('transition', 'none').addClass('visible');
        $('#fouc-shield').remove();
        $loader.css('transition', 'opacity 1s ease-out, visibility 1s ease-out');
        setTimeout(() => {
            $loader.removeClass('visible');
        }, 500);
    } 
    else if (isLang) {
        const $loader = $('.page-loader');
        $loader.css('transition', 'none').addClass('visible active');
        $('#fouc-shield').remove();
        setTimeout(() => {
            $loader.css('transition', 'opacity 1s ease-out, visibility 1s ease-out').removeClass('active');
        }, 50);
        setTimeout(() => {
            $loader.removeClass('visible');
        }, 1050);
    } 
    else {
        // Direct Visit / Refresh
        $('#fouc-shield').remove();
    }
    $('a').not('.languages, [href^="#"], [href=""], [target="_blank"]').click(function(e) {
        e.preventDefault();
        const destination = this.getAttribute("href");
        $('.page-loader').removeClass('active fade-out').addClass('visible');
        setTimeout(() => {
            sessionStorage.setItem('normalTransition', 'true');
            window.location.href = destination;
        }, 1500);
    });
    $(window).on('beforeunload', function() {
        if (sessionStorage.getItem('normalTransition') === 'true' || sessionStorage.getItem('langTransition') === 'true') {
            $('html, body').css({
                'background-color': '#000000',
                'opacity': '1'
            });
        }
    });
    $('.languages').click(function(e) {
        e.preventDefault();                  
        const destination = this.getAttribute("href"); 
        const $loader = $('.page-loader');
        $loader.removeClass('en de it es fade-out active visible')
               .addClass($(this).attr('data-lang') + ' visible')
               .find('.h4-loader').text($(this).attr('data-loading'));
        setTimeout(() => $loader.addClass('active'), 50);      
        setTimeout(() => $loader.addClass('fade-out'), 2000);   
        setTimeout(() => {
            sessionStorage.setItem('langTransition', 'true');
            window.location.href = destination;                      
        }, 3500);
    });
});
// LOADERS ENDING //