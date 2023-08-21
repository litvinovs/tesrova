import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:3000/'
});

api.interceptors.response.use(
    response => response,

    error => {
        if (error.response && error.response.status === 429) {
            alert('Слишком много запросов с вашего IP, повторите попытку позже.');
        }
    }
);

const MAX_REQUESTS_COUNT = 10;  // Maximum number of requests in a 24-hour period
const TIME_PERIOD = 15 * 60 * 1000;  // 15 minutes

function msToTime(ms: number) {
    // Получить часы из миллисекунд
    let hours: number = Math.floor(ms / (1000 * 60 * 60));

    // Получить оставшиеся минуты
    let minutes: number = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

    // Получить оставшиеся секунды
    let seconds: number = Math.floor((ms % (1000 * 60)) / 1000);

    // Добавить нули перед однозначными числами
    hours = hours < 10 ? Number("0" + hours) : hours;
    minutes = minutes < 10 ? Number("0" + minutes) : minutes;
    seconds = seconds < 10 ? Number("0" + seconds) : seconds;

    // Вернуть строку в формате HH:MM:SS
    return hours + ":" + minutes + ":" + seconds;
}

api.interceptors.request.use(async config => {
    const now = Date.now();

    // Проверьте, есть ли что-то в localStorage
    let request = JSON.parse(localStorage.getItem('apiRequest') ?? '[]');
    // Отфильтруйте элементы, которые старше временного периода
    request = request.filter((timestamp: any) => now - timestamp < TIME_PERIOD);

    if (request.length >= MAX_REQUESTS_COUNT) {
        // Не добавляйте новый элемент, если достигнут лимит

        let timeLeft = msToTime(request[0] + TIME_PERIOD - now);

        alert(`Слишком много запросов с вашего IP, повторите попытку через ${timeLeft} мс.`);
        return Promise.reject('Слишком много запросов с вашего IP, повторите попытку позже.');
    } else {
        request.push(now);
        localStorage.setItem('apiRequest', JSON.stringify(request));
        return config;
    }

}, error => {
    return Promise.reject(error);
});
export default api;