# Anaokulu prototipi uygulama kaydı

Onaylanan plan: bu konuşmadaki “Anaokulu Uygulaması — İlk Deneme Prototipi”.

1. Veri modeli, bağımsız şablon kopyaları, rol filtreleri, tarih yardımcıları ve kalıcılık.
2. Örnek içerikler ve kaynak bilgili 2026–2027 MEB takvimi.
3. Admin yönetimi, şablon düzenleyicisi, haftalık/aylık planlama.
4. Mobil öğretmen/veli görünümleri ve etkinlik detayları.
5. Otomatik davranış testleri, tarayıcı doğrulaması, üretim derlemesi.

Karar: Depo boş ve henüz ilk commit yok; başlangıç commit'i gerektiren ek worktree yerine kullanıcının sağladığı boş çalışma alanı kullanılacak.
Karar: Filiz geçici ürün adı; tek tarayıcıdaki rol seçimi gerçek kimlik doğrulama değildir.
Karar: Atanmış etkinlikler sınıf+tarih ile kaydedilir; haftalar ve aylar aynı kayıtlardan türetilir.
Karar: Öğretmen–sınıf ve veli–öğrenci bağlantıları çoklu seçimi destekler. Öğrenci tek sınıfa bağlıdır.
Karar: Yerel depolama hatası kullanıcıya gösterilir; bozuk kayıt kendiliğinden üzerine yazılmaz.

Durum: Uygulama ve doğrulamalar tamamlandı.

- Veri modeli: 11 Vitest testi geçti. Derin kopyalar, rol filtreleri, ay/yıl sınırları, kayıt yükleme, bozuk kayıt ve sekme çakışması kapsandı.
- Arayüz: 12 Playwright/Edge testi geçti. Atama, düzenleme, kaldırma, yeni öğrenci–veli ilişkisi, şablon özelleştirme, sıfırlama ve dar ekran kontrolleri kapsandı.
- Üretim: TypeScript kontrolü ve Vite üretim derlemesi geçti.
- Bağımlılıklar: npm audit fix sonrası 0 açık bildirildi; Vitest 4.1.11, Vite 7.3.6 kullanılıyor.
- Görsel inceleme: artifacts/admin.png, planner.png ve activity.png gözle kontrol edildi; diğer ekran görüntüleri de artifacts/ altında.
- Bağımsız kod incelemesindeki 3 bulgu giderildi: özel şablonun eylem etiketi, localStorage getter hatasında açılış, diğer sekmelerin kaydını ezme.
- Karar: npm 10'un isteğe bağlı eş bağımlılık ağacını çözerken verdiği edgesOut hatası için proje .npmrc dosyası legacy-peer-deps kullanıyor. Gerekli React/Vite/Vitest eş bağımlılıkları açıkça tanımlı; lockfile teslim ediliyor.
