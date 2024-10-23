function updateDays() {
    const education = document.getElementById('education').value;
    const month = document.getElementById('month').value;
    const day = document.getElementById('day').value;

    const monthDays = {
        'Yanvar': 31,
        'Aprel': 30,
        'Iyul': 31,
        'Oktyabr': 31
    };

    const yearDays = (education === 'tehsilli') ? 365 : 180;

    const currentDate = new Date();
    const selectedDate = new Date(currentDate.getFullYear(), Object.keys(monthDays).indexOf(month), day);

    if (day > monthDays[month]) {
        document.getElementById('result').innerText = 'Seçilen ay için geçerli bir gün seçin.';
        return;
    }

    // Loading animasyonunu göster
    const loader = document.querySelector('.loader');
    loader.style.display = 'block';
    document.getElementById('result').style.display = 'none';

    setTimeout(() => {
        const timeDiff = selectedDate - currentDate;
        const totalSeconds = Math.ceil(timeDiff / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const result = days > yearDays ? yearDays : days;
        document.getElementById('result').innerText = 
            `Kalan: ${result} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye`;

        // Loading animasyonunu gizle ve sonucu göster
        loader.style.display = 'none';
        document.getElementById('result').style.display = 'block';
    }, 3000); // 3 saniye bekle
}

function updateDaysOptions() {
    const month = document.getElementById('month').value;
    const daySelect = document.getElementById('day');
    const monthDays = {
        'Yanvar': 31,
        'Aprel': 30,
        'Iyul': 31,
        'Oktyabr': 31
    };

    const daysInMonth = monthDays[month];
    daySelect.innerHTML = '';
    for (let i = 1; i <= daysInMonth; i++) {
        daySelect.innerHTML += `<option value="${i}">${i}</option>`;
    }

    updateDays();
}

window.onload = function() {
    updateDaysOptions();
};