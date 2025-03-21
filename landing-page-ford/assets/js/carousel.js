class Carousel {
    constructor() {
        Carousel._elements = [document.querySelector('.ranger-img'), document.querySelector('#carousel-title')];
        Carousel._sequence = 0;
        Carousel._carouselArr = [{
            image: 'assets/img/imagem_1.jpg',
            title: 'Essa é a nova Ford Ranger 2022. Verifique as Novidades.',
            url: ''
        }, {
            image: 'assets/img/imagem_2.jpg',
            title: 'Ford T. Modelo que popularizou e revolucionou a indústria automobilística',
            url: ''
        }, {
            image: 'assets/img/imagem_3.jpg',
            title: 'Nova Ford Bronco Sport 2022',
            url: ''
        }];
        Carousel._size = Carousel._carouselArr.length;
        Carousel._interval = 2000;

        Carousel.Start(Carousel._carouselArr);
    }

    static Start(arr) {
        if(arr){
            Carousel.Next(); 
            setInterval(() => Carousel.Next(), Carousel._interval);
        } else {
            throw "Method Start need a Array Variable.";
        }
    }

    static Next() {
        if (Carousel._sequence >= Carousel._size) Carousel._sequence = 0;

        for (let index in Carousel._elements) Carousel._elements[index].classList.add('fade-in');

        setTimeout(() => {
            Carousel._elements[0].setAttribute('src', Carousel._carouselArr[Carousel._sequence].image);
            Carousel._elements[1].innerText = Carousel._carouselArr[Carousel._sequence].title;
            Carousel._sequence++;
            for (let index in Carousel._elements) Carousel._elements[index].classList.remove('fade-in');
        }, 1000); 
    }
};

new Carousel();