// data.js

// 1 Merkez, 4 İç, 5 Dış (Toplam 10 Duygu) Kurgusu
const GROUPS = [
  { name:'Öfke', colorName:'Kırmızı', color:'#FF4757', dark:'#cc2233', light:'#ff7a88',
    inner:['Nefret','Tutku','Aşk','Hiddet'],
    outer:['Kızgınlık','Arzu','İsyan','Hırs','Huzursuzluk'] },
  { name:'Heyecan', colorName:'Turuncu', color:'#FF8C00', dark:'#cc6e00', light:'#ffaa44',
    inner:['Coşku','Yaratıcılık','Merak','Heves'],
    outer:['İlham','Şevk','Cesaret','Şaşkınlık','Enerji'] },
  { name:'Umut', colorName:'Sarı', color:'#FFD700', dark:'#d4aa00', light:'#ffe766',
    inner:['Mutluluk','Neşe','Tatmin','Memnuniyet'],
    outer:['Özgüven','Gurur','Takdir','Özgürlük','Ferahlık'] },
  { name:'Şefkat', colorName:'Yeşil', color:'#2ED573', dark:'#1aaa55', light:'#66e8a0',
    inner:['Minnettarlık','Sevgi','Güven','Aidiyet'],
    outer:['Merhamet','Şükran','Huzur','Anlayış','Teslimiyet'] },
  { name:'Üzüntü', colorName:'Mavi', color:'#1E90FF', dark:'#0066cc', light:'#66b8ff',
    inner:['Özlem','Yalnızlık','Hüzün','Pişmanlık'],
    outer:['Hayal Kırıklığı','Umutsuzluk','Dışlanmışlık','Çaresizlik','Melankoli'] },
  { name:'Kararlılık', colorName:'Lacivert', color:'#3A4FCF', dark:'#2233aa', light:'#6677ee',
    inner:['Hayranlık','Sadakat','Sorumluluk','Adalet'],
    outer:['Üstünlük','Kibir','Tahammül','Sıkışmışlık','Kıskançlık'] },
  { name:'Utanç', colorName:'Mor', color:'#A55EEA', dark:'#7d3bbf', light:'#c48af0',
    inner:['Şüphe','Yetersizlik','Kararsızlık','Panik'],
    outer:['Korku','Kaygı','Güvensizlik','Mahcubiyet','Haset'] }
];

