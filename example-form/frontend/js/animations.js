document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = 0;
    document.body.style.transition = 'opacity 1s';
    setTimeout(() => (document.body.style.opacity = 1), 100);

    const inputs = document.querySelectorAll('.fordform');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            this.style.transition = '0.3s';
            this.style.boxShadow = '0px 0px 10px rgba(19, 81, 216, 0.5)';
            this.style.borderColor = '#1351d8';
        });

        input.addEventListener('blur', () => {
            this.style.boxShadow = 'none';
            this.style.borderColor = '#cccccc';
        });
    });

    const button = document.querySelector("button[type='submit']");
    button.addEventListener('mouseover', () => {
        this.style.transform = 'scale(1.1)';
        this.style.transition = '0.3s';
    });

    button.addEventListener('mouseout', () => this.style.transform = 'scale(1)');

    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            this.style.transition = '0.3s';
            this.style.textShadow = '2px 2px 5px rgba(19, 81, 216, 0.5)';
        });

        link.addEventListener('mouseout', () => this.style.textShadow = 'none');
    });

    const formSection = document.querySelector('.forms');
    formSection.style.opacity = 0;
    formSection.style.transform = 'translateY(50px)';
    formSection.style.transition = 'opacity 2.5s, transform 2.5s';

    setTimeout(() => {
        formSection.style.opacity = 1;
        formSection.style.transform = 'translateY(0)';
    }, 300)
});
