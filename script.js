// =====================
// CARROSSEL DE NOTÍCIAS
// =====================
window.onload = function(){
    const carrossel = document.querySelector('.carrossel-noticias');
    if(carrossel){
        let scrollPos = 0;
        const speed = 0.3; // menor = mais devagar

        function loopCarrossel(){
            scrollPos += speed;

            // volta para o início quando chega ao final
            if(scrollPos >= carrossel.scrollWidth - carrossel.clientWidth){
                scrollPos = 0;
            }

            carrossel.scrollLeft = scrollPos;
            requestAnimationFrame(loopCarrossel);
        }

        requestAnimationFrame(loopCarrossel);
    }
};
