// ==========================================
// 1. PLAYER (OYUNCU) SINIFI
// ==========================================
class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.tokens = {}; // Sahip olunan pullar. Örn: { 'Kırmızı': 2, 'Mavi': 1 }
        this.currentEmotion = null; // O tur çektiği gizli duygu
        this.resetGuessRights();
    }

    // Her tur başında tahmin hakları sıfırlanır
    resetGuessRights() {
        this.hasGuessedActive = false;
        this.hasGuessedPartner = false;
    }

    // Doğru tahmin yapıldığında pul ekler
    addToken(colorName) {
        if (!this.tokens[colorName]) this.tokens[colorName] = 0;
        this.tokens[colorName]++;
    }

    // Çalma işlemi yapıldığında pulu eksiltir
    removeToken(colorName, amount = 1) {
        if (this.tokens[colorName] >= amount) {
            this.tokens[colorName] -= amount;
            if (this.tokens[colorName] === 0) delete this.tokens[colorName];
            return true;
        }
        return false;
    }
}

// ==========================================
// 2. UI KONTROLCÜSÜ (Arayüz Yöneticisi)
// ==========================================
class UIController {
    constructor() {
        this.screens = ['screen-setup', 'screen-scene-select', 'screen-wheel', 'screen-gameplay', 'screen-guess'];
    }

    // İstenen ekranı açar, diğerlerini gizler (SPA Mantığı)
    showScreen(screenId) {
        this.screens.forEach(id => {
            const el = document.getElementById(id);
            if(el) {
                el.classList.remove('active');
                el.style.display = 'none';
            }
        });
        const activeScreen = document.getElementById(screenId);
        if(activeScreen) {
            activeScreen.classList.add('active');
            activeScreen.style.display = 'flex';
            activeScreen.style.flexDirection = 'column';
            activeScreen.style.alignItems = 'center';
        }
    }

    // Listeye oyuncu ekler ve 4 kişide butonu açar
    addPlayerToList(name, playerCount) {
        const div = document.createElement('div');
        div.innerText = `${playerCount}. ${name}`;
        div.style.padding = "10px";
        div.style.borderBottom = "1px solid gray";
        document.getElementById('player-list').appendChild(div);
        
        if (playerCount >= 4) {
            document.getElementById('start-btn').disabled = false;
        }
    }

    // Sahne ekranındaki isimleri ve metni günceller
    updateGameplayScreen(scene, activeName, partnerName) {
        // Sahne objesi veya string olabilir
        if (typeof scene === 'object' && scene !== null) {
            document.getElementById('scene-title-display').innerText = scene.title;
            document.getElementById('scene-text').innerText = scene.description;
            document.getElementById('scene-context-display').innerText = scene.context;
        } else {
            document.getElementById('scene-title-display').innerText = "Ortak Sahne";
            document.getElementById('scene-text').innerText = scene;
            document.getElementById('scene-context-display').innerText = "";
        }
        document.getElementById('actor-1').innerText = activeName;
        document.getElementById('actor-2').innerText = partnerName;
    }

    // Sahne seçim ekranında kartı günceller
    updateSceneSelectCard(scene) {
        document.getElementById('scene-title').innerText = scene.title;
        document.getElementById('scene-description').innerText = scene.description;
        document.getElementById('scene-context').innerText = scene.context;
    }

    // Oyuncunun duygusunu ekranda gösterir
    showEmotion(actorId, emotionObj) {
        const container = document.getElementById(`${actorId}-emotion`);
        const dot = container.querySelector('.emotion-dot');
        const name = container.querySelector('.emotion-name');
        
        dot.style.backgroundColor = emotionObj.color;
        dot.style.color = emotionObj.color; // box-shadow için
        name.innerText = emotionObj.name;
        name.style.color = emotionObj.color;
        
        container.classList.remove('hidden');
    }

    // Oyuncunun duygusunu gizler
    hideEmotion(actorId) {
        const container = document.getElementById(`${actorId}-emotion`);
        container.classList.add('hidden');
    }

    updateTimer(text) {
        document.getElementById('timer').innerText = text;
    }
}

// ==========================================
// 3. GAME MANAGER (Oyun Yöneticisi Sınıfı)
// ==========================================
class GameManager {
    constructor() {
        this.players = [];
        this.activePlayer = null;
        this.partnerPlayer = null;
        this.currentScene = null; // Artık obje olarak tutuluyor
        this.tempScene = null; // Sahne seçiminde geçici sahne
        this.timerInterval = null;
        this.drawPhase = 0; // 1: Anlatan Çekiyor, 2: Partner Çekiyor
        this.emotionVisibility = { 'actor-1': false, 'actor-2': false }; // Duygu görünürlük durumu
        this.ui = new UIController();
    }

    // HTML'deki inputtan oyuncuyu alır
    addPlayer() {
        const input = document.getElementById('player-input');
        const name = input.value.trim();
        
        if (name && this.players.length < 8) {
            const newPlayer = new Player(this.players.length + 1, name);
            this.players.push(newPlayer);
            this.ui.addPlayerToList(name, this.players.length);
            input.value = ""; // İnputu temizle
        } else if (this.players.length >= 8) {
            alert("Maksimum 8 oyuncuya ulaşıldı!");
        }
    }

