import type { CalendarEvent } from './types';
export const SPECIAL_SOURCE = 'https://www.meb.gov.tr/belirli-gun-ve-haftalar-cizelgesi/duyuru/11814?KeepThis=true&TB_iframe=true&height=75';
export const TERM_SOURCE = 'https://www.meb.gov.tr/2026-2027-egitim-ogretim-yili-takvimi-aciklandi/haber/41057/tr';
// Exact dates and explicit ranges are transcribed from MEB. Ambiguous week boundaries remain undated.
const fixed: [string,string,string?][] = [
 ['Uluslararası Temiz Hava Günü','2026-09-07'],['Dünya İlk Yardım Günü','2026-09-12'],['Gaziler Günü','2026-09-19'],
 ['15 Temmuz Demokrasi ve Millî Birlik Günü — okul anma haftası','2026-09-21','2026-09-27'],['Dünya Okul Sütü Günü','2026-09-28'],
 ['Hayvanları Koruma Günü','2026-10-04'],['Ahilik Kültürü Haftası','2026-10-08','2026-10-12'],['Dünya Afet Azaltma Günü','2026-10-13'],
 ['Birleşmiş Milletler Günü','2026-10-24'],['Cumhuriyet Bayramı','2026-10-29'],['Kızılay Haftası','2026-10-29','2026-11-04'],
 ['Organ Bağışı ve Nakli Haftası','2026-11-03','2026-11-09'],['Lösemili Çocuklar Haftası','2026-11-02','2026-11-08'],
 ['Atatürk Haftası','2026-11-10','2026-11-16'],['Dünya Diyabet Günü','2026-11-14'],['Afet Eğitimi Hazırlık Günü','2026-11-12'],
 ['Dünya Felsefe Günü','2026-11-20'],['Dünya Çocuk Hakları Günü','2026-11-20'],['Ağız ve Diş Sağlığı Haftası','2026-11-21','2026-11-27'],
 ['Öğretmenler Günü','2026-11-24'],['Dünya Engelliler Günü','2026-12-03'],['Dünya Madenciler Günü','2026-12-04'],
 ['Türk Kadınına Seçme ve Seçilme Hakkının Verilişi','2026-12-05'],['Mevlana Haftası','2026-12-07','2026-12-17'],
 ['Tutum, Yatırım ve Türk Malları Haftası','2026-12-12','2026-12-18'],['Mehmet Akif Ersoy’u Anma Haftası','2026-12-20','2026-12-27'],
 ['Dünya Kadınlar Günü','2027-03-08'],['Bilim ve Teknoloji Haftası','2027-03-08','2027-03-14'],
 ['İstiklâl Marşı’nın Kabulü ve Mehmet Akif Ersoy’u Anma Günü','2027-03-12'],['Tüketiciyi Koruma Haftası','2027-03-15','2027-03-21'],
 ['Şehitler Günü','2027-03-18'],['Yaşlılar Haftası','2027-03-18','2027-03-24'],['Orman Haftası','2027-03-21','2027-03-26'],
 ['Dünya Su Günü','2027-03-22'],['Dünya Tiyatrolar Günü','2027-03-27'],['Kanser Haftası','2027-04-01','2027-04-07'],
 ['Dünya Otizm Farkındalık Günü','2027-04-02'],['Kişisel Verileri Koruma Günü','2027-04-07'],
 ['Dünya Sağlık Günü / Dünya Sağlık Haftası','2027-04-07','2027-04-13'],['Turizm Haftası','2027-04-15','2027-04-22'],
 ['Ulusal Egemenlik ve Çocuk Bayramı','2027-04-23'],['Dünya Fikrî Mülkiyet Günü','2027-04-26'],['Kût’ül Amâre Zaferi','2027-04-29'],
 ['İş Sağlığı ve Güvenliği Haftası','2027-05-04','2027-05-10'],['Anneler Günü','2027-05-09'],['Engelliler Haftası','2027-05-10','2027-05-16'],
 ['Müzeler Haftası','2027-05-18','2027-05-24'],['Atatürk’ü Anma ve Gençlik ve Spor Bayramı','2027-05-19'],
 ['Etik Günü','2027-05-25'],['İstanbul’un Fethi','2027-05-29'],['Babalar Günü','2027-06-20'],['Zafer Bayramı','2027-08-30']
];
const pending:[string,string][] = [
 ['İlköğretim Haftası','Eylül ayının 3. haftası. Kesin gün aralığı okul çalışma takvimiyle teyit edilecek.'],
 ['Öğrenciler Günü','İlköğretim Haftasının son günü; hafta aralığı teyit edilecek.'],
 ['Disleksi Haftası','Ekim ayının ilk haftası. Kesin başlangıç ve bitiş tarihi teyit edilecek.'],
 ['Dünya Disleksi Günü','Ekim ayının ilk haftasının perşembe günü; hafta tanımı teyit edilecek.'],
 ['Mevlid-i Nebî Haftası','Diyanet İşleri Başkanlığınca belirlenecek haftada.'],
 ['İnsan Hakları ve Demokrasi Haftası','10 Aralık gününü içine alan hafta. Okulun hafta aralığı teyit edilecek.'],
 ['Enerji Tasarrufu Haftası','Ocak ayının 2. haftası. Kesin gün aralığı teyit edilecek.'],
 ['Vergi Haftası','Şubat ayının son haftası. Kesin gün aralığı teyit edilecek.'],
 ['Yeşilay Haftası','1 Mart gününü içine alan hafta. Kesin gün aralığı teyit edilecek.'],
 ['Girişimcilik Haftası','Mart ayının ilk haftası. Kesin gün aralığı teyit edilecek.'],
 ['Türk Dünyası ve Toplulukları Haftası','21 Mart Nevruz gününü içine alan hafta. Kesin gün aralığı teyit edilecek.'],
 ['Kütüphaneler Haftası','Mart ayının son pazartesi gününü içine alan hafta. Kesin gün aralığı teyit edilecek.'],
 ['Bilişim Haftası','Mayıs ayının ilk haftası. Kesin gün aralığı teyit edilecek.'],
 ['Trafik ve İlkyardım Haftası','Mayıs ayının ilk haftası. Kesin gün aralığı teyit edilecek.'],
 ['Vakıflar Haftası','Mayıs ayının 2. haftası. Kesin gün aralığı teyit edilecek.'],
 ['Hayat Boyu Öğrenme Haftası','Haziran ayının ilk haftası. Kesin gün aralığı teyit edilecek.'],
 ['Çevre ve İklim Değişikliği Haftası','Haziran ayının 2. haftası. Kesin gün aralığı teyit edilecek.'],
 ['Mahallî Kurtuluş Günleri, Atatürk Günleri ve Tarihî Günler','İl/ilçe bilgisine ve yerel resmî takvime göre eklenecek.']
];
const terms:[string,string,string?][] = [
 ['Öğretmenlerin mesleki çalışmaları başlangıcı','2026-09-01'],['Okul öncesi uyum eğitimi','2026-09-07','2026-09-11'],
 ['Birinci dönem başlangıcı','2026-09-14'],['Birinci dönem ara tatili','2026-11-16','2026-11-20'],
 ['Birinci dönem sonu','2027-01-22'],['Yarıyıl tatili','2027-01-25','2027-02-05'],['İkinci dönem başlangıcı','2027-02-08'],
 ['İkinci dönem ara tatili','2027-03-08','2027-03-12'],['Eğitim öğretim yılı sonu','2027-06-25']
];
export const calendar:CalendarEvent[] = [
 ...fixed.map(([title,start,end],i)=>({id:`special-${i}`,title,start,end:end??start,source:SPECIAL_SOURCE,kind:'special' as const})),
 ...pending.map(([title,note],i)=>({id:`pending-${i}`,title,note,source:SPECIAL_SOURCE,kind:'special' as const})),
 ...terms.map(([title,start,end],i)=>({id:`term-${i}`,title,start,end:end??start,source:TERM_SOURCE,kind:'term' as const}))
];
export const calendarOn = (date:string) => calendar.filter(e=>e.start && e.start<=date && (e.end??e.start)>=date);
