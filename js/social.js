document.querySelector('.collapsible-social').addEventListener('click', function(e) {
    e.stopPropagation(); 
    const content = document.querySelector('.collapsible-social-content');
    
    const currentMaxHeight = window.getComputedStyle(content).maxHeight;
    
    if (currentMaxHeight === '0px') {
        content.style.maxHeight = content.scrollHeight + 'px';
    } else {
        content.style.maxHeight = '0px';
    }
});

document.getElementById('close-social-menu').addEventListener('click', function() {
    const content = document.querySelector('.collapsible-social-content');
    content.style.maxHeight = '0px';
});

window.addEventListener('click', function(e) {
    const menu = document.getElementById('social');
    const content = document.querySelector('.collapsible-social-content');
    
    if (!menu.contains(e.target)) {
        content.style.maxHeight = '0px';
    }
});