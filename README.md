# 🌈 Duygu Avcıları (Emotion Hunters)

**Duygu Avcıları**, arkadaş grupları için tasarlanmış, doğaçlama tiyatro, sosyal çıkarım ve stratejiyi bir araya getiren interaktif bir mobil web parti oyunudur. 

Oyuncular belirli bir sahnede, çarktan çektikleri gizli duyguları kelimelere dökmeden yansıtmaya çalışırken; diğer oyuncular (jüri) bu duyguları tahmin ederek kendi "Gökkuşağı" koleksiyonlarını tamamlamak için yarışırlar.

---

## 👥 Oyun Özeti
- **Oyuncu Sayısı:** 4 - 8 Kişi
- **Oyun Süresi:** 20 - 40 Dakika
- **Tür:** Parti Oyunu, Sosyal Çıkarım, Roleplay
- **Platform:** Mobil Web Tarayıcı (Tek cihazdan Elden Ele - Pass & Play)

---

## 📜 Nasıl Oynanır?

### 1. Hazırlık (Setup)
Oyun tek bir akıllı telefon üzerinden oynanır. Oyuncular isimlerini sisteme girer. Minimum 4 kişi eklendiğinde oyun başlatılır.

### 2. Tur Akışı
Her tur şu adımlardan oluşur:
1. **Rol Dağılımı:** Sistem rastgele iki oyuncu seçer: **Anlatan** ve **Partner**. Geri kalan oyuncular **Jüri** olur.
2. **Sahne Çekimi:** Ortak bir "Sahne Kartı" (Örn: *Bozuk asansörde mahsur kalmak*) ekranda belirir.
3. **Duygu Çekimi:** Anlatan ve Partner sırayla telefonu alır, **Duygu Çarkı**'nı çevirir ve o tur oynayacakları gizli duyguyu (Örn: *Kırmızı - Nefret* veya *Sarı - Umut*) sadece kendileri görür.
4. **Canlandırma (90 Saniye):** Anlatan ve partner, 90 saniye boyunca verilen sahnede doğaçlama yaparlar. 
   - *Kural:* Konuşmak serbesttir ancak çekilen **duygunun adını veya rengini söylemek yasaktır.**
5. **Tahmin ve Oylama:** Süre bitince Jüri üyeleri, sahnede oynayan kişilerin duygularını tahmin eder. 
   - Doğru bilenler, bildikleri duygunun renginde bir **"Duygu Pulu"** kazanır.

---

## 🎯 Kazanma Şartı ve Strateji

Oyunun temel amacı **Gökkuşağını (7 farklı rengi) tamamlayan ilk kişi olmaktır.**

### 💎 Özel Güç: "Matruşka / Çalma Sistemi"
Aynı renkten duygu pulları biriktirmek (Örn: 3 adet Mavi pul) tek başına oyunu kazandırmaz. Ancak bu pullar stratejik bir silaha dönüşebilir:
- Bir oyuncu aynı renkten **3 adet pul** biriktirirse, bunları "Bankaya" iade ederek **Hırsızlık Gücü** kazanır.
- Bu güçle, başka bir oyuncunun elindeki **"Fazlalık"** olan (1'den fazla sahip olduğu) herhangi bir rengi çalabilir.
- *Not:* Bir oyuncunun elinde bir renkten sadece 1 tane varsa o renk çalınamaz; böylece gökkuşağını tamamlamaya çalışan oyuncuların emekleri tamamen yok edilmez.

---

## 🎡 Duygu Çarkı Mimarisi
Oyunda toplam 7 ana renk ve her rengin altında 10 farklı duygu (Toplam 70 Duygu) bulunur. Çark `1-4-5` mantığıyla tasarlanmıştır:
- **1 Merkez Duygu** (Örn: Öfke)
- **4 İç Çember Duygusu** (Örn: Nefret, Tutku, Aşk, Hiddet)
- **5 Dış Çember Duygusu** (Örn: Kızgınlık, Arzu, İsyan, Hırs, Huzursuzluk)

---

## 💻 Teknik Altyapı (Proje Yapısı)

Oyun, dışarıdan hiçbir kütüphane (framework) kullanılmadan, saf (Vanilla) JavaScript, HTML5 Canvas ve CSS3 ile Nesne Yönelimli Programlama (OOP) prensiplerine uygun olarak kodlanmıştır.

### Dosya Ağacı
```text
/duygu-avcilari
│
├── index.html     # Oyunun ana iskeleti ve ekran yönetim (div) yapısı
├── style.css      # UI tasarımı, degrade başlıklar ve popup animasyonları
├── data.js        # Sabit veriler (70 Duygu listesi ve Sahne kartları)
├── wheel.js       # HTML5 Canvas çark çizimi, fizik (swipe) ve oto-seçim mantığı
└── game.js        # OOP Mimari (Player, GameManager, UIController sınıfları)