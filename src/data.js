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
    title: "Asansör Arızası",
    description: "İki kat arasında mahsur kaldınız. Işıklar yanıp sönüyor.",
    context: "Kimse sizi duymuyor gibi... Telefon çekmiyor."
  },
  {
    title: "Kasada Bekleyenler",
    description: "Süpermarket kasasında, önünüzdeki kişi bozuk para sayıyor.",
    context: "Arkanızda uzun bir kuyruk var ve herkes sabırsız."
  },
  {
    title: "Hastane Bekleme Salonu",
    description: "Gergin bir şekilde sıranızı bekliyorsunuz.",
    context: "Yanınızdaki kişi sürekli soru soruyor."
  },
  {
    title: "Yıllar Sonra Karşılaşma",
    description: "Eski bir arkadaşla yolda karşılaştınız.",
    context: "Aranızda açıklanmamış bir mesele kalmıştı."
  },
  {
    title: "Unutulan Cüzdan",
    description: "Hesap geldi ama ikiniz de cüzdanınızı bulamıyorsunuz.",
    context: "Garson bekliyor, masada diğer müşteriler de var."
  },
  {
    title: "Kütüphane Sırrı",
    description: "Kütüphanede sessiz olmanız gereken bir anda yan yana oturuyorsunuz.",
    context: "Biriniz diğerine çok önemli bir şey fısıldamak istiyor."
  },
  {
    title: "Kaçan İkramiye",
    description: "Piyango biletinize bakıyorsunuz, son rakamla büyük ikramiye kaçmış.",
    context: "Yanınızdaki kişi zaten kazanacağını biliyordu."
  },
  {
    title: "Kayıp Bagaj",
    description: "Havalimanında bagajınız kayboldu ve görevli yardımcı olamıyor.",
    context: "İçinde çok değerli bir eşya vardı."
  },
  {
    title: "Yanlış Numara",
    description: "Telefonunuzdan yanlışlıkla birine çok samimi bir mesaj gönderdiniz.",
    context: "Mesajı alan kişi tam karşınızda oturuyor."
  },
  {
    title: "Komşu Şikayeti",
    description: "Komşunuz gürültüden şikayet etmeye kapınıza geldi.",
    context: "Aslında gürültü yapan siz değilsiniz."
  },
  {
    title: "İlk Buluşma",
    description: "Bir restoranda ilk kez buluşuyorsunuz.",
    context: "İkiniz de çok gerginsiniz ama belli etmemeye çalışıyorsunuz."
  },
  {
    title: "Otobüs Durağı",
    description: "Son otobüsü kaçırdınız ve durakta bekliyorsunuz.",
    context: "Hava soğuk, yağmur başlamak üzere."
  },
  {
    title: "Sürpriz Parti",
    description: "Arkadaşınıza sürpriz parti hazırlıyorsunuz ama o erken geldi.",
    context: "Her şeyi toplamak için sadece birkaç dakikanız var."
  },
  {
    title: "Kayıp Anahtar",
    description: "Eve geldiniz ama anahtarınız yok. Kapıyı kilitleyen kişi yanınızda.",
    context: "İkiniz de çok yorgunsunuz ve hava geç."
  },
  {
    title: "Yanlış Tren",
    description: "Trene bindiniz ama yanlış yöne gittiğinizi fark ettiniz.",
    context: "Bir sonraki tren için 2 saat beklemeniz gerekecek."
  },
  {
    title: "Restoran İtirafı",
    description: "Yemek yerken biriniz diğerine önemli bir itirafta bulunacak.",
    context: "Masada başka bir çift de var ve sizi dinliyor gibi."
  },
  {
    title: "Fırtına Gecesi",
    description: "Şiddetli fırtına nedeniyle dışarıda mahsur kaldınız.",
    context: "Sığınacak tek yer eski bir kulübe."
  },
  {
    title: "İş Mülakati",
    description: "İkiniz de aynı pozisyon için mülakata girdiniz.",
    context: "Sonuçlar az sonra açıklanacak."
  },
  {
    title: "Düğün Hazırlığı",
    description: "En yakın arkadaşınızın düğünü için son hazırlıkları yapıyorsunuz.",
    context: "Gelinlik hala gelmedi ve müzik çalar bozuldu."
  },
  {
    title: "Trafik Sıkışması",
    description: "Saatlerce trafikte mahsur kaldınız.",
    context: "Çok önemli bir toplantıya yetişmeniz gerekiyor."
  },
  {
    title: "Kamp Ateşi",
    description: "Ormanda kamp yapıyorsunuz, ateşin etrafında oturuyorsunuz.",
    context: "Uzaktan garip sesler geliyor."
  },
  {
    title: "Sınav Sonucu",
    description: "Önemli bir sınavın sonuçları açıklanmak üzere.",
    context: "İkiniz de çok çalıştınız ama sadece biri kazanabilecek."
  },
  {
    title: "Tatil Planı",
    description: "Hayalinizdeki tatil için havaalanındasınız.",
    context: "Uçuş iptal edildi ve alternatif yok."
  },
  {
    title: "Komşu Ziyareti",
    description: "Yeni taşınan komşunuz sizi yemeğe davet etti.",
    context: "Yemek pek iyi değil ama belli etmemeye çalışıyorsunuz."
  },
  {
    title: "Kayıp Köpek",
    description: "Mahallede kayıp bir köpek arıyorsunuz.",
    context: "Köpeğinizi son kez parkta gören sizdiniz."
  },
  {
    title: "Doğum Günü Sürprizi",
    description: "Bir arkadaşınıza doğum günü sürprizi hazırlıyorsunuz.",
    context: "Misafirler gelmeye başladı ama doğum günü çocuğu yolda."
  },
  {
    title: "Market Kavgası",
    description: "Son kalan indirimli ürün için iki kişi aynı anda uzandınız.",
    context: "Etraftaki insanlar size bakıyor."
  },
  {
    title: "Plazada Asansör",
    description: "40 katlı bir binanın asansöründe mahsur kaldınız.",
    context: "İçinizden biri kapalı alandan korkuyor."
  },
  {
    title: "Eski Fotoğraflar",
    description: "Tavan arasında eski fotoğraflar buldunuz.",
    context: "Fotoğraflardan biri aile sırrını ortaya çıkarabilir."
  },
  {
    title: "Karantinada Komşular",
    description: "Pandemi nedeniyle aynı apartmanda karantinasınız.",
    context: "Balkonlardan birbirinize sesleniyorsunuz."
  },
  {
    title: "Otopark Tartışması",
    description: "İkiniz de aynı park yerine park etmeye çalışıyorsunuz.",
    context: "Arkanızda kornalar çalıyor."
  },
  {
    title: "Yarışma Heyecanı",
    description: "Bir bilgi yarışmasının finalindesiniz.",
    context: "Son soru çok zor ve süre azalıyor."
  },
  {
    title: "Havalimanı Vedası",
    description: "Biriniz yurt dışına taşınıyor, havaalanında vedalaşıyorsunuz.",
    context: "Uçuş anonsu yapıldı ama henüz ayrılamıyorsunuz."
  },
  {
    title: "Restoran Eleştirisi",
    description: "Yemek yediğiniz restoranda yemek beklediğiniz gibi çıkmadı.",
    context: "Garsonla konuşmak size düştü."
  },
  {
    title: "Gizli Hediye",
    description: "Birbirinize gizlice hediye almaya çalışıyorsunuz.",
    context: "Hediyeler neredeyse birbirinize aynı anda verilecek."
  },
  {
    title: "Spor Salonu",
    description: "İlk kez birlikte spor salonuna gittiniz.",
    context: "Aletlerin nasıl kullanıldığını bilmiyorsunuz."
  },
  {
    title: "Deniz Kenarı",
    description: "Sahilde gün batımını izliyorsunuz.",
    context: "Birinizin ayağına denizanası soktu."
  },
  {
    title: "Kitap Kulübü",
    description: "Aynı kitabı okudunuz ama tamamen farklı yorumlarınız var.",
    context: "Diğer üyeler sizin tartışmanızı bekliyor."
  },
  {
    title: "Kaçan Otobüs",
    description: "Otobüs tam burnunuzun önünde kapıları kapatıyor.",
    context: "Bir sonraki otobüs 45 dakika sonra."
  },
  {
    title: "Doktor Beklerken",
    description: "Muayenehanede kötü haber bekliyorsunuz.",
    context: "Sıranız geldi ama içeriye tek başınıza gireceksiniz."
  },
  {
    title: "Yeni Ev",
    description: "Yeni taşındığınız evin ilk gecesi.",
    context: "Kutular hala açılmadı ve yatak yok."
  },
  {
    title: "Tiyatro Sahnesi",
    description: "Amatör tiyatro oyununda sahnedesiniz.",
    context: "Partneriniz repliklerini unuttu."
  },
  {
    title: "Beklenmedik Misafir",
    description: "Kapı çaldı, uzaktan bir akraba geldi.",
    context: "Ev dağınık ve hazırlıksız yakalandınız."
  },
  {
    title: "Son Bilet",
    description: "Konser için son kalan iki bilet sizde.",
    context: "Bir arkadaşınız da gelmek istiyor ama bilet yok."
  },
  {
    title: "Yıldızları İzlerken",
    description: "Çatıda yıldızları izliyorsunuz.",
    context: "Biriniz kayan yıldıza dilek tutmak istiyor ama söyleyemiyor."
  },
  {
    title: "Cafe Buluşması",
    description: "Uzun zamandır görüşmediğiniz biriyle cafedesiniz.",
    context: "Konu beklenmedik bir şekilde hassas bir konuya geldi."
  },
  {
    title: "Buz Pisti",
    description: "İlk kez buz pateni yapıyorsunuz.",
    context: "Biriniz düştü ve kalkamıyor."
  }
];