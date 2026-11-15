import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const copy = {
  id: {
    nav: ['Cara Kerja', 'Contoh Lagu', 'Mulai Membuat'], eyebrow: 'MELESTARIKAN KISAH',
    title: 'Menata Kisah,\ Menjadi Nada.', subtitle: 'Olah Kata dan rasa menjadi Nada istimewa yang bisa dinikmati setiap saat.',
    cta: 'Buat lagu saya', how: 'Dari cerita menjadi melodi', howSub: 'Cukup ceritakan momenmu. Kami bantu menyusunnya menjadi lagu yang bermakna.',
    steps: [['Ceritakan kisahmu','Bagikan kenangan, nama, dan pesan yang ingin disampaikan.'],['Pilih nuansa musik','Tentukan genre, suasana, dan bahasa lagu.'],['Jadikan sebuah lagu','Lirik disusun dengan AI, lalu musik diproduksi melalui layanan musik AI.']],
    formTitle: 'Mari mulai dari ceritamu', formSub: 'Tidak perlu pandai menulis. Ceritakan saja dengan bahasamu sendiri.',
    recipient: 'Lagu ini untuk siapa?', recipientHint: 'Contoh: Ibu, Ayah, pasangan, sahabat, atau diri sendiri', relation: 'Apa hubunganmu dengannya?', occasion: 'Momen apa yang ingin dikenang?', story: 'Ceritakan kisah atau kenanganmu', storyHint: 'Tuliskan peristiwa, kenangan kecil, perjuangan, atau hal yang membuat orang ini istimewa...', genre: 'Genre musik', mood: 'Suasana lagu', lang: 'Bahasa lagu', name: 'Nama panggilan (opsional)', email: 'Email untuk menerima kabar pesanan', next: 'Lanjutkan', back: 'Kembali', submit: 'Buat konsep lirik', note: 'Tahap awal ini membuat konsep lirik. Pembuatan audio akan diaktifkan setelah integrasi penyedia musik.',
    preview: 'Konsep lagu personal', loading: 'Sedang menyusun konsep...', error: 'Belum berhasil membuat konsep. Coba lagi.',
    footer: 'Dibuat dari cerita nyata, untuk dikenang selamanya.', genres: ['Pop akustik','Pop balada','R&B','Folk','Rock lembut','Dangdut pop','Jazz'], moods: ['Hangat dan penuh syukur','Romantis','Mengharukan','Ceria','Nostalgia','Inspiratif'], occasions: ['Ulang tahun','Pernikahan / anniversary','Hari Ibu / Ayah','Wisuda / kelulusan','Persahabatan','Kenangan keluarga','Apresiasi / terima kasih','Lainnya']
  },
  en: {
    nav: ['How It Works', 'Song Examples', 'Create Your Song'], eyebrow: 'MEMORIES WORTH KEEPING',
    title: 'Your story,\nturned into a song.', subtitle: 'Turn your story, gratitude, and special moments into a personal song you can listen to again and again.',
    cta: 'Create my song', how: 'From your story to a melody', howSub: 'Tell us about your moment. We will help shape it into a meaningful song.',
    steps: [['Share your story','Tell us the memories, names, and message you want to express.'],['Choose the sound','Select the genre, mood, and language of your song.'],['Make it a song','AI helps write the lyrics, then a music AI service produces the audio.']],
    formTitle: 'Let’s start with your story', formSub: 'You do not need to be a writer. Just tell it in your own words.',
    recipient: 'Who is this song for?', recipientHint: 'For example: Mom, Dad, partner, friend, or yourself', relation: 'What is your relationship?', occasion: 'What moment would you like to celebrate?', story: 'Tell us the story or memory', storyHint: 'Share an event, a little memory, a journey, or what makes this person special...', genre: 'Music genre', mood: 'Song mood', lang: 'Song language', name: 'Your name (optional)', email: 'Email for order updates', next: 'Continue', back: 'Back', submit: 'Create lyric concept', note: 'This first version creates a lyric concept. Audio generation will be enabled after connecting a music provider.',
    preview: 'Your song concept', loading: 'Creating your concept...', error: 'Could not create the concept. Please try again.',
    footer: 'Made from real stories, to be remembered forever.', genres: ['Acoustic pop','Pop ballad','R&B','Folk','Soft rock','Pop dangdut','Jazz'], moods: ['Warm and grateful','Romantic','Moving','Joyful','Nostalgic','Inspirational'], occasions: ['Birthday','Wedding / anniversary','Mother’s / Father’s Day','Graduation','Friendship','Family memories','Appreciation / gratitude','Other']
  }
};
const blank = { recipient:'', relation:'', occasion:'', story:'', genre:'Pop akustik', mood:'Hangat dan penuh syukur', songLanguage:'Indonesia', name:'', email:'' };
function App() {
  const [lang,setLang] = useState('id'); const t = copy[lang];
  const [step,setStep] = useState(0); const [data,setData] = useState(blank); const [result,setResult] = useState(''); const [busy,setBusy] = useState(false); const [error,setError] = useState('');
  const update = (key,value) => setData(old=>({...old,[key]:value}));
  const valid = useMemo(()=> step===0 ? data.recipient.trim() && data.relation.trim() && data.occasion : data.story.trim().length>=20, [step,data]);
  async function generate() {
    setBusy(true); setError(''); setResult('');
    try {
      const response = await fetch('/api/lyrics', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({...data, uiLanguage:lang}) });
      const payload = await response.json(); if (!response.ok) throw new Error(payload.error || 'Request failed');
      setResult(payload.lyrics || ''); setStep(2);
    } catch(e) { setError(t.error + ' (' + e.message + ')'); }
    finally { setBusy(false); }
  }
  const goForm = () => { setStep(0); document.getElementById('create')?.scrollIntoView({behavior:'smooth'}); };
  return <>
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark">♫</span><span>Cerita<span className="brand-accent">Jadi</span>Nada</span></a><nav><a href="#how">{t.nav[0]}</a><a href="#how">{t.nav[1]}</a></nav><div className="top-actions"><div className="language"><button className={lang==='id'?'chosen':''} onClick={()=>setLang('id')}>ID</button><button className={lang==='en'?'chosen':''} onClick={()=>setLang('en')}>EN</button></div><button className="button button-small" onClick={goForm}>{t.nav[2]} <span>↗</span></button></div></header>
    <main id="top"><section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot"></span>{t.eyebrow}</div><h1>{t.title.split('\n').map((s,i)=><React.Fragment key={s}>{i>0&&<br/>}{s}</React.Fragment>)}</h1><p>{t.subtitle}</p><button className="button button-large" onClick={goForm}>{t.cta} <span>→</span></button><div className="hero-proof"><span>✦</span> Personal • Meaningful • Yours</div></div><div className="hero-art"><div className="orb orb-one"></div><div className="orb orb-two"></div><div className="record"><div className="record-groove"></div><div className="record-label"><span>♫</span><small>YOUR STORY</small></div></div><div className="floating-note note-a">♪</div><div className="floating-note note-b">♫</div><div className="soundwave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div className="art-caption">A song made just for you</div></div></section>
    <section className="how section" id="how"><div className="section-heading"><div className="eyebrow">SIMPLE, PERSONAL, MEANINGFUL</div><h2>{t.how}</h2><p>{t.howSub}</p></div><div className="steps">{t.steps.map((s,i)=><article className="step-card" key={s[0]}><div className="step-number">0{i+1}</div><div className="step-icon">{['✎','♫','♡'][i]}</div><h3>{s[0]}</h3><p>{s[1]}</p></article>)}</div></section>
    <section className="create-section section" id="create"><div className="create-intro"><div className="eyebrow">LET’S CREATE SOMETHING BEAUTIFUL</div><h2>{t.formTitle}</h2><p>{t.formSub}</p><div className="mini-quote">“Some moments deserve more than words.”</div></div><div className="form-card"><div className="form-top"><div><span className="form-kicker">KISAHJADILAGU STUDIO</span><h3>{step===2?t.preview:t.formTitle}</h3></div>{step!==2&&<span className="step-count">{step+1} / 2</span>}</div>{step!==2&&<div className="progress"><span style={{width:step===0?'50%':'100%'}}></span></div>}
      {step===0&&<div className="fields"><label>{t.recipient}<input value={data.recipient} onChange={e=>update('recipient',e.target.value)} placeholder={t.recipientHint}/></label><label>{t.relation}<input value={data.relation} onChange={e=>update('relation',e.target.value)} placeholder={lang==='id'?'Contoh: anak, pasangan, sahabat':'e.g. child, partner, friend'}/></label><label>{t.occasion}<select value={data.occasion} onChange={e=>update('occasion',e.target.value)}><option value="">{lang==='id'?'Pilih momen':'Choose a moment'}</option>{t.occasions.map(x=><option key={x}>{x}</option>)}</select></label><label>{t.name}<input value={data.name} onChange={e=>update('name',e.target.value)} placeholder={lang==='id'?'Nama Anda':'Your name'}/></label><div className="form-buttons"><button className="button" disabled={!valid} onClick={()=>setStep(1)}>{t.next} →</button></div></div>}
      {step===1&&<div className="fields"><label>{t.story}<textarea rows="5" value={data.story} onChange={e=>update('story',e.target.value)} placeholder={t.storyHint}/><small className="hint">{lang==='id'?'Minimal 20 karakter. Detail kecil membuat lagu lebih personal.':'At least 20 characters. Small details make a song more personal.'}</small></label><div className="field-grid"><label>{t.genre}<select value={data.genre} onChange={e=>update('genre',e.target.value)}>{t.genres.map(x=><option key={x}>{x}</option>)}</select></label><label>{t.mood}<select value={data.mood} onChange={e=>update('mood',e.target.value)}>{t.moods.map(x=><option key={x}>{x}</option>)}</select></label></div><label>{t.lang}<select value={data.songLanguage} onChange={e=>update('songLanguage',e.target.value)}><option>Indonesia</option><option>English</option><option>{lang==='id'?'Campuran Indonesia-Inggris':'Indonesian-English mix'}</option></select></label><label>{t.email}<input type="email" value={data.email} onChange={e=>update('email',e.target.value)} placeholder="nama@email.com"/></label><div className="form-buttons"><button className="button button-ghost" onClick={()=>setStep(0)}>← {t.back}</button><button className="button" disabled={!valid||busy} onClick={generate}>{busy?t.loading:t.submit} →</button></div>{error&&<p className="error">{error}</p>}<p className="notice">ⓘ {t.note}</p></div>}
      {step===2&&<div className="result"><div className="result-symbol">♫</div><pre>{result}</pre><p className="notice">{t.note}</p><div className="form-buttons"><button className="button button-ghost" onClick={()=>setStep(1)}>{lang==='id'?'Edit cerita':'Edit story'}</button><button className="button" onClick={()=>{setStep(0);setData(blank);setResult('')}}>{lang==='id'?'Buat lagu lain':'Create another song'}</button></div></div>}
    </div></section></main><footer><a className="brand" href="#top"><span className="brand-mark">♫</span><span>Kisah<span className="brand-accent">Jadi</span>Lagu</span></a><p>{t.footer}</p><small>© {new Date().getFullYear()} KisahJadiLagu</small></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
