document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('logoVideo');
    const fallbackImage = document.getElementById('videoFallback');
    const gifFallback = document.getElementById('gifFallback');
    const playButton = document.getElementById('playButton');

    const playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                fallbackImage.style.display = 'none';
                gifFallback.style.display = 'none';
                playButton.style.display = 'none';
            })
            .catch((error) => {
                video.style.display = 'none';
                gifFallback.style.display = 'block';
                playButton.style.display = 'none';
            });
    }

    video.addEventListener('error', function () {
        console.error('Ошибка загрузки видео, показываем GIF');
        video.style.display = 'none';
        gifFallback.style.display = 'block';
        fallbackImage.style.display = 'none';
        playButton.style.display = 'none';
    });

    playButton.addEventListener('click', function () {
        video
            .play()
            .then(() => {
                fallbackImage.style.display = 'none';
                gifFallback.style.display = 'none';
                playButton.style.display = 'none';
                video.style.display = 'block';
            })
            .catch((e) => {
                console.error('Не удалось воспроизвести видео:', e);
            });
    });
});

async function loadTableData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        const tbody = document.getElementById('table-body');

        const months = [
            'JANUARY',
            'FEBRUARY',
            'MARCH',
            'APRIL',
            'MAY',
            'JUNE',
            'JULY',
            'AUGUST',
            'SEPTEMBER',
            'OCTOBER',
            'NOVEMBER',
            'DECEMBER',
        ];

        data.forEach((item) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.result}</td>
                <td>${item.odds}</td>
                <td>${item.score}</td>
            `;

            const idsUpper = item.id.toUpperCase();
            const hasMonth = months.some((month) => idsUpper.includes(month));

            if (hasMonth) {
                row.classList.add('month');
            }

            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadTableData();
});
