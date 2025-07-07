const slides = document.querySelectorAll('.form-slide');
let currentSlide = 0;

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        slides[currentSlide].classList.remove('active');
        currentSlide++;
        slides[currentSlide].classList.add('active');
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        slides[currentSlide].classList.remove('active');
        currentSlide--;
        slides[currentSlide].classList.add('active');
    }
}


function togglePlaceExtra(value) {
    const extra = document.getElementById('customLocation');
    extra.style.display = (value === 'אחר') ? 'block' : 'none';
}

function toggleTutorExtra(value) {
    const extra = document.getElementById('customTutor');
    extra.style.display = (value === 'אחר') ? 'block' : 'none';
}

document.getElementById('eventForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const json = {};
    formData.forEach((value, key) => {
        json[key] = value;
    });

    fetch('https://your-webhook.url/here', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    })
        .then(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide++;
            slides[currentSlide].classList.add('active');
        })
        .catch(err => alert('שגיאה בשליחת הטופס'));
});