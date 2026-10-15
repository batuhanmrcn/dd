import type { Activity, Database, Role, Template } from './types';
import { SECTION_TYPES } from './types';
import { makeSeed } from './seed';
export const STORAGE_KEY = 'filiz.prototype.v1';
export const uid = () => crypto.randomUUID();
export const instantiate = (t: Template, classId: string, date: string): Activity => {
 const {locked:_,...copy} = structuredClone(t);
 return {...copy,id:uid(),templateId:t.id,classId,date,sections:copy.sections.map(s=>({...s,id:uid()}))};
};
export const copyTemplate = (t: Template): Template => ({...structuredClone(t),id:uid(),title:`${t.title} — kopya`,locked:false});
export const visibleClasses = (db: Database, role: Role, person: string): Database['classes'] => {
 if(role==='admin') return db.classes;
 if(role==='teacher') return db.classes.filter(c=>c.teacherIds.includes(person));
 const ids = db.parents.find(p=>p.id===person)?.studentIds??[];
 const classIds = new Set(db.students.filter(s=>ids.includes(s.id)).map(s=>s.classId));
 return db.classes.filter(c=>classIds.has(c.id));
};
export const parseDate = (date:string) => new Date(`${date}T12:00:00`);
export const dateKey = (date:Date) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
export function addDays(date:string, days:number) { const d=parseDate(date);d.setDate(d.getDate()+days);return dateKey(d); }
export function weekDays(date:string):string[] {const day=parseDate(date).getDay();const start=addDays(date,-((day+6)%7));return Array.from({length:7},(_,i)=>addDays(start,i));}
export function monthDays(date:string):string[] {
 const first=date.slice(0,7)+'-01';const d=parseDate(first);d.setMonth(d.getMonth()+1);d.setDate(0);
 const start=weekDays(first)[0],end=weekDays(dateKey(d))[6];const out:string[]=[];
 for(let day=start;day<=end;day=addDays(day,1))out.push(day);
 return out;
}
export const formatDate = (date:string,options:Intl.DateTimeFormatOptions={day:'numeric',month:'long'}) => parseDate(date).toLocaleDateString('tr-TR',options);
export function moveMonth(date:string,amount:number) {const d=parseDate(date.slice(0,7)+'-01');d.setMonth(d.getMonth()+amount);return dateKey(d);}
export interface StorageLike {getItem(key:string):string|null; setItem(key:string,value:string):void; removeItem(key:string):void}
function validDb(input:unknown):input is Database {
 if(!input||typeof input!=='object')return false;
 const d=input as Database;
 const str=(x:unknown)=>typeof x==='string';
 const ids=(x:unknown)=>Array.isArray(x)&&x.every(str);
 const rows=(x:unknown,check:(v:any)=>boolean)=>Array.isArray(x)&&x.every(v=>v&&typeof v==='object'&&str(v.id)&&check(v))&&new Set(x.map(v=>v.id)).size===x.length;
 const sections=(x:unknown)=>rows(x,s=>str(s.title)&&str(s.content)&&SECTION_TYPES.some(k=>k.kind===s.kind)&&(s.blocks===undefined||rows(s.blocks,b=>str(b.title)&&str(b.content))));
 const template=(t:any)=>str(t.title)&&str(t.category)&&str(t.color)&&sections(t.sections);
 if(!(d.version===1&&rows(d.schools,s=>str(s.name)&&str(s.address))&&rows(d.classes,c=>str(c.name)&&str(c.schoolId)&&str(c.age)&&ids(c.teacherIds))&&rows(d.teachers,t=>str(t.name)&&str(t.email))&&rows(d.students,s=>str(s.name)&&str(s.classId))&&rows(d.parents,p=>str(p.name)&&str(p.email)&&ids(p.studentIds))&&rows(d.templates,t=>template(t)&&typeof t.locked==='boolean')&&rows(d.events,e=>template(e)&&str(e.classId)&&str(e.templateId)&&str(e.date)&&/^\d{4}-\d{2}-\d{2}$/.test(e.date)&&dateKey(parseDate(e.date))===e.date)))return false;
 return d.classes.every(c=>d.schools.some(s=>s.id===c.schoolId)&&c.teacherIds.every(id=>d.teachers.some(t=>t.id===id)))&&d.students.every(s=>d.classes.some(c=>c.id===s.classId))&&d.parents.every(p=>p.studentIds.every(id=>d.students.some(s=>s.id===id)))&&d.events.every(e=>d.classes.some(c=>c.id===e.classId));
}
export class StorageConflictError extends Error {}
export const saveState = (storage:StorageLike, db:Database, expected?:string|null) => {
 if(expected!==undefined&&storage.getItem(STORAGE_KEY)!==expected)throw new StorageConflictError('Başka sekmedeki değişiklikler korunuyor.');
 storage.setItem(STORAGE_KEY,JSON.stringify(db));
};
export function loadState(storage:StorageLike|(()=>StorageLike)): {state:Database;raw:string|null;error?:string} {
 let raw:string|null=null;
 try {const source=typeof storage==='function'?storage():storage;raw=source.getItem(STORAGE_KEY);if(!raw)return {state:makeSeed(),raw};const parsed:unknown=JSON.parse(raw);if(!validDb(parsed))throw new Error('Invalid');return {state:parsed,raw};}
 catch {return {state:makeSeed(),raw,error:'Kayıtlı veriler okunamadı. Eski kaydınız korunuyor. Devam etmek için örnek verilere dönün.'};}
}
