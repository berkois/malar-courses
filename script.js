let currentSlide = 0;
const slides = document.querySelectorAll('.form-slide');

function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
}

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

function handlePlaceStep() {
    const placeValue = document.getElementById("placeSelect").value;

    if (placeValue === "אחר") {
        document.getElementById("customLocation").style.display = "block";
        document.getElementById("customAddress").style.display = "block";
        document.getElementById("customMoreInfo").style.display = "block";
        nextSlide(); // עובר לעיר
    } else if (placeValue !== "") {
        document.getElementById("customLocation").style.display = "none";
        document.getElementById("customAddress").style.display = "none";
        document.getElementById("customMoreInfo").style.display = "none";
        currentSlide += 4; // דילוג על עיר, כתובת, פרטים נוספים, והמשך רגיל
        showSlide(currentSlide);
    }
}


function skipCustomLocationSteps() {
    slides[currentSlide].classList.remove('active');
    currentSlide += 3; // מדלג על עיר, כתובת, פרטים נוספים
    slides[currentSlide].classList.add('active');
}

function handleTutorStep() {
    const tutorValue = document.getElementById("tutorSelect").value;

    if (tutorValue === "אחר") {
        document.getElementById("customTutor").style.display = "block";
        nextSlide(); // לשלב טלפון ומייל
    } else if (tutorValue !== "") {
        document.getElementById("customTutor").style.display = "none";
        currentSlide += 2; // מדלג על שלב טלפון ומייל
        showSlide(currentSlide);
    }
}


function skipCustomTutorStep() {
    slides[currentSlide].classList.remove('active');
    currentSlide += 2; // מדלג על טלפון/מייל ועובר ישר ל"שלח טופס"
    slides[currentSlide].classList.add('active');
}

// שליחת הטופס ל-webhook
const form = document.getElementById('eventForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    try {
        await fetch('https://your-webhook.url/here', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        slides[currentSlide].classList.remove('active');
        currentSlide++;
        slides[currentSlide].classList.add('active');
    } catch (err) {
        alert('אירעה שגיאה בשליחה.');
    }
});