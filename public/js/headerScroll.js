window.onload = init();
function init() {
    window.addEventListener('scroll', function(e){

        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 100,
            header = document.querySelector("header");
        if (distanceY > shrinkOn) {
            classie.add(header,"smaller");
            var image = document.getElementById('imgLogo');
            image.src = 'images/logoSmall.png';
            image.style.width = '150px';
            image.style.padding = '5px 0 0 0';
        } else {
            if (classie.has(header,"smaller")) {
            classie.remove(header,"smaller");
            var image = document.getElementById('imgLogo');
            image.src = 'images/logo.png';
            image.style.width = '150px';
            image.style.padding = '20px 0 0 0';
            }
        }
    });
}
