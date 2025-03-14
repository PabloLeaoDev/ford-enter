let carouselArr = [];

class Carousel {
    static Start(arr){
        if(arr){
            Carousel._sequence = 0;
            Carousel._size = arr.length;
            Carousel.Next(); 
            Carousel._interval = setInterval(() => Carousel.Next(), 3000);
        } else {
            throw "Method Start need a Array Variable.";
        }
    }

    static Next(){
        
    }
};