    // Oyunu başlatır - önce sahne seçim ekranına yönlendirir
    start() {
        if (this.players.length < 4) return;
        this.ui.showScreen('screen-scene-select');
        // Sahne seçim ekranını sıfırla
        document.getElementById('scene-card-display').classList.add('hidden');
        document.getElementById('confirm-scene-btn').disabled = true;
    }

    // Rastgele bir sahne seçer ve ekranda gösterir
    pickRandomScene() {
        if (typeof SCENES === 'undefined' || SCENES.length === 0) return;
        
        // Rastgele sahne seç
        const randomIndex = Math.floor(Math.random() * SCENES.length);
        this.tempScene = SCENES[randomIndex];
        
        // Sahne kartını göster
        this.ui.updateSceneSelectCard(this.tempScene);
        document.getElementById('scene-card-display').classList.remove('hidden');
        
        // "Bu Sahneyi Kullan" butonunu aktif et
        document.getElementById('confirm-scene-btn').disabled = false;
    }

    // Seçilen sahneyi onaylar ve oyuna geçer
    confirmScene() {
        if (!this.tempScene) return;
        this.currentScene = this.tempScene;
        this.startTurn();
    }

    // Yeni turu başlatır (Rolleri dağıtır)
    startTurn() {
        this.players.forEach(p => p.resetGuessRights());

        // Rastgele 2 farklı oyuncu seçimi
        let p1Index = Math.floor(Math.random() * this.players.length);
        let p2Index = Math.floor(Math.random() * this.players.length);
        while (p1Index === p2Index) {
            p2Index = Math.floor(Math.random() * this.players.length);
        }
        
        this.activePlayer = this.players[p1Index];
        this.partnerPlayer = this.players[p2Index];
        
        // Rastgele sahne (eğer zaten seçilmişse onu kullan)
        if (!this.currentScene && typeof SCENES !== 'undefined') {
            this.currentScene = SCENES[Math.floor(Math.random() * SCENES.length)];
        }

        // Çark çekilişini başlat
        this.drawPhase = 1;
        this.startDrawPhase();
    }

    // Çark ekranını açar ve kimin çevireceğini belirtir
    startDrawPhase() {
        const currentPlayer = this.drawPhase === 1 ? this.activePlayer : this.partnerPlayer;
        document.getElementById('wheel-player-name').innerText = `${currentPlayer.name}, telefonu al ve çarkı çevir!`;
        this.ui.showScreen('screen-wheel');
        
        // Çarkı çiz (wheel.js içindeki fonksiyon)
        if(typeof initWheel === 'function') initWheel();
    }

    // wheel.js çark durduğunda bu fonksiyonu çağırıp duyguyu teslim edecek
    setDrawnEmotion(emotionObj) {
        if (this.drawPhase === 1) {
            this.activePlayer.currentEmotion = emotionObj;
        } else if (this.drawPhase === 2) {
            this.partnerPlayer.currentEmotion = emotionObj;
        }
    }

    // Çark ekranındaki popup'ta "Devam Et" butonuna basılınca
    continueAfterDraw() {
        // Geçici olarak popup'ı kapat (style.css gelince class ile yapılacak)
        document.getElementById('popup').classList.remove('show');
        document.getElementById('popup-overlay').classList.remove('show');

        if (this.drawPhase === 1) {
            this.drawPhase = 2; // Sıra partnere geçti
            alert(`Sıra eşin ${this.partnerPlayer.name}'da. Telefonu ona ver!`);
            this.startDrawPhase();
        } else {
            // İkisi de çekti, sahne başlıyor!
            this.startGameplay();
        }
    }

    // 90 Saniyelik Sahne Modu
    startGameplay() {
        // Duygu görünürlüğünü sıfırla
        this.emotionVisibility = { 'actor-1': false, 'actor-2': false };
        this.ui.hideEmotion('actor-1');
        this.ui.hideEmotion('actor-2');
        
        this.ui.updateGameplayScreen(this.currentScene, this.activePlayer.name, this.partnerPlayer.name);
        this.ui.showScreen('screen-gameplay');
        this.startTimer(90);
    }

    // Oyuncunun duygusunu gösterir veya gizler
    toggleEmotion(actorId) {
        const player = actorId === 'actor-1' ? this.activePlayer : this.partnerPlayer;
        
        if (this.emotionVisibility[actorId]) {
            // Gizle
            this.ui.hideEmotion(actorId);
            this.emotionVisibility[actorId] = false;
        } else {
            // Göster
            if (player && player.currentEmotion) {
                this.ui.showEmotion(actorId, player.currentEmotion);
                this.emotionVisibility[actorId] = true;
            }
        }
    }

    startTimer(seconds) {
        let timeLeft = seconds;
        this.ui.updateTimer(`01:30`);
        clearInterval(this.timerInterval);
        
        this.timerInterval = setInterval(() => {
            timeLeft--;
            let m = Math.floor(timeLeft / 60);
            let s = timeLeft % 60;
            this.ui.updateTimer(`0${m}:${s < 10 ? '0'+s : s}`);
            
            if (timeLeft <= 0) {
                this.endScene();
            }
        }, 1000);
    }

    // Süre bitince tahmin (Jüri) ekranına geçiş
    endScene() {
        clearInterval(this.timerInterval);
        this.ui.showScreen('screen-guess');
    }
}

// Global olarak oyun yöneticisini başlatıyoruz
const game = new GameManager();