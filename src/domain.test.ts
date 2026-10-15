import { describe, it, expect } from 'vitest';
import { makeSeed } from './seed';
import { instantiate, copyTemplate, visibleClasses, weekDays, monthDays, saveState, loadState, STORAGE_KEY } from './domain';

describe('şablon ve plan bağımsızlığı', () => {
  it('atama kaynak şablon ve diğer atamaların alt başlıklarını değiştirmez', () => {
    const t = makeSeed().templates.find(t => t.id === 'walnut')!;
    const a = instantiate(t, 'class-1', '2026-09-28');
    const b = instantiate(t, 'class-1', '2026-09-28');
    const original = structuredClone(t);
    a.sections.find(s => s.kind === 'flow')!.blocks![0].content = 'Değişen akış';
    a.sections.splice(0, 1);
    expect(t).toEqual(original);
    expect(b.sections).toEqual(original.sections.map((s, i) => ({...s, id: b.sections[i].id})));
    expect(a.id).not.toBe(b.id);
  });
  it('korumalı şablonun kopyası düzenlenebilir ve bağımsızdır', () => {
    const source = makeSeed().templates[0];
    const copy = copyTemplate(source);
    expect(copy.locked).toBe(false);
    expect(copy.id).not.toBe(source.id);
    copy.sections[0].content = 'Yeni içerik';
    expect(source.sections[0].content).not.toBe('Yeni içerik');
  });
});
describe('rol görünürlüğü', () => {
  it('öğretmen yalnızca atandığı sınıfları görür', () => {
    expect(visibleClasses(makeSeed(), 'teacher', 'teacher-1').map(c => c.id)).toEqual(['class-1']);
    expect(visibleClasses(makeSeed(), 'teacher', 'unknown')).toEqual([]);
  });
  it('veli yalnızca bağlı çocuklarının sınıflarını görür; tekrarlar birleşir', () => {
    const db = makeSeed();
    db.parents[0].studentIds = ['student-1', 'student-2'];
    expect(visibleClasses(db, 'parent', 'parent-1').map(c => c.id)).toEqual(['class-1']);
    db.parents[0].studentIds = [];
    expect(visibleClasses(db, 'parent', 'parent-1')).toEqual([]);
  });
});
describe('tarih sınırları', () => {
  it('pazar gününden pazartesi başlayan haftayı bulur ve ay sınırını aşar', () => {
    expect(weekDays('2026-10-04')).toEqual(['2026-09-28','2026-09-29','2026-09-30','2026-10-01','2026-10-02','2026-10-03','2026-10-04']);
  });
  it('ay görünümü ocak-aralık ve şubat sınırlarını kapsar', () => {
    const days = monthDays('2027-01-15');
    expect(days[0]).toBe('2026-12-28');
    expect(days).toContain('2027-01-31');
    expect(monthDays('2027-02-01')).not.toContain('2027-02-29');
  });
});
describe('kalıcılık', () => {
  const storage = () => { const data = new Map<string,string>(); return {getItem:(k:string)=>data.get(k)??null,setItem:(k:string,v:string)=>{data.set(k,v);},removeItem:(k:string)=>{data.delete(k);}}; };
  it('düzenlenen planı yeniden açılışta korur', () => {
    const s = storage(); const db = makeSeed(); db.events[0].title = 'Kalıcı değişiklik';
    saveState(s, db);
    expect(loadState(s).state.events[0].title).toBe('Kalıcı değişiklik');
  });
  it('bozuk kaydı üzerine yazmadan bildirir', () => {
    const s = storage(); s.setItem(STORAGE_KEY, '{bad');
    expect(loadState(s).error).toBeTruthy();
    expect(s.getItem(STORAGE_KEY)).toBe('{bad');
  });
  it('geçersiz ilişkili kayıt yapısını kabul etmez', () => {
    const s = storage(); const db = makeSeed();
    s.setItem(STORAGE_KEY, JSON.stringify({...db, classes: [{id:'bad'}]}));
    expect(loadState(s).error).toBeTruthy();
  });
  it('depolama nesnesine erişim reddedildiğinde başlangıcı çökertmez', () => {
    const denied = () => {throw new Error('SecurityError');};
    expect(loadState(denied).error).toBeTruthy();
  });
  it('başka sekmenin kaydını eski kopya ile ezmez', () => {
    const s=storage();const initial=makeSeed();saveState(s,initial);
    const expected=s.getItem(STORAGE_KEY);
    const newer=makeSeed();newer.schools.push({id:'new-school',name:'Yeni okul',address:''});saveState(s,newer);
    expect(()=>saveState(s,initial,expected)).toThrow();
    expect(loadState(s).state.schools).toHaveLength(3);
  });
});
