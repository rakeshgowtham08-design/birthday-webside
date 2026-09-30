function go(n){
  document.querySelectorAll('.scene').forEach(s=>s.classList.remove('active'));
  document.getElementById('scene'+n).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  if(n===8){ burstConfetti(); }
}
let popped=0;
// twinkling starfield
function makeStars(n){
  for(let i=0;i<n;i++){
    const s=document.createElement('div');
    s.className='star';
    const size=1+Math.random()*2.5;
    s.style.width=size+'px';s.style.height=size+'px';
    s.style.left=Math.random()*100+'vw';
    s.style.top=Math.random()*100+'vh';
    s.style.animationDuration=(1.5+Math.random()*2.5)+'s';
    s.style.animationDelay=(Math.random()*3)+'s';
    document.body.appendChild(s);
  }
}
makeStars(45);

// ambient scattered confetti bits (static, like the reference screenshot)
function makeAmbientConfetti(n){
  const shapes=['dot','dash','star'];
  const colors=['#ffb6cf','#ffd166','#ffc2d4','#f6a3c4','#e6a4c4'];
  for(let i=0;i<n;i++){
    const el=document.createElement('div');
    const shape=shapes[Math.floor(Math.random()*shapes.length)];
    el.style.position='fixed';el.style.zIndex='0';el.style.pointerEvents='none';
    el.style.left=Math.random()*100+'vw';el.style.top=Math.random()*100+'vh';
    el.style.opacity=(0.25+Math.random()*0.4).toFixed(2);
    const c=colors[Math.floor(Math.random()*colors.length)];
    if(shape==='dot'){el.style.width=el.style.height=(4+Math.random()*5)+'px';el.style.borderRadius='50%';el.style.background=c;}
    else if(shape==='dash'){el.style.width='3px';el.style.height=(14+Math.random()*10)+'px';el.style.background=c;el.style.borderRadius='2px';el.style.transform='rotate('+(Math.random()*360)+'deg)';}
    else{el.innerHTML='★';el.style.color=c;el.style.fontSize=(10+Math.random()*8)+'px';}
    document.body.appendChild(el);
  }
}
makeAmbientConfetti(35);

function yesClick(btn,e){
  startMusic();
  btn.classList.remove('fluffy');
  void btn.offsetWidth; // restart animation
  btn.classList.add('fluffy');
  const r=btn.getBoundingClientRect();
  sparkBurst(r.left+r.width/2,r.top+r.height/2,14);
  setTimeout(()=>go(1),450);
}

// playful runaway "No" button
function dodge(btn){
  const pad=60;
  const x=Math.random()*(window.innerWidth-pad*2)+pad-window.innerWidth/2;
  const y=Math.random()*(window.innerHeight-pad*2)+pad-window.innerHeight/2;
  btn.style.position='relative';
  btn.style.transition='transform .35s ease';
  btn.style.transform=`translate(${x*0.5}px,${y*0.3}px)`;
}

// sparkle burst at a point
const sparkGlyphs=["✨","💫","⭐","💗","🌸"];
function sparkBurst(x,y,count=10){
  for(let i=0;i<count;i++){
    const el=document.createElement('div');
    el.className='spark';
    el.textContent=sparkGlyphs[Math.floor(Math.random()*sparkGlyphs.length)];
    el.style.left=x+'px';el.style.top=y+'px';
    const angle=Math.random()*2*Math.PI;
    const dist=40+Math.random()*70;
    el.style.setProperty('--dx',(Math.cos(angle)*dist)+'px');
    el.style.setProperty('--dy',(Math.sin(angle)*dist)+'px');
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),950);
  }
}

// balloon pop with sparkle burst + live word reveal
const balloonWords=["You","make","my life","beautiful ✨"];
document.querySelectorAll('.balloon').forEach(b=>{
  b.addEventListener('click',(e)=>{
    if(b.classList.contains('popped'))return;
    sparkBurst(e.clientX,e.clientY,12);
    b.classList.add('popped');
    const word=document.createElement('span');
    word.textContent=balloonWords[popped];
    document.getElementById('liveWords').appendChild(word);
    popped++;
    if(popped>=4){ setTimeout(()=>go(2),900); }
  });
});

// reason icons with small sparkle
document.querySelectorAll('.icon-btn').forEach(ic=>{
  ic.addEventListener('click',(e)=>{
    document.getElementById('reasonText').innerText = ic.dataset.r;
    ic.classList.add('used');
    const r=ic.getBoundingClientRect();
    sparkBurst(r.left+r.width/2,r.top+r.height/2,8);
  });
});

function openEnvelope(el){
  if(el.classList.contains('open'))return;
  el.classList.add('open');
  const r=el.getBoundingClientRect();
  sparkBurst(r.left+r.width/2,r.top,14);
  setTimeout(()=>go(6),700);
}
function openGift(el,e){
  if(el.classList.contains('shake'))return;
  el.classList.add('shake');
  setTimeout(()=>{
    sparkBurst(e.clientX,e.clientY,20);
    setTimeout(()=>go(8),350);
  },500);
}
// ambient floating hearts
const heartEmojis=["💗","💕","💖","💞","🌸","✨"];
function createHeart(){
  try{
    const h=document.createElement('div');
    h.className='heart';
    h.innerHTML=heartEmojis[Math.floor(Math.random()*heartEmojis.length)];
    h.style.left=Math.random()*100+'vw';
    h.style.fontSize=(14+Math.random()*20)+'px';
    h.style.animationDuration=(6+Math.random()*6)+'s';
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),13000);
  }catch(e){}
}
setInterval(createHeart,600);
function burstConfetti(){
  const colors=['#ff8fa8','#ffd166','#a3d8f4','#c9a3f4','#ff5f83'];
  for(let i=0;i<40;i++){
    setTimeout(()=>{
      try{
        const c=document.createElement('div');
        c.className='confetti';
        c.style.left=Math.random()*100+'vw';
        c.style.width='8px';c.style.height='8px';
        c.style.background=colors[Math.floor(Math.random()*colors.length)];
        c.style.borderRadius=Math.random()>0.5?'50%':'2px';
        c.style.animationDuration=(3+Math.random()*2)+'s';
        document.body.appendChild(c);
        setTimeout(()=>c.remove(),6000);
      }catch(e){}
    },i*40);
  }
}

/* ================= BACKGROUND MUSIC ================= */
// Optional: to use your own song in the VS Code version, put an mp3 in the
// project folder (e.g. music.mp3) and set:  const CUSTOM_MUSIC = 'music.mp3';
// To use "Tum Jo Aaye" (or any song), add your own legally-obtained mp3 file
// named tum-jo-aaye.mp3 inside the /music folder next to this script.
const CUSTOM_MUSIC = 'music/tum-jo-aaye.mp3';

let actx=null, master=null, delayNode=null, audioEl=null, musicOn=false, musicStarted=false, nextTime=0, stepIdx=0;
const STEP=60/78/2; // eighth-note length (~78 bpm, dreamy and slow)
const chords=[
  [261.63,329.63,392.00,523.25], // C
  [220.00,261.63,329.63,440.00], // Am
  [349.23,440.00,523.25,698.46], // F
  [196.00,246.94,293.66,392.00]  // G
];
const bassNotes=[65.41,55.00,87.31,49.00];
const arpPattern=[0,1,2,3,2,1,2,1];
const melody=[[659.25,783.99],[659.25,587.33],[523.25,698.46],[587.33,493.88]];

function playNote(freq,time,dur,type,vol){
  const o=actx.createOscillator(), g=actx.createGain();
  o.type=type; o.frequency.value=freq;
  g.gain.setValueAtTime(0.0001,time);
  g.gain.linearRampToValueAtTime(vol,time+0.01);
  g.gain.exponentialRampToValueAtTime(0.0001,time+dur);
  o.connect(g); g.connect(master); g.connect(delayNode);
  o.start(time); o.stop(time+dur+0.05);
}
function scheduleMusic(){
  if(!actx) return;
  while(nextTime < actx.currentTime+0.4){
    const bar=Math.floor(stepIdx/8)%4, s=stepIdx%8;
    playNote(chords[bar][arpPattern[s]],nextTime,1.6,'triangle',0.15);
    if(s===0) playNote(bassNotes[bar],nextTime,3.2,'sine',0.22);
    if(s===0||s===4) playNote(melody[bar][s/4],nextTime,1.8,'sine',0.12);
    nextTime+=STEP; stepIdx++;
  }
  setTimeout(scheduleMusic,100);
}
function setMusicIcon(){
  const b=document.getElementById('musicBtn');
  if(b) b.textContent = musicOn ? '🔊' : '🔇';
}
function startSynthMusic(){
  const AC=window.AudioContext||window.webkitAudioContext;
  actx=new AC();
  master=actx.createGain(); master.gain.value=0;
  master.connect(actx.destination);
  // soft echo for a dreamy feel
  delayNode=actx.createDelay(); delayNode.delayTime.value=0.3;
  const fb=actx.createGain(); fb.gain.value=0.35;
  const wet=actx.createGain(); wet.gain.value=0.3;
  delayNode.connect(fb); fb.connect(delayNode);
  delayNode.connect(wet); wet.connect(master);
  master.gain.setTargetAtTime(0.6,actx.currentTime,0.8); // gentle fade-in
  nextTime=actx.currentTime+0.1; stepIdx=0;
  scheduleMusic();
  musicOn=true;
  setMusicIcon();
}
function startMusic(){
  if(musicStarted) return;
  musicStarted=true;
  try{
    if(CUSTOM_MUSIC){
      audioEl=new Audio(CUSTOM_MUSIC); audioEl.loop=true; audioEl.volume=0.6;
      audioEl.addEventListener('error',()=>{ audioEl=null; startSynthMusic(); }); // file missing -> fallback
      audioEl.play().then(()=>{ musicOn=true; setMusicIcon(); }).catch(()=>{ audioEl=null; startSynthMusic(); });
      return;
    }else{
      startSynthMusic();
    }
    musicOn=true;
  }catch(e){ musicOn=false; }
  setMusicIcon();
}
function toggleMusic(){
  if(!musicStarted){ startMusic(); return; }
  if(musicOn){
    if(audioEl) audioEl.pause(); else master.gain.setTargetAtTime(0,actx.currentTime,0.15);
    musicOn=false;
  }else{
    if(audioEl) audioEl.play().catch(()=>{});
    else { actx.resume(); master.gain.setTargetAtTime(0.6,actx.currentTime,0.3); }
    musicOn=true;
  }
  setMusicIcon();
}

