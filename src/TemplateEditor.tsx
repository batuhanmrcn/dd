import { useState } from 'react';
import type { Activity, SectionKind, Template } from './types';
import { SECTION_TYPES } from './types';
import { uid } from './domain';
import { Icon, Modal } from './ui';

export function TemplateEditor({item,onClose,onSave}:{item:Template|Activity;onClose:()=>void;onSave:(item:Template|Activity)=>void}) {
 const [draft,setDraft]=useState(()=>structuredClone(item));
 const [kind,setKind]=useState<SectionKind>('materials');
 const event='date' in draft;
 const changeSection=(id:string,patch:object)=>setDraft(d=>({...d,sections:d.sections.map(s=>s.id===id?{...s,...patch}:s)}));
 return <Modal title={event?'Etkinliği düzenle':'Şablon atölyesi'} onClose={onClose} wide>
  <form onSubmit={e=>{e.preventDefault();if(draft.title.trim())onSave({...draft,title:draft.title.trim()});}}>
   <div className="editor-intro"><Icon name="layers"/><p>{event?'Bu değişiklikler yalnızca seçtiğiniz sınıf ve tarihteki etkinliğe uygulanır.':'Size ait bir şablon oluşturun. Hazır şablonların orijinalleri korunur.'}</p></div>
   <div className="form-grid editor-meta"><label>{event?'Etkinlik başlığı':'Şablon adı'}<input required maxLength={140} value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})}/></label><label>Etkinlik kategorisi<input required maxLength={100} value={draft.category} onChange={e=>setDraft({...draft,category:e.target.value})}/></label></div>
   <div className="editor-sections">{draft.sections.map((s,i)=><section className="editor-section" key={s.id}>
    <div className="editor-section-head"><span className="section-number">{String(i+1).padStart(2,'0')}</span><Icon name={SECTION_TYPES.find(t=>t.kind===s.kind)?.icon??'layers'}/><label className="sr-only" htmlFor={`title-${s.id}`}>Bölüm başlığı</label><input id={`title-${s.id}`} aria-label="Bölüm başlığı" value={s.title} required maxLength={100} onChange={e=>changeSection(s.id,{title:e.target.value})}/><button type="button" className="icon-button danger" aria-label={`${s.title} bölümünü sil`} onClick={()=>setDraft({...draft,sections:draft.sections.filter(x=>x.id!==s.id)})}><Icon name="trash" size={18}/></button></div>
    {['book','resources','evaluation'].includes(s.kind)?<div className="placeholder-inline"><Icon name="lock" size={16}/> Bu bölüm deneme sürümünde yalnızca görünüm amaçlıdır.</div>:s.kind==='flow'?<div className="flow-editor">{(s.blocks??[]).map(b=><div className="flow-block" key={b.id}><div className="row"><label className="grow">Alt başlık<input required value={b.title} onChange={e=>changeSection(s.id,{blocks:s.blocks!.map(x=>x.id===b.id?{...x,title:e.target.value}:x)})}/></label><button type="button" className="icon-button danger" aria-label={`${b.title} alt başlığını sil`} onClick={()=>changeSection(s.id,{blocks:s.blocks!.filter(x=>x.id!==b.id)})}><Icon name="trash" size={17}/></button></div><label>Alt başlık içeriği<textarea rows={4} value={b.content} onChange={e=>changeSection(s.id,{blocks:s.blocks!.map(x=>x.id===b.id?{...x,content:e.target.value}:x)})}/></label></div>)}<button type="button" className="button subtle small" onClick={()=>changeSection(s.id,{blocks:[...(s.blocks??[]),{id:uid(),title:'Yeni adım',content:''}]})}><Icon name="plus" size={16}/>Alt başlık ekle</button></div>:<label className="section-textarea"><span className="sr-only">Bölüm içeriği</span><textarea aria-label="Bölüm içeriği" value={s.content} rows={s.kind==='framework'?6:3} placeholder="Bu bölümün içeriğini yazın…" onChange={e=>changeSection(s.id,{content:e.target.value})}/></label>}
   </section>)}</div>
   <div className="add-section"><select aria-label="Eklenecek bölüm" value={kind} onChange={e=>setKind(e.target.value as SectionKind)}>{SECTION_TYPES.map(t=><option key={t.kind} value={t.kind}>{t.title}</option>)}</select><button type="button" className="button secondary" onClick={()=>{const type=SECTION_TYPES.find(t=>t.kind===kind)!;setDraft({...draft,sections:[...draft.sections,{id:uid(),kind,title:type.title,content:'',...(kind==='flow'?{blocks:[]}:{})}]});}}><Icon name="plus" size={18}/>Bölüm ekle</button></div>
   <div className="modal-footer"><button type="button" className="button secondary" onClick={onClose}>Vazgeç</button><button className="button primary" type="submit"><Icon name="check" size={18}/>{event?'Değişiklikleri kaydet':'Şablonu kaydet'}</button></div>
  </form>
 </Modal>;
}
