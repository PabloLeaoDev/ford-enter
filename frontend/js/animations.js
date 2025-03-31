document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = 0;
    document.body.style.transition = 'opacity 1s';
    setTimeout(() => (document.body.style.opacity = 1), 100);

    const inputs = document.querySelectorAll('.fordform');
    inputs.forEach((input) => {
        input.addEventListener('focus', () => {
            input.style.transition = '0.3s';
            input.classList.add('in-focus');
        });

        input.addEventListener('blur', () => input.classList.remove('in-focus'));
    });

    const button = document.querySelector("button[type='submit']");
    button.addEventListener('mouseover', () => button.classList.add('in-mouseover-btn'));
    button.addEventListener('mouseout', () => button.classList.remove('in-mouseover-btn'));

    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => link.classList.add('in-mouseover-link'));
        link.addEventListener('mouseout', () => link.classList.remove('in-mouseover-link'));
    });

    const formSection = document.querySelector('.forms');
    formSection.style.opacity = 0;
    formSection.style.transform = 'translateY(50px)';

    setTimeout(() => {
        formSection.style.opacity = 1;
        formSection.style.transform = 'translateY(0)';
    }, 300)
});