// Sahne Kartları - Her sahne: başlık, açıklama ve ek bağlam içerir
const SCENES = [
  {
    title: "Asansördeki Ayna",
    description: "Asansörde ayna karşısında duruyorsun. Yüzündeki ifade duygunu yansıtıyor.",
    context: "Işıklar yanıp sönüyor ve kimse seni duymuyor."
  },
  {
    title: "Kasadaki Bant",
    description: "Süpermarket kasasında bant hareket etmiyor. Sabırsızlığın artıyor.",
    context: "Arkanda uzun bir kuyruk var ve herkes sabırsız."
  },
  {
    title: "Bekleme Salonu Koltuğu",
    description: "Hastane bekleme salonunda koltukta oturuyorsun. Gerginliğin bedenine yayılıyor.",
    context: "Yanındaki kişi sürekli soru soruyor."
  },
  {
    title: "Eski Fotoğraf",
    description: "Eski bir fotoğrafı elinde tutuyorsun. Geçmiş anılar duygunu tetikliyor.",
    context: "Aranda açıklanmamış bir mesele kalmıştı."
  },
  {
    title: "Boş Cüzdan",
    description: "Cüzdanın boş, hesap geldi. Çaresizliğin içini dolduruyor.",
    context: "Garson bekliyor, masada diğer müşteriler var."
  },
  {
    title: "Sessiz Kitap",
    description: "Kütüphanede sessiz bir kitap okuyorsun. İçindeki sırlar duygunu uyandırıyor.",
    context: "Yan yana oturuyorsun ve önemli bir şey fısıldamak istiyorsun."
  },
  {
    title: "Kaçan Bilet",
    description: "Piyango biletine bakıyorsun, ikramiye kaçtı. Hayal kırıklığın büyüyor.",
    context: "Yanındaki kişi kazanacağını biliyordu."
  },
  {
    title: "Boş Bagaj",
    description: "Havalimanında bagajın kayboldu. Görevli yardımcı olamıyor.",
    context: "İçinde çok değerli bir eşya vardı."
  },
  {
    title: "Yanlış Mesaj",
    description: "Telefonunda yanlış mesaj gönderdin. Utanç verici bir durum.",
    context: "Mesajı alan kişi karşında oturuyor."
  },
  {
    title: "Kapı Zili",
    description: "Kapı zilini duyuyorsun, komşu şikayetçi. Gerginliğin artıyor.",
    context: "Aslında gürültü yapan sen değilsin."
  },
  {
    title: "Restoran Masası",
    description: "Restoranda masada oturuyorsun, ilk buluşma. Gerginliğin yüzüne vuruyor.",
    context: "Çok gerginsin ama belli etmemeye çalışıyorsun."
  },
  {
    title: "Otobüs Durağı",
    description: "Otobüs durağında bekliyorsun, son otobüs kaçtı. Soğuk hava duygunu donduruyor.",
    context: "Yağmur başlamak üzere."
  },
  {
    title: "Sürpriz Parti Dekorasyonu",
    description: "Sürpriz parti hazırlıyorsun ama erken geldi. Panik içindesin.",
    context: "Her şeyi toplamak için sadece birkaç dakikan var."
  },
  {
    title: "Kayıp Anahtar",
    description: "Anahtarını kaybettin, eve giremiyorsun. Yorgunluk ve öfke karışıyor.",
    context: "Kapıyı kilitleyen kişi yanındaydı."
  },
  {
    title: "Yanlış Tren Bileti",
    description: "Trende yanlış yöne gidiyorsun. Fark ettiğinde çaresizlik başlıyor.",
    context: "Bir sonraki tren için 2 saat beklemeniz gerekecek."
  },
  {
    title: "Restoran Masası",
    description: "Yemek yerken önemli bir itirafta bulunacaksın. İçindeki heyecan artıyor.",
    context: "Masada başka bir çift var ve seni dinliyor gibi."
  },
  {
    title: "Fırtınalı Kulübe",
    description: "Fırtına nedeniyle kulübede mahsur kaldın. Korkun artıyor.",
    context: "Sığınacak tek yer eski bir kulübe."
  },
  {
    title: "Mülakat Masası",
    description: "İş mülakatındasın, sonuçlar açıklanacak. Gerginliğin zirvesi.",
    context: "İkiniz de aynı pozisyon için girdiniz."
  },
  {
    title: "Düğün Hazırlıkları",
    description: "Düğün hazırlıkları yapıyorsun, her şey ters gidiyor. Stres dolu.",
    context: "Gelinlik gelmedi ve müzik çalar bozuldu."
  },
  {
    title: "Trafik Sıkışması",
    description: "Trafikte mahsur kaldın, saatlerce. Sabırsızlığın dorukta.",
    context: "Çok önemli bir toplantıya yetişmen gerekiyor."
  },
  {
    title: "Kamp Ateşi",
    description: "Ormanda ateşin etrafında oturuyorsun. Garip sesler korkunu artırıyor.",
    context: "Uzaktan garip sesler geliyor."
  },
  {
    title: "Sınav Sonucu Ekranı",
    description: "Sınav sonuçlarını bekliyorsun. Gerilim içindesin.",
    context: "Çok çalıştın ama kazanma ihtimalin düşük."
  },
  {
    title: "İptal Edilen Uçuş",
    description: "Havaalanındasın, uçuş iptal edildi. Umutsuzluk yayılıyor.",
    context: "Alternatif yok."
  },
  {
    title: "Komşu Yemeği",
    description: "Komşunun yemeğinde oturuyorsun, yemek kötü. Nezaketini korumaya çalışıyorsun.",
    context: "Yemek pek iyi değil."
  },
  {
    title: "Kayıp Köpek İlani",
    description: "Kayıp köpek arıyorsun, ilanlara bakıyorsun. Üzüntün artıyor.",
    context: "Köpeğini son kez parkta gördün."
  },
  {
    title: "Doğum Günü Sürprizi",
    description: "Sürpriz hazırlıyorsun ama erken geldi. Panik halindesin.",
    context: "Misafirler geldi ama doğum günü çocuğu yolda."
  },
  {
    title: "İndirimli Ürün",
    description: "Market raflarında indirimli ürünü almaya çalışıyorsun. Rekabet içindesin.",
    context: "Etraftaki insanlar sana bakıyor."
  },
  {
    title: "Cam Asansör",
    description: "40 katlı binanın asansöründe mahsur kaldın. Korkun yükseliyor.",
    context: "Aşağıda yüzlerce insan var."
  },
  {
    title: "Eski Fotoğraflar",
    description: "Tavan arasında eski fotoğraflar buldun. Geçmiş sırlar duygunu uyandırıyor.",
    context: "Fotoğraflardan biri aile sırrını ortaya çıkarabilir."
  },
  {
    title: "Karantina Balkonu",
    description: "Balkonda oturuyorsun, karantina nedeniyle. Yalnızlık hissediyorsun.",
    context: "Komşularla sesleniyorsunuz."
  },
  {
    title: "Park Yeri",
    description: "Otoparkta park yeri arıyorsun. Öfken artıyor.",
    context: "Arkanızda kornalar çalıyor."
  },
  {
    title: "Yarışma Finali",
    description: "Bilgi yarışması finalindesin. Son soru zor. Gerilim zirvede.",
    context: "Süre azalıyor."
  },
  {
    title: "Havalimanı Veda",
    description: "Havaalanında vedalaşıyorsun. Üzüntün içini dolduruyor.",
    context: "Uçuş anonsu yapıldı."
  },
  {
    title: "Restoran Yemeği",
    description: "Restoranda yemek kötü çıktı. Eleştiri yapman gerekiyor.",
    context: "Garsonla konuşmak sana düştü."
  },
  {
    title: "Gizli Hediye",
    description: "Hediye almaya çalışıyorsun, gizlice. Heyecan verici.",
    context: "Hediyeler aynı anda verilecek."
  },
  {
    title: "Spor Salonu Aleti",
    description: "Spor salonunda alet kullanıyorsun, ilk kez. Şaşkınlığın artıyor.",
    context: "Nasıl kullanılacağını bilmiyorsun."
  },
  {
    title: "Deniz Kenarı",
    description: "Sahilde oturuyorsun, gün batımı izliyorsun. Sakinlik içindesin.",
    context: "Ama ayağına denizanası soktu."
  },
  {
    title: "Kitap Kulübü Kitabı",
    description: "Kitap kulübünde kitabı okuyorsun. Farklı yorumların var.",
    context: "Diğer üyeler tartışmanızı bekliyor."
  },
  {
    title: "Kaçan Otobüs",
    description: "Otobüs kapıları kapandı, kaçırdın. Hayal kırıklığı.",
    context: "Bir sonraki 45 dakika sonra."
  },
  {
    title: "Doktor Bekleme",
    description: "Muayenehanede bekliyorsun, kötü haber için. Korkun artıyor.",
    context: "Sıran geldi."
  },
  {
    title: "Yeni Ev Kutuları",
    description: "Yeni evinde kutular açılmamış. Yorgunluk ve heyecan karışıyor.",
    context: "Yatak yok."
  },
  {
    title: "Tiyatro Sahnesi",
    description: "Sahnedesin, partnerin repliklerini unuttu. Panik içindesin.",
    context: "Amatör oyun."
  },
  {
    title: "Kapı Zili",
    description: "Kapı çaldı, beklenmedik misafir. Hazırlıksızsın.",
    context: "Ev dağınık."
  },
  {
    title: "Son Bilet",
    description: "Konser bileti elinde, son kalan. Gurur verici.",
    context: "Arkadaşın da gelmek istiyor."
  },
  {
    title: "Çatı Yıldızları",
    description: "Çatıda yıldızları izliyorsun. Dilek tutmak istiyorsun.",
    context: "Kayan yıldız görüyorsun."
  },
  {
    title: "Cafe Masası",
    description: "Cafede oturuyorsun, uzun zamandır görüşmediğin biriyle. Konuşma hassaslaştı.",
    context: "Beklenmedik konu."
  },
  {
    title: "Buz Pisti",
    description: "Buz pateni yapıyorsun, ilk kez. Düşüyorsun.",
    context: "Kalkamıyorsun."
  },
  {
    title: "Asansör Müzik",
    description: "Asansörde müzik çalıyor, yüksek sesle. Şarkıyı biliyorsun.",
    context: "AVM asansörü."
  },
  {
    title: "Yanlış Oda Kapısı",
    description: "Otelde yanlış odaya girdin. Oda sahibi gelecek.",
    context: "Kapıdan girecek."
  },
  {
    title: "Ağaçtaki Kedi",
    description: "Ağaçtaki kediyi kurtarmaya çalışıyorsun. Korku ve cesaret.",
    context: "Kedi tıslıyor."
  },
  {
    title: "İş Teklifi",
    description: "Beklenmedik iş teklifi alacaksın. Şaşkınlık.",
    context: "Reddedilirse arkadaşlık bitebilir."
  },
  {
    title: "Kayıp Telefon",
    description: "Telefon kayboldu, restoranda. Garsonu suçluyorsun.",
    context: "Aslında çantanda."
  },
  {
    title: "Sahil Fırtınası",
    description: "Sahilde fırtına başladı, herkes kaçıyor. Şemsiyen uçtu.",
    context: "Peşinden koşuyorsun."
  },
  {
    title: "Yanlış Hediye",
    description: "Hediyeler değişti, yanlışlıkla. Açmak zorundasın.",
    context: "Her ikiniz de açmak zorunda."
  },
  {
    title: "Düğün Masası",
    description: "Düğün masasında oturuyorsun. Gelin damat kavga ediyor.",
    context: "En ön masa."
  },
  {
    title: "Otobüs İçinde",
    description: "Otobüste ayakta duruyorsun, tıklım tıklım. Çarpışmalar.",
    context: "Her fren yaptığında çarpışıyorsun."
  },
  {
    title: "Kaçan Balon",
    description: "Balonu uçurdun, değerli anı. Üzüntü.",
    context: "Çocukluk arkadaşı."
  },
  {
    title: "Yanlış Selfie",
    description: "Selfie çektin, arka plan rezil. Fotoğraf düştü.",
    context: "Sosyal medya."
  },
  {
    title: "Sinema Koltuğu",
    description: "Sinemada sessiz sahne, gülüyorsun. Herkes bakıyor.",
    context: "Sessiz olman gerekiyordu."
  },
  {
    title: "Kayıp Cüzdan",
    description: "Cüzdan takside kaldı. Paran yok.",
    context: "Şoför aramıyor."
  },
  {
    title: "Sürpriz Bebek",
    description: "Eski sevgili bebekle geldi. Şok içindesin.",
    context: "Bebek sana benziyor."
  },
  {
    title: "Yanlış Toplantı",
    description: "Toplantıya girdin, yanlış. Sunum yapman isteniyor.",
    context: "Çıkamıyorsun."
  },
  {
    title: "Cam Asansör",
    description: "AVM asansöründe mahsur. Korku.",
    context: "Yüzlerce insan bakıyor."
  },
  {
    title: "Piknik Yeri",
    description: "Piknikte her şey ters gitti. Yağmur, karıncalar.",
    context: "Yiyecek unutuldu."
  },
  {
    title: "Yanlış Mesaj",
    description: "Mesaj yanlış gruba gitti. Patron hakkında.",
    context: "Arkadaş grubuna."
  },
  {
    title: "Korku Evi",
    description: "Lunapark korku evinde. Korkun artıyor.",
    context: "Ürkütücü."
  },
  {
    title: "Yanlış Arama",
    description: "Telefon çaldı, yanlış kişi. Duygusal konuşuyor.",
    context: "Seni tanıdığını sanıyor."
  },
  {
    title: "Son Pizza Dilimi",
    description: "Son dilim pizza kaldı. İstiyorsun.",
    context: "Sessiz rekabet."
  },
  {
    title: "Yanlış Araba",
    description: "Yanlış arabaya bindin. Sahibi gelecek.",
    context: "Otoparkta."
  },
  {
    title: "Ödül Sahnesi",
    description: "Çekiliş kazandın, konuşma yapacaksın. Heyecan.",
    context: "Mikrofon verildi."
  },
  {
    title: "Yanmış Yemek",
    description: "Yemek yaptın, yandı. Açsın.",
    context: "Restoranlar kapalı."
  },
  {
    title: "Kayıp Bilet",
    description: "Konser bileti kayboldu. Görevli diyor biletsiz giremezsin.",
    context: "Kapıda bekliyorsun."
  },
  {
    title: "Yanlış Fotoğraf",
    description: "Aile yemeği fotoğrafı, gözlerin kapalı. Paylaşıldı.",
    context: "Aile grubu."
  },
  {
    title: "Asansör Müzik",
    description: "Asansörde şarkı mırıldanıyorsun. Durdu, patron girdi.",
    context: "Ofis asansörü."
  },
  {
    title: "Canlı Yayın",
    description: "Canlı yayında kişisel soru. Cevap vermelisin.",
    context: "Kamera döndü."
  },
  {
    title: "Yanlış Kargo",
    description: "Komşu kargosu sana geldi, tuhaf şey. Komşu istiyor.",
    context: "Kapıyı çalıyor."
  },
  {
    title: "Sahilde Sis",
    description: "Sahilde sis, yolu kaybettin. Telefon şarjı bitiyor.",
    context: "Sisli hava."
  },
  {
    title: "Yanlış İsim",
    description: "Seni yanlış isimle çağırıyor. Düzeltmek istiyorsun.",
    context: "Kaba olmak istemiyorsun."
  },
  {
    title: "Eski Öğretmen",
    description: "Kapı çaldı, eski öğretmenin. Hatırlıyor.",
    context: "Notlarını soruyor."
  },
  {
    title: "Kamp Çadırı",
    description: "Kamp çadırı kurulurken rüzgâr dağıttı. Gece oluyor.",
    context: "Hava soğuyor."
  },
  {
    title: "Yanlış Rezervasyon",
    description: "Restoran rezervasyonu yok. Dolu.",
    context: "Tek boş masa balayı çifti."
  },
  {
    title: "Kayıp Anahtarlık",
    description: "Anahtarlık kaybettin, hediye ettiğin. Diğer kişi soruyor.",
    context: "Sürekli soruyor."
  },
  {
    title: "Ters Sürpriz",
    description: "Sürpriz yaptın, yanlış anladı. Durum kurtarmaya çalışıyorsun.",
    context: "Ters tepki."
  },
  {
    title: "Yanlış Vagon",
    description: "Trende yanlış vagona bindin. Kapılar kapandı.",
    context: "Arkadaş başka vagonda."
  },
  {
    title: "Eski Sevgili",
    description: "Kafede eski sevgiliyle karşılaştın. Oturmak zorundasın.",
    context: "Tek boş yer."
  },
  {
    title: "Yanlış Anlaşılma",
    description: "Şakan yanlış anlaşıldı, ortam gerildi. Açıklama yapmalısın.",
    context: "Herkes bakıyor."
  }
];