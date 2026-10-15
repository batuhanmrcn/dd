# Filiz — Anaokulu eğitim planlama prototipi

React + TypeScript + Vite ile hazırlanan Türkçe, tek firma için tarayıcı prototipi.

## Çalıştırma

Node.js 22.12+ (veya desteklenen 20.19+) gerekir.

```powershell
npm.cmd ci
npm.cmd run dev
```

Terminalde gösterilen yerel adresi açın (varsayılan http://127.0.0.1:5173).
Windows dışındaki sistemlerde `npm.cmd` yerine `npm` kullanın.

`.npmrc`, npm 10'da isteğe bağlı eş bağımlılık çözümlemesinde görülen iç hata nedeniyle `legacy-peer-deps` kullanır. Kilit dosyası bu ayarla üretildiği için `npm ci` aynı ayarı devralır.

## Deneme akışı

1. Admin görünümünde **Okullar ve sınıflar** üzerinden okul/sınıf ekleyin; sınıf düzenleyicisinde öğretmenleri seçin.
2. **Okul topluluğu** bölümünde öğretmen/öğrenci/veli oluşturun. Öğrencinin sınıfını ve velinin bağlı öğrencilerini seçin.
3. **Şablon kütüphanesi** içinden hazır şablonu kopyalayın veya yeni şablon oluşturun. Bölüm ekleyin/silin, ders akışına alt başlıklar ekleyin.
4. **Haftalık plan** ekranında sınıfı seçin; günlerdeki “Etkinlik ekle” ile şablon atayın. Bir güne birden fazla etkinlik eklenebilir. Etkinliği açıp bağımsız kopyasını düzenleyin veya kaldırın.
5. **Aylık** düğmesi aynı kayıtları ay görünümünde gösterir. Ay/yıl geçişleri desteklenir.
6. Sağ üstteki **Görünüm rolü** ile öğretmen/veli görünümüne geçin; örnek kişiyi seçin. Yalnızca ilişkili sınıflar görünür.
7. **Örnek verilere dön** onayından sonra başlangıç kayıtları geri yüklenir.

Başlangıç örnek haftası: **28 Eylül – 4 Ekim 2026**. Yeşil Anaokulu / Çerezler Sınıfı: Batuhan Mercan; Selin Kaya, Deniz Kaya üzerinden bu sınıfa bağlıdır.

## Veri ve sınırlar

- Gerçek giriş, sunucu, API, cihazlar arası eşitleme ve Android/iOS paketleri yoktur. Rol seçimi güvenlik sınırı değildir.
- Kayıtlar aynı tarayıcı ve aynı origin altında `filiz.prototype.v1` anahtarında saklanır. Port/hostname değişirse farklı bir yerel kayıt alanı açılır. Tarayıcı verilerini silmek kayıtları siler.
- Başka sekme veriyi değiştirirse eski sekmenin kaydetmesi engellenir. Açık düzenleyiciyi kapatıp “Güncel verileri yükle” ile devam edin.
- Bozuk kayıt üzerine otomatik yazılmaz; depolama engeli/hatası kullanıcıya gösterilir.
- Hazır şablonlar korunur. Atanmış etkinlikler içerik kopyasıdır; kaynak şablon düzenlemeleri geçmiş atamaları etkilemez.
- Öğrenci bir sınıfa bağlıdır. Sınıf birden fazla öğretmene, veli birden fazla öğrenciye bağlanabilir.
- Kitap/kaynak/değerlendirme yalnızca görsel önizlemedir. Örnek kazanım kodları ve etkinlik metinleri pedagojik doğrulama iddiası taşımaz.
- Google Fonts erişilemezse sistem yazı tipi kullanılır; uygulamanın işlevleri yerel çalışır.

## Takvim kaynakları

- [MEB Belirli Gün ve Haftalar Çizelgesi](https://www.meb.gov.tr/belirli-gun-ve-haftalar-cizelgesi/duyuru/11814?KeepThis=true&TB_iframe=true&height=75)
- [MEB 2026–2027 Çalışma Takvimi](https://www.meb.gov.tr/2026-2027-egitim-ogretim-yili-takvimi-aciklandi/haber/41057/tr)

Kaynak kontrolü: 27 Eylül 2026. Eğitim yılı kapsamı Eylül 2026–Ağustos 2027. Çizelgedeki 70 madde: 52 tarihli kayıt + 18 tarih aralığı/kurum/yerel takvim teyidi gereken kayıt. Ayrıca 9 eğitim takvimi kaydı bulunur. Haftaların kesin gün aralığı kaynakta belirtilmediyse tarih varsayılmadan “Tarihi netleştirilecek” bölümünde gösterilir. Takvim canlı MEB bağlantısı ile güncellenmez.

## Kontroller

```powershell
npm.cmd test
npm.cmd run test:e2e
npm.cmd run build
```

Tarayıcı testleri kurulu Microsoft Edge'i başsız kullanır ve yerel sunucuyu otomatik başlatır. Görsel test, `artifacts/` altında masaüstü/mobil PNG'ler üretir. `dist/` üretim derlemesidir; `npm.cmd run preview` ile kontrol edilebilir.
