window.onbeforeunload = () => {
    window.scrollTo(0, 0);
}
const hiddenElements = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entryIter) => {

        if (entryIter.isIntersecting) {
            entryIter.target.classList.add('shown');
        }
        else {
            entryIter.target.classList.remove('shown');
        }

    });
});
hiddenElements.forEach((element) =>
    observer.observe(element)
);

const hiddenElements1 = document.querySelectorAll('.hidden1');
const observer1 = new IntersectionObserver((entries) => {
    entries.forEach((entryIter) => {

        if (entryIter.isIntersecting) {
            entryIter.target.classList.add('shown1');
        }
        else {
            entryIter.target.classList.remove('shown1');
        }

    });
});
hiddenElements1.forEach((element) =>
    observer1.observe(element)
);
const hiddenElements2 = document.querySelectorAll('.hidden2');
const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entryIter) => {

        if (entryIter.isIntersecting) {
            entryIter.target.classList.add('shown2');
        }
        else {
            entryIter.target.classList.remove('shown2');
        }

    });
});
hiddenElements2.forEach((element) =>
    observer2.observe(element)
);
const hiddenElements3 = document.querySelectorAll('.hidden3');
const observer3 = new IntersectionObserver((entries) => {
    entries.forEach((entryIter) => {

        if (entryIter.isIntersecting) {
            entryIter.target.classList.add('shown3');
        }
        else {
            entryIter.target.classList.remove('shown3');
        }

    });
});
hiddenElements3.forEach((element) =>
    observer3.observe(element)
);
const hiddenElements4 = document.querySelectorAll('.hidden4');
const observer4 = new IntersectionObserver((entries) => {
    entries.forEach((entryIter) => {

        if (entryIter.isIntersecting) {
            entryIter.target.classList.add('shown4');
        }
        else {
            entryIter.target.classList.remove('shown4');
        }

    });
});
hiddenElements4.forEach((element) =>
    observer4.observe(element)
);
