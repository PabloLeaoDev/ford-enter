class Carousel {
    constructor() {
        Carousel._elements = [
            document.querySelector('.ranger-img'), 
            document.querySelector('#carousel-title'), 
            document.querySelector('#back'), 
            document.querySelector('#next')
        ];
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

    static AddOrRemFadeIn(add = true) {
        for (let i in Carousel._elements) {
            if (i < 2) {
                add ? Carousel._elements[i].classList.add('fade-in') : Carousel._elements[i].classList.remove('fade-in');
            }
        }
    }

    static Start(arr) {
        if(arr){
            Carousel.Next(); 
            setInterval(() => Carousel.Next(), Carousel._interval);
        } else {
            throw "Method Start need a Array Variable.";
        }
    }

    static Back() {
        Carousel._sequence === 0 ? Carousel._sequence = 2 : Carousel._sequence--;   
        Carousel.AddFadeIn();
        Carousel._elements[0].setAttribute('src', Carousel._carouselArr[Carousel._sequence].image);
        Carousel._elements[1].innerText = Carousel._carouselArr[Carousel._sequence].title;
        Carousel.RemoveFadeIn();
    }

    static Next(clickBtn = false) {
        if (Carousel._sequence >= Carousel._size) Carousel._sequence = 0;

        Carousel.AddFadeIn();
        Carousel._elements[0].setAttribute('src', Carousel._carouselArr[Carousel._sequence].image);
        Carousel._elements[1].innerText = Carousel._carouselArr[Carousel._sequence].title;
        Carousel._sequence++;
        Carousel.RemoveFadeIn();

        let toSetInterval = (callbackFn, millisec) => setInterval(() => callbackFn(), millisec);

        if (clickBtn) {
            clearInterval(toSetInterval);
            setTimeout(() => toSetInterval(next, Carousel._interval), 5000);
        }
    }
};

const btnBack = document.getElementById('back');
const btnNext = document.getElementById('next');

btnBack.addEventListener('click', () => Carousel.Back());
btnNext.addEventListener('click', () => Carousel.Next(true));

new Carousel();