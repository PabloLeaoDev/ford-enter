class Carousel {
    constructor() {
        Carousel._elements = [
            document.querySelector('.ranger-img'), 
            document.querySelector('#carousel-title'), 
            document.querySelector('#back'), 
            document.querySelector('#next')
        ];
        Carousel._sequence = -1;
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
        Carousel._setInterval;

        Carousel.Start(Carousel._carouselArr);
    }

    static AddOrRemFadeIn(add = true) {
        for (let i in Carousel._elements) {
            if (i <= 1) {
                add ? Carousel._elements[i].classList.add('fade-in') : Carousel._elements[i].classList.remove('fade-in');
            }
        }
    }

    static Start(arr) {
        if(arr){
            Carousel.Next(); 
            Carousel._setInterval = setInterval(() => Carousel.Next(), Carousel._interval);
        } else {
            throw "Method Start need a Array Variable.";
        }
    }

    static Back() {
        clearInterval(Carousel._setInterval);
        
        Carousel._sequence === 0 ? Carousel._sequence = Carousel._size - 1 : Carousel._sequence--;   
        Carousel.ChangeSlide();
        
        Carousel._setInterval = setInterval(() => Carousel.Next(), Carousel._interval);
    }

    static Next(clickBtn = false) {
        console.log(Carousel._sequence);
        console.log(Carousel._carouselArr[Carousel._sequence]);
        if (clickBtn) {
            clearInterval(Carousel._setInterval);
            Carousel._setInterval = setInterval(() => Carousel.Next(), Carousel._interval);
        }

        console.log(Carousel._sequence >= Carousel._size - 1);

        if (Carousel._sequence >= Carousel._size - 1) Carousel._sequence = -1;
        
        Carousel.ChangeSlide();
        
        Carousel._sequence++;
    }

    static ChangeSlide() {
        Carousel.AddOrRemFadeIn();
        
        setTimeout(() => {
            Carousel._elements[0].setAttribute('src', Carousel._carouselArr[Carousel._sequence].image);
            Carousel._elements[1].innerText = Carousel._carouselArr[Carousel._sequence].title;
            Carousel.AddOrRemFadeIn(false);
        }, 300); 
    }
};

const btnBack = document.getElementById('back');
const btnNext = document.getElementById('next');

btnBack.addEventListener('click', () => Carousel.Back());
btnNext.addEventListener('click', () => Carousel.Next(true));

new Carousel();