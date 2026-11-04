var url = document.location.pathname + document.location.search
var url_referrer = document.referrer;
var yaParams = {error404: {page: url, from: url_referrer}};

ga('send', 'pageview', '404.php?page='+ document.location.pathname + document.location.search +'&from=' + document.referrer);