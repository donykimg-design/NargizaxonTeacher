// Silliq skrolling (Smooth scroll) - linklarga bosilganda chiroyli pastga tushish
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Telegram bot orqali guruhga ma'lumot yuborish
const form = document.querySelector('.contact-form');

// BU YERGA BOT TOKEN VA CHAT ID KIRITILADI
const BOT_TOKEN = '8619123581:AAENtWsYOIRDkxLskC2Zmsl5HunSrGwHpT4'; 
const CHAT_ID = '-1003707636347'; // Guruh ID si odatda - bilan boshlanadi

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Saytni yangilanib ketishidan saqlaydi

        const btn = form.querySelector('.btn-submit');
        btn.textContent = 'Yuborilmoqda...';
        btn.style.opacity = '0.7';
        btn.style.cursor = 'wait';
        
        // Formadagi ma'lumotlarni yig'ib olish
        const formData = new FormData(form);
        const name = formData.get('name');
        const surname = formData.get('surname');
        const phone = formData.get('phone');
        const question = formData.get('question');
        
        // Telegramga yuboriladigan xabar matni
        const message = `Yangi o'quvchi ro'yxatdan o'tdi!\n\n` +
                        `Ism: ${name}\n` +
                        `Familiya: ${surname}\n` +
                        `Telefon: ${phone}\n` +
                        `Savol: ${question ? question : 'Savol yozilmadi'}`;
        
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=html`;
        
        fetch(url)
            .then(response => {
                if(response.ok) {
                    // Muvaffaqiyatli yuborilsa, success sahifasiga o'tkazish
                    window.location.href = 'success.html';
                } else {
                    alert("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
                    btn.textContent = 'Yuborish';
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                }
            })
            .catch(error => {
                alert("Internetda xatolik yuz berdi.");
                btn.textContent = 'Yuborish';
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            });
    });
}
