export type Role = 'admin' | 'teacher' | 'parent';
export type SectionKind = 'type' | 'book' | 'concepts' | 'materials' | 'framework' | 'flow' | 'resources' | 'evaluation' | 'outcomes' | 'custom';
export interface Block { id: string; title: string; content: string }
export interface Section { id: string; kind: SectionKind; title: string; content: string; blocks?: Block[] }
export interface Template { id: string; title: string; category: string; color: string; locked: boolean; sections: Section[] }
export interface Activity extends Omit<Template, 'locked'> { classId: string; date: string; templateId: string }
export interface School { id: string; name: string; address: string }
export interface ClassRoom { id: string; name: string; schoolId: string; teacherIds: string[]; age: string }
export interface Teacher { id: string; name: string; email: string }
export interface Student { id: string; name: string; classId: string }
export interface Parent { id: string; name: string; email: string; studentIds: string[] }
export interface Database { version: 1; schools: School[]; classes: ClassRoom[]; teachers: Teacher[]; students: Student[]; parents: Parent[]; templates: Template[]; events: Activity[] }
export interface CalendarEvent { id: string; title: string; start?: string; end?: string; note?: string; source: string; kind: 'special' | 'term' }
export const SECTION_TYPES: {kind: SectionKind; title: string; icon: string}[] = [
  {kind:'type',title:'Etkinlik türü',icon:'puzzle'}, {kind:'book',title:'Haftanın kitabı & müziği',icon:'book'},
  {kind:'concepts',title:'Kavramlar & sözcükler',icon:'lightbulb'}, {kind:'materials',title:'Materyaller',icon:'briefcase'},
  {kind:'framework',title:'İçerik çerçevesi',icon:'layers'}, {kind:'flow',title:'Ders akışı',icon:'play'},
  {kind:'resources',title:'Ek kaynaklar',icon:'link'}, {kind:'evaluation',title:'Değerlendirme',icon:'chart'},
  {kind:'outcomes',title:'Kazanım haritası',icon:'target'}, {kind:'custom',title:'Özel bölüm',icon:'plus'}
];
