$(document).ready(function() {
    const isLang = sessionStorage.getItem('langTransition') === 'true';
    const isNormal = sessionStorage.getItem('normalTransition') === 'true';

    sessionStorage.removeItem('langTransition');
    sessionStorage.removeItem('normalTransition');

    // ==========================================
    // ENTRANCE LOGIC (When the new page lands)
    // ==========================================
    if (isNormal) {
        const $loader = $('.page-loader');
        
        // 1. Instantly force the loader visible with 0s lag to match the inbound darkness
        $loader.css('transition', 'none').addClass('visible');
        
        // 2. Kill the FOUC shield now that the loader has covered the screen
        $('#fouc-shield').remove();
        
        // 3. Restore the normal 1s fade animations
        $loader.css('transition', 'opacity 1s ease-out, visibility 1s ease-out');
        
        // 4. Stays dark for 0.5s, then darkness goes away over 1s
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

    // ==========================================
    // EXIT LOGIC (Clicking a standard link)
    // ==========================================
    $('a').not('.languages, [href^="#"], [href=""], [target="_blank"]').click(function(e) {
        e.preventDefault();
        const destination = this.getAttribute("href");
        
        // 1. In 1s screen goes dark
        $('.page-loader').removeClass('active fade-out').addClass('visible');
        
        // 2. Stays dark for 0.5s (1000ms fade transition + 500ms hold = 1500ms), then triggers navigation
        setTimeout(() => {
            sessionStorage.setItem('normalTransition', 'true');
            window.location.href = destination;
        }, 1500);
    });

    // ==========================================
    // PREVENT WHITE FLASH DURING TRANSIT
    // ==========================================
    // CRITICAL: Forces the background to lock onto solid dark the exact millisecond 
    // the browser attempts to tear down the old document context.
    $(window).on('beforeunload', function() {
        if (sessionStorage.getItem('normalTransition') === 'true' || sessionStorage.getItem('langTransition') === 'true') {
            $('html, body').css({
                'background-color': '#000000',
                'opacity': '1'
            });
        }
    });

    // ==========================================
    // LANGUAGE EXIT LOGIC 
    // ==========================================
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

