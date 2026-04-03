// wheel.js
const SIZE = 900;
const canvas = document.getElementById('wheel');
canvas.width = SIZE; canvas.height = SIZE;
const ctx = canvas.getContext('2d');
const cx = SIZE/2, cy = SIZE/2;
const R_CENTER = 55, R_COLOR = 150, R_INNER = 320, R_OUTER = 460;
const N = 7, sectionAngle = (2*Math.PI)/N;

let rotationOffset = 0, spinVelocity = 0, animFrame = null, isDragging = false;
let lastAngle = 0, lastTime = 0;

function drawSlice(r1, r2, a1, a2, fill) {
    ctx.beginPath(); ctx.arc(cx, cy, r2, a1, a2); ctx.arc(cx, cy, r1, a2, a1, true); ctx.closePath();
    ctx.fillStyle = fill; ctx.fill();
    ctx.strokeStyle = '#0f0f1a'; ctx.lineWidth = 1.8; ctx.stroke();
}

function drawText(text, r1, r2, midAngle, fontSize) {
    const rMid = (r1 + r2) / 2;
    ctx.save();
    ctx.translate(cx + rMid * Math.cos(midAngle), cy + rMid * Math.sin(midAngle));
    ctx.rotate(((midAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI));
    ctx.font = `700 ${fontSize}px 'Baloo 2',cursive`;
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, 0, 0);
    ctx.restore();
}

function drawWheel() {
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.save();
    ctx.translate(cx, cy); ctx.rotate(rotationOffset); ctx.translate(-cx, -cy);

    GROUPS.forEach((g, gi) => {
        const ss = gi * sectionAngle - Math.PI / 2, se = ss + sectionAngle;
        drawSlice(R_CENTER, R_COLOR, ss, se, g.color);
        
        // 4 İç Bölme
        const subInner = sectionAngle / 4;
        g.inner.forEach((em, si) => {
            const a1 = ss + si * subInner, a2 = a1 + subInner;
            drawSlice(R_COLOR, R_INNER, a1, a2, si % 2 === 0 ? g.dark : g.color);
            drawText(em, R_COLOR + 8, R_INNER - 8, (a1 + a2) / 2, 20);
        });

        // 5 Dış Bölme
        const subOuter = sectionAngle / 5;
        g.outer.forEach((em, si) => {
            const a1 = ss + si * subOuter, a2 = a1 + subOuter;
            drawSlice(R_INNER, R_OUTER, a1, a2, si % 2 === 0 ? g.light : g.color);
            drawText(em, R_INNER + 8, R_OUTER - 8, (a1 + a2) / 2, 18);
        });
    });
    ctx.restore();

    // Merkez
    ctx.beginPath(); ctx.arc(cx, cy, R_CENTER, 0, Math.PI * 2);
    ctx.fillStyle = '#111128'; ctx.fill(); ctx.strokeStyle = 'white'; ctx.lineWidth = 2; ctx.stroke();
}

// Global Init (game.js tarafından çağrılır)
function initWheel() {
    rotationOffset = 0; // Çarkı sıfırla
    drawWheel();
    applyTransform();
}

function angleFrom(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    return Math.atan2(clientY - (rect.top + rect.height / 2), clientX - (rect.left + rect.width / 2));
}

// Dokunma ve Kaydırma (Swipe)
canvas.addEventListener('touchstart', e => {
    isDragging = true;
    lastAngle = angleFrom(e.touches[0].clientX, e.touches[0].clientY);
    lastTime = performance.now();
    spinVelocity = 0;
    if (animFrame) cancelAnimationFrame(animFrame);
}, { passive: true });

canvas.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const a = angleFrom(e.touches[0].clientX, e.touches[0].clientY);
    const d = ((a - lastAngle + Math.PI) % (2 * Math.PI)) - Math.PI;
    const now = performance.now();
    rotationOffset += d;
    spinVelocity = d / ((now - lastTime) || 1) * 16;
    lastAngle = a; lastTime = now;
    drawWheel();
}, { passive: true });

canvas.addEventListener('touchend', () => {
    isDragging = false;
    if (Math.abs(spinVelocity) > 0.05) spin();
});

function spin() {
    if (Math.abs(spinVelocity) < 0.001) {
        cancelAnimationFrame(animFrame);
        autoSelectEmotion(); // Çark durdu!
        return;
    }
    rotationOffset += spinVelocity;
    spinVelocity *= 0.96; // Yavaşlama oranı
    drawWheel();
    animFrame = requestAnimationFrame(spin);
}

// Tepe Noktasını (İbreyi) Hesaplama ve OOP'ye Gönderme
function autoSelectEmotion() {
    // Tepe noktası her zaman -PI/2 (saat 12)
    let normalized = ((rotationOffset % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    let topAngle = (3 * Math.PI / 2 - normalized + 2 * Math.PI) % (2 * Math.PI);
    let groupIndex = Math.floor(topAngle / sectionAngle) % N;
    
    const group = GROUPS[groupIndex];
    const allEmotions = [group.name, ...group.inner, ...group.outer];
    
    // O renk havuzundan rastgele seç
    const randomEmotion = allEmotions[Math.floor(Math.random() * allEmotions.length)];
    
    const finalObj = { name: randomEmotion, color: group.color, group: group.colorName };
    
    // 1. Popup'ı göster
    const popup = document.getElementById('popup');
    document.getElementById('popup-dot').style.background = finalObj.color;
    document.getElementById('popup-name').innerText = finalObj.name;
    document.getElementById('popup-name').style.color = finalObj.color;
    document.getElementById('popup-color-name').innerText = finalObj.group;
    popup.style.borderColor = finalObj.color;
    
    document.getElementById('popup-overlay').classList.add('show');
    popup.classList.add('show');

    // 2. OOP Oyun Yöneticisine (game.js) haber ver
    game.setDrawnEmotion(finalObj);
}

// Ekrana Sığdırma
function applyTransform() {
    const vw = window.innerWidth, vh = window.innerHeight;
    const fit = Math.min(vw / SIZE, (vh - 100) / SIZE);
    canvas.style.transform = `scale(${fit})`;
    canvas.style.transformOrigin = '50% 0';
    canvas.style.left = `calc(50% - ${SIZE / 2}px)`;
    canvas.style.top = '100px';
}
window.addEventListener('resize', applyTransform);