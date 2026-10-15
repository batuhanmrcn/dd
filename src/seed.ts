import type { Database, Section, SectionKind, Template, Activity } from './types';
import { SECTION_TYPES } from './types';

const section = (kind:SectionKind, content = ''):Section => ({id:`section-${kind}`,kind,title:SECTION_TYPES.find(s=>s.kind===kind)!.title,content,...(kind==='flow'?{blocks:[{id:'welcome',title:'Güne başlangıç',content:'Çocuklar karşılanır. Öğrenme merkezlerinde serbest oyunla güne başlanır.'},{id:'activity',title:'Etkinlik zamanı',content:'Çocuklar materyalleri inceler. Öğretmen rehberliğinde küçük gruplarla çalışılır.'},{id:'closing',title:'Günü değerlendirme',content:'Çocuklar gün içinde öğrendiklerini ve hissettiklerini paylaşır.'}]}:{})});
const full:SectionKind[] = ['type','book','concepts','materials','framework','flow','resources','evaluation','outcomes'];
const walnut:Template = {id:'walnut',title:'Ceviz ile Toplama Çıkarma',category:'Matematik & Müzik',color:'sage',locked:true,sections:[
 section('type','Müzik ve Matematik\nBütünleştirilmiş büyük grup etkinliği'),
 section('book','Cevizin Dünyası'),section('concepts','Az – Çok\nToplama\nÇıkarma'),
 section('materials','Bir sepet ceviz\nFındık\nBuzdolabı poşetleri\nSayı kartları\nMüzik'),
 section('framework','ALAN BECERİLERİ\nMatematik: Sayma, matematiksel muhakeme, veri ile çalışma.\n\nEĞİTİM ORTAMI\nSınıf / doğa\n\nAİLE KATILIMI\nEvde doğal materyallerle sayma oyunları.\n\nFARKLILAŞTIRMA\nÇocuğun ihtiyacına göre nesne sayısı azaltılır veya artırılır.'),
 {...section('flow'),blocks:[
 {id:'welcome',title:'Öğrenme merkezleri',content:'Çocuklar sınıfta günaydın müziği ile karşılanır. Öğretmen her çocuğu selamlar ve nasıl hissettiğini sorar. Çocuklar seçtikleri öğrenme merkezlerinde oyun oynar.\n\nSanat merkezi: Sabır ve paylaşma.\nFen ve doğa merkezi: Gözlem ve merak.\nKitap merkezi: Sorumluluk ve hayal gücü.'},
 {id:'math',title:'Cevizlerle matematik',content:'Her çocuğa bir poşet ve birkaç ceviz verilir. Müzikle birlikte hareket edilir; müzik durduğunda sayı kartı seçilir.\n\nÇocuklar karttaki sayı kadar cevizi poşetlerine ekler veya çıkarır. Her turda cevizler birlikte sayılır. Az ve çok kavramları karşılaştırılır.\n\nÖğretmen “Bir ceviz daha eklersek kaç olur?” gibi sorularla çocukların düşünmesini destekler.'},
 {id:'end',title:'Günü tamamlama',content:'Çocuklar cevizlerini sepete bırakır ve materyaller birlikte toplanır. Günün en sevdikleri bölümünü arkadaşlarıyla paylaşırlar.'}]},
 section('resources','Müzik / video bağlantısı'),section('evaluation','Etkinliğimizde neler yaptık?\nPoşetine kaç ceviz ekledin?\nKaç ceviz çıkardın?\nOyun sonunda kaç ceviz vardı?\nEvde cevizlerle hangi oyunları oynayabilirsin?'),section('outcomes','MAB.1 — Sayma\nMAB.5 — Matematiksel düşünme\nMAB.12 — Karşılaştırma\nMAB.14 — Problem çözme')
]};
export function makeSeed():Database {
 const templates:Template[] = [
 {id:'template-1',title:'Şablon-1',category:'Kapsamlı eğitim planı',color:'sand',locked:true,sections:full.map(k=>section(k))},
 {id:'template-2',title:'Şablon-2',category:'Temel eğitim planı',color:'lavender',locked:true,sections:full.slice(0,6).map(k=>section(k))},
 walnut,
 {id:'soap',title:'Sabun Boyama',category:'Sanat & Duyu',color:'peach',locked:true,sections:[section('type','Sanat ve duyusal keşif etkinliği'),section('concepts','Renkler\nYumuşak – Sert\nIslak – Kuru'),section('materials','Sabun kalıpları\nYıkanabilir boyalar\nFırça\nÖnlük'),section('framework','Çocuklar farklı renk ve dokuları keşfeder. Materyaller öğretmen gözetiminde kullanılır.'),section('flow'),section('evaluation')]},
 {id:'coding',title:'Kodlama Oyunu',category:'Oyun & Mantık',color:'lavender',locked:true,sections:[section('type','Hareket ve erken kodlama etkinliği'),section('concepts','İleri – Geri\nSağ – Sol\nSıralama'),section('materials','Yön kartları\nRenkli bant\nOyuncak robot'),section('framework','Çocuklar bir hedefe ulaşmak için adımları sıralar ve birlikte çözüm üretir.'),section('flow'),section('outcomes','Yönerge izleme\nProblem çözme')]}
 ];
 const event = (templateId:string,id:string,date:string,classId='class-1'):Activity => {const {locked:_,...t}=structuredClone(templates.find(t=>t.id===templateId)!);return {...t,id,templateId,date,classId};};
 return {version:1,schools:[{id:'school-1',name:'Yeşil Anaokulu',address:'Kadıköy, İstanbul'},{id:'school-2',name:'Güneş Anaokulu',address:'Ataşehir, İstanbul'}],
 classes:[{id:'class-1',name:'Çerezler Sınıfı',schoolId:'school-1',teacherIds:['teacher-1'],age:'5–6 yaş'},{id:'class-2',name:'Pıtırcıklar Sınıfı',schoolId:'school-1',teacherIds:['teacher-2'],age:'4–5 yaş'},{id:'class-3',name:'Minik Kaşifler',schoolId:'school-2',teacherIds:['teacher-2'],age:'5–6 yaş'}],
 teachers:[{id:'teacher-1',name:'Batuhan Mercan',email:'batuhan@example.test'},{id:'teacher-2',name:'Elif Yılmaz',email:'elif@example.test'}],
 students:[{id:'student-1',name:'Deniz Kaya',classId:'class-1'},{id:'student-2',name:'Ada Demir',classId:'class-1'},{id:'student-3',name:'Ege Yıldız',classId:'class-2'},{id:'student-4',name:'Mina Aydın',classId:'class-3'}],
 parents:[{id:'parent-1',name:'Selin Kaya',email:'selin@example.test',studentIds:['student-1']},{id:'parent-2',name:'Emre Yıldız',email:'emre@example.test',studentIds:['student-3']}],templates,
 events:[event('walnut','event-1','2026-09-28'),event('soap','event-2','2026-09-28'),event('coding','event-3','2026-09-29'),event('walnut','event-4','2026-09-30'),event('soap','event-5','2026-10-01'),event('coding','event-6','2026-10-02'),event('soap','event-7','2026-09-28','class-2'),event('coding','event-8','2026-09-29','class-3')]};
}
