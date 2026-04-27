import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import VeloraLogo from '../components/VeloraLogo'
import BodyViewer3D from '../components/BodyViewer3D'

const TOTAL_STEPS = 9

const GOALS = ['Lose Weight', 'Build Muscle', 'Maintain FIT', 'Athletic Performance', 'Improve Health']
const TARGETS = ['Full Body', 'Chest', 'Arms', 'Abs', 'Legs', 'Back', 'Shoulders']
const LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCE']
const MOTIVATIONS = ['Heart Broken', 'Influence', 'Improve Health', 'Sports', 'Crush', 'Self Confidence', 'Competition']
const WORKOUTS = ['Weight Training', 'Cardio', 'HIIT', 'Calisthenics', 'Yoga', 'Mixed']

const INFLUENCER_MAP = {
  'Build Muscle': { name: 'David Laid', tag: 'Natural Bodybuilder · 6\'2" · 190lbs', match: '94%' },
  'Lose Weight': { name: 'Chris Heria', tag: 'Calisthenics · Fat Loss Expert', match: '91%' },
  'Athletic Performance': { name: 'Jeff Nippard', tag: 'Science-Based Athlete', match: '89%' },
  'Maintain FIT': { name: 'Mike Thurston', tag: 'Lifestyle Fitness · Balance', match: '87%' },
  'Improve Health': { name: 'Sarah Ramadan', tag: 'Wellness & Strength', match: '92%' },
}

const GOAL_INFO = {
  'Lose Weight': 'Focus on caloric deficit, cardio endurance, and HIIT training to shed fat while preserving lean muscle.',
  'Build Muscle': 'Progressive overload, high protein intake, and compound lifts are key to hypertrophy and mass gain.',
  'Maintain FIT': 'A balanced routine of strength + cardio to maintain physique and general fitness performance.',
  'Athletic Performance': 'Power, agility, and sport-specific conditioning to elevate your athletic output.',
  'Improve Health': 'Holistic wellness: mobility, heart health, energy systems, and sustainable movement habits.',
}

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [activeField, setActiveField] = useState(null)
  const [showCinematic, setShowCinematic] = useState(false)
  const [data, setData] = useState({
    gender: '', targetArea: [], goals: [], level: '',
    motivation: [], workoutType: '',
    healthRisk: '', weight: '', height: '', targetWeight: '',
    age: '', occupation: '',
    chest: '', waist: '', hips: '', shoulderWidth: '',
    armLength: '', legLength: '', neckCirc: '', thighCirc: '', calfCirc: '',
    waistToHip: '', bodyFat: '',
    name: '', email: '',
    consent: false,
  })
  const { updateUser } = useAuth()
  const nav = useNavigate()

  const set = (k, v) => setData(p => ({ ...p, [k]: v }))
  const toggle = (k, v) => setData(p => ({
    ...p, [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v],
  }))

  const next = () => setStep(s => Math.min(s + 1, TOTAL_STEPS))
  const back = () => setStep(s => Math.max(s - 1, 0))

  const finish = () => {
    updateUser({ onboardingDone: true, fitnessProfile: data })
    nav('/home')
  }

  const show3D = step >= 1
  const measurements = {
    height: data.height, weight: data.weight, chest: data.chest,
    waist: data.waist, hips: data.hips, thighCirc: data.thighCirc,
    calfCirc: data.calfCirc, shoulderWidth: data.shoulderWidth,
    armLength: data.armLength, legLength: data.legLength,
  }
  const progress = (step / TOTAL_STEPS) * 100

  const inp = (label, key, placeholder, type = 'text', unit = '') => (
    <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{ fontSize: 12, color: '#666', fontFamily: 'DM Sans', letterSpacing: 0.5 }}>
        {label}{unit && <span style={{ color: '#444', marginLeft: 4 }}>({unit})</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={data[key]}
        onFocus={() => setActiveField(key)}
        onBlur={() => setActiveField(null)}
        onChange={e => set(key, e.target.value)}
        style={{
          background: '#0d0d0d', border: '1px solid #2a2a2a', padding: '10px 13px',
          borderRadius: 8, color: '#ddd', fontSize: 14, fontFamily: 'DM Sans', outline: 'none',
        }}
      />
    </div>
  )

  const pill = (label, active, onClick) => (
    <button key={label} onClick={onClick} style={{
      padding: '9px 16px', borderRadius: 8, fontSize: 13, fontFamily: 'DM Sans',
      background: active ? '#c9a84c' : '#111',
      color: active ? '#0a0a0a' : '#666',
      border: `1px solid ${active ? '#c9a84c' : '#1e1e1e'}`,
      cursor: 'pointer', transition: 'all 0.2s', fontWeight: active ? 700 : 400,
    }}>{label}</button>
  )

  const radio = (label, active, onClick, info) => (
    <div key={label}>
      <button onClick={onClick} style={{
        width: '100%', padding: '13px 16px', borderRadius: 10, fontSize: 15, fontFamily: 'Syne', fontWeight: 600,
        background: active ? 'rgba(201,168,76,0.12)' : '#111',
        color: active ? '#c9a84c' : '#666',
        border: `1px solid ${active ? '#c9a84c' : '#1e1e1e'}`,
        cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span>{label}</span>
        {active && <span style={{ fontSize: 11, color: '#c9a84c88', fontFamily: 'DM Sans', fontWeight: 400 }}>Selected</span>}
      </button>
      {active && info && (
        <div style={{
          marginTop: 6, padding: '10px 14px', background: '#0d0d0d', borderRadius: 8,
          border: '1px solid #1a1a1a', fontSize: 12, color: '#666', fontFamily: 'DM Sans', lineHeight: 1.6,
        }}>{info}</div>
      )}
    </div>
  )

  const matchedInfluencer = INFLUENCER_MAP[data.goals?.[0]] || INFLUENCER_MAP['Build Muscle']

  const steps = [
    {
      title: 'Welcome to Velora',
      subtitle: 'Your fitness journey begins here',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ textAlign: 'center' }}><VeloraLogo size={48} showText={false} /></div>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 18 }}>
            <h3 style={{ fontFamily: 'Syne', fontSize: 15, marginBottom: 8, color: '#c9a84c' }}>Why we collect your data</h3>
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7 }}>
              Velora uses your body measurements and fitness preferences to build a truly personalized experience —
              from matching you with influencers who share your physique to recommending workouts tailored to your goals.
              Your data is never shared without your consent.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { icon: '📏', text: 'Detailed body measurements' },
              { icon: '🎯', text: 'Goal-based recommendations' },
              { icon: '👥', text: 'Influencer matching' },
              { icon: '🔒', text: 'Your data stays private' },
            ].map(i => (
              <div key={i.text} style={{
                background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 10,
                padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 18 }}>{i.icon}</span>
                <span style={{ fontSize: 12, color: '#777', fontFamily: 'DM Sans' }}>{i.text}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Basic Profile',
      subtitle: 'Tell us about yourself',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {inp('Full Name', 'name', 'Your full name')}
          {inp('Email', 'email', 'your@email.com', 'email')}
          {inp('Age', 'age', 'e.g. 24', 'number')}
          {inp('Occupation', 'occupation', 'e.g. Student, Athlete, Engineer')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <label style={{ fontSize: 12, color: '#666', fontFamily: 'DM Sans' }}>Gender</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {['Male', 'Female', 'Prefer not to say'].map(g => (
                <button key={g} onClick={() => set('gender', g)} style={{
                  flex: 1, padding: '11px 8px', borderRadius: 8, fontSize: 13, fontFamily: 'DM Sans',
                  background: data.gender === g ? 'rgba(201,168,76,0.15)' : '#111',
                  color: data.gender === g ? '#c9a84c' : '#666',
                  border: `1px solid ${data.gender === g ? '#c9a84c' : '#1e1e1e'}`,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>{g}</button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Body Metrics',
      subtitle: 'Type your measurements — watch the model update in real-time',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {inp('Height', 'height', 'e.g. 175', 'number', 'cm')}
            {inp('Weight', 'weight', 'e.g. 75', 'number', 'kg')}
            {inp('Target Weight', 'targetWeight', 'e.g. 80', 'number', 'kg')}
            {inp('Body Fat %', 'bodyFat', 'e.g. 15', 'number', '%')}
          </div>
          <div style={{ height: 1, background: '#151515', margin: '2px 0' }} />
          <p style={{ fontSize: 11, color: '#444', fontFamily: 'DM Sans', letterSpacing: 0.5 }}>CIRCUMFERENCE MEASUREMENTS</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {inp('Chest', 'chest', 'e.g. 100', 'number', 'cm')}
            {inp('Waist', 'waist', 'e.g. 80', 'number', 'cm')}
            {inp('Hips', 'hips', 'e.g. 95', 'number', 'cm')}
            {inp('Neck', 'neckCirc', 'e.g. 38', 'number', 'cm')}
            {inp('Thigh', 'thighCirc', 'e.g. 55', 'number', 'cm')}
            {inp('Calf', 'calfCirc', 'e.g. 38', 'number', 'cm')}
          </div>
        </div>
      ),
    },
    {
      title: 'Advanced Measurements',
      subtitle: 'Specialized metrics for precise influencer matching',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {inp('Shoulder Width', 'shoulderWidth', 'e.g. 48', 'number', 'cm')}
            {inp('Arm Length', 'armLength', 'e.g. 60', 'number', 'cm')}
            {inp('Leg Length', 'legLength', 'e.g. 90', 'number', 'cm')}
            {inp('Waist-to-Hip Ratio', 'waistToHip', 'e.g. 0.85', 'number')}
          </div>
          <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 10, padding: '12px 14px', marginTop: 4 }}>
            <p style={{ fontSize: 12, color: '#555', lineHeight: 1.6 }}>
              💡 <strong style={{ color: '#666' }}>Tip:</strong> These measurements help us match you with influencers who have a similar body frame (75–90% similarity).
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Choose Your Focus',
      subtitle: 'Select target muscle groups — watch the model react',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
            {TARGETS.map(t => (
              <button key={t} onClick={() => toggle('targetArea', t)} style={{
                padding: '9px 16px', borderRadius: 8, fontSize: 13, fontFamily: 'DM Sans',
                background: data.targetArea.includes(t) ? '#c9a84c' : '#111',
                color: data.targetArea.includes(t) ? '#0a0a0a' : '#666',
                border: `1px solid ${data.targetArea.includes(t) ? '#c9a84c' : '#1e1e1e'}`,
                cursor: 'pointer', transition: 'all 0.2s', fontWeight: data.targetArea.includes(t) ? 700 : 400,
                boxShadow: data.targetArea.includes(t) ? '0 0 14px rgba(201,168,76,0.4)' : 'none',
              }}>{t}</button>
            ))}
          </div>
          {data.targetArea.length > 0 && (
            <p style={{ fontSize: 12, color: '#555', fontFamily: 'DM Sans' }}>
              {data.targetArea.length} area{data.targetArea.length > 1 ? 's' : ''} selected — model highlighting active
            </p>
          )}
        </div>
      ),
    },
    {
      title: 'Fitness Goals',
      subtitle: 'What are your main goals?',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {GOALS.map(g => radio(g, data.goals.includes(g), () => toggle('goals', g), GOAL_INFO[g]))}
        </div>
      ),
    },
    {
      title: 'Your Level',
      subtitle: 'What is your current fitness level?',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {LEVELS.map(l => radio(l, data.level === l, () => set('level', l)))}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginTop: 14 }}>
            <p style={{ width: '100%', fontSize: 11, color: '#555', fontFamily: 'DM Sans', letterSpacing: 0.5 }}>PREFERRED WORKOUT STYLE</p>
            {WORKOUTS.map(w => pill(w, data.workoutType === w, () => set('workoutType', w)))}
          </div>
        </div>
      ),
    },
    {
      title: 'What Motivates You?',
      subtitle: 'Select all that apply',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
            {MOTIVATIONS.map(m => pill(m, data.motivation.includes(m), () => toggle('motivation', m)))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
            <label style={{ fontSize: 12, color: '#666', fontFamily: 'DM Sans' }}>Health Risk — Any injury or joint issues?</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {['None', 'Yes'].map(v => (
                <button key={v} onClick={() => set('healthRisk', v)} style={{
                  flex: 1, padding: '12px', borderRadius: 10, fontSize: 14, fontFamily: 'Syne', fontWeight: 700,
                  background: data.healthRisk === v ? (v === 'Yes' ? 'rgba(224,82,82,0.12)' : 'rgba(201,168,76,0.12)') : '#111',
                  color: data.healthRisk === v ? (v === 'Yes' ? '#e05252' : '#c9a84c') : '#666',
                  border: `1px solid ${data.healthRisk === v ? (v === 'Yes' ? '#e05252' : '#c9a84c') : '#1e1e1e'}`,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>{v.toUpperCase()}</button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Consent & Privacy',
      subtitle: 'Review how your data will be used',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { title: 'Personalization', desc: 'Your measurements and goals power your personalized feed, influencer matches, and workout recommendations.' },
            { title: 'Community Features', desc: 'Your profile stats (not raw measurements) may appear in community leaderboards and matching systems.' },
            { title: 'No Third-Party Sales', desc: 'Velora never sells your personal data to advertisers or third parties.' },
          ].map(i => (
            <div key={i.title} style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 10, padding: '14px 16px' }}>
              <h4 style={{ fontFamily: 'Syne', fontSize: 13, color: '#c9a84c', marginBottom: 5 }}>{i.title}</h4>
              <p style={{ fontSize: 12, color: '#555', lineHeight: 1.6 }}>{i.desc}</p>
            </div>
          ))}
          <label style={{
            display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
            padding: '14px 16px', background: '#111', border: '1px solid #1e1e1e', borderRadius: 10,
          }}>
            <input type="checkbox" checked={data.consent} onChange={e => set('consent', e.target.checked)}
              style={{ width: 17, height: 17, accentColor: '#c9a84c', cursor: 'pointer' }} />
            <span style={{ fontSize: 13, color: '#888', lineHeight: 1.5 }}>
              I agree to Velora's <span style={{ color: '#c9a84c' }}>Privacy Policy</span> and consent to the use of my fitness data as described above.
            </span>
          </label>
        </div>
      ),
    },
  ]

  const isReview = step === TOTAL_STEPS

  if (showCinematic) {
    return (
      <div style={{
        minHeight: '100vh', background: '#050505', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '40px 24px',
        animation: 'fadeIn 0.8s ease',
      }}>
        <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div style={{ width: '100%', maxWidth: 1100, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
          <div style={{ height: 520, position: 'relative', background: '#0a0a0a', borderRadius: 20, border: '1px solid #1a1a1a', overflow: 'hidden' }}>
            <BodyViewer3D measurements={measurements} focusAreas={data.targetArea} gender={data.gender} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 24px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.95))',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                {[
                  { label: 'Height', value: data.height ? `${data.height}cm` : '—' },
                  { label: 'Weight', value: data.weight ? `${data.weight}kg` : '—' },
                  { label: 'Body Fat', value: data.bodyFat ? `${data.bodyFat}%` : '—' },
                  { label: 'Chest', value: data.chest ? `${data.chest}cm` : '—' },
                  { label: 'Waist', value: data.waist ? `${data.waist}cm` : '—' },
                  { label: 'Hips', value: data.hips ? `${data.hips}cm` : '—' },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontFamily: 'Syne', fontWeight: 700, color: '#c9a84c' }}>{s.value}</div>
                    <div style={{ fontSize: 10, color: '#444', fontFamily: 'DM Sans', letterSpacing: 0.5, marginTop: 2 }}>{s.label.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <div style={{ fontSize: 11, color: '#555', fontFamily: 'DM Sans', letterSpacing: 2, marginBottom: 8 }}>YOUR VELORA PROFILE</div>
              <h1 style={{ fontFamily: 'Syne', fontSize: 28, fontWeight: 800, marginBottom: 4, color: '#fff' }}>{data.name || 'Athlete'}</h1>
              <p style={{ color: '#555', fontSize: 13, fontFamily: 'DM Sans' }}>{data.level} · {data.occupation || 'Fitness Enthusiast'}</p>
            </div>

            <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 14, padding: '16px 18px' }}>
              <div style={{ fontSize: 11, color: '#555', fontFamily: 'DM Sans', letterSpacing: 1.5, marginBottom: 12 }}>MATCHED INFLUENCER</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #c9a84c, #8a5c1a)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, fontFamily: 'Syne', fontWeight: 800, color: '#0a0a0a',
                }}>{matchedInfluencer.name[0]}</div>
                <div>
                  <div style={{ fontFamily: 'Syne', fontSize: 16, fontWeight: 700, color: '#fff' }}>{matchedInfluencer.name}</div>
                  <div style={{ fontSize: 12, color: '#666', fontFamily: 'DM Sans' }}>{matchedInfluencer.tag}</div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ fontSize: 22, fontFamily: 'Syne', fontWeight: 800, color: '#c9a84c' }}>{matchedInfluencer.match}</div>
                  <div style={{ fontSize: 10, color: '#555', fontFamily: 'DM Sans' }}>MATCH</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Primary Goal', value: data.goals[0] || '—' },
                { label: 'Workout Style', value: data.workoutType || '—' },
                { label: 'Focus Areas', value: data.targetArea.slice(0, 2).join(', ') || '—' },
                { label: 'Health Risk', value: data.healthRisk || '—' },
              ].map(f => (
                <div key={f.label} style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 10, color: '#444', fontFamily: 'DM Sans', letterSpacing: 1, marginBottom: 4 }}>{f.label.toUpperCase()}</div>
                  <div style={{ fontSize: 13, color: '#ccc', fontFamily: 'DM Sans' }}>{f.value}</div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 14, padding: '14px 18px' }}>
              <div style={{ fontSize: 11, color: '#c9a84c88', fontFamily: 'DM Sans', letterSpacing: 1.5, marginBottom: 6 }}>YOUR MOTIVATION</div>
              <p style={{ fontSize: 13, color: '#888', fontFamily: 'DM Sans', lineHeight: 1.6 }}>
                {data.motivation.length > 0 ? data.motivation.join(' · ') : 'Pure dedication'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowCinematic(false)} style={{
                padding: '12px 20px', borderRadius: 10, background: 'transparent',
                border: '1px solid #2a2a2a', color: '#666', fontFamily: 'Syne', fontWeight: 600,
                fontSize: 14, cursor: 'pointer',
              }}>← Edit</button>
              <button onClick={finish} disabled={!data.consent} style={{
                flex: 1, padding: '13px', borderRadius: 10,
                background: data.consent ? 'linear-gradient(135deg, #c9a84c, #e8c46a)' : '#1a1a1a',
                color: data.consent ? '#0a0a0a' : '#444',
                border: 'none', fontFamily: 'Syne', fontWeight: 800, fontSize: 15,
                cursor: data.consent ? 'pointer' : 'not-allowed',
                boxShadow: data.consent ? '0 0 24px rgba(201,168,76,0.3)' : 'none',
              }}>Enter Velora ✦</button>
            </div>
            {!data.consent && (
              <p style={{ textAlign: 'center', color: '#444', fontSize: 12, fontFamily: 'DM Sans' }}>
                Go back to Step 9 and accept the consent form to continue.
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', overflow: 'hidden' }}>
      <div style={{
        flex: 1, maxWidth: show3D ? '52%' : '100%', overflowY: 'auto',
        padding: '36px 32px', transition: 'max-width 0.6s ease',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <div style={{ width: '100%', maxWidth: 480 }}>
          <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <VeloraLogo size={32} textSize={15} />
            <span style={{ color: '#444', fontSize: 12, fontFamily: 'DM Sans' }}>
              {isReview ? 'Review' : `${step + 1} / ${TOTAL_STEPS}`}
            </span>
          </div>

          <div style={{ height: 2, background: '#141414', borderRadius: 2, marginBottom: 30, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${isReview ? 100 : progress}%`,
              background: 'linear-gradient(90deg, #c9a84c, #e8c46a)',
              borderRadius: 2, transition: 'width 0.4s ease',
              boxShadow: '0 0 8px rgba(201,168,76,0.5)',
            }} />
          </div>

          {!isReview ? (
            <div>
              <h2 style={{ fontFamily: 'Syne', fontSize: 24, fontWeight: 700, marginBottom: 5, color: '#fff' }}>
                {steps[step].title}
              </h2>
              <p style={{ color: '#555', fontSize: 13, marginBottom: 24, fontFamily: 'DM Sans' }}>
                {steps[step].subtitle}
              </p>
              {steps[step].content}
              <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
                {step > 0 && (
                  <button onClick={back} style={{
                    padding: '12px 22px', borderRadius: 10, background: 'transparent',
                    border: '1px solid #2a2a2a', color: '#666', fontFamily: 'Syne', fontWeight: 600,
                    fontSize: 14, cursor: 'pointer',
                  }}>Back</button>
                )}
                <button onClick={next} style={{
                  flex: 1, padding: '13px', borderRadius: 10,
                  background: 'linear-gradient(135deg, #c9a84c, #e8c46a)',
                  color: '#0a0a0a', border: 'none', fontFamily: 'Syne', fontWeight: 800,
                  fontSize: 15, cursor: 'pointer', boxShadow: '0 0 20px rgba(201,168,76,0.25)',
                }}>
                  {step === TOTAL_STEPS - 1 ? 'Review Profile →' : 'Next →'}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 style={{ fontFamily: 'Syne', fontSize: 24, fontWeight: 700, marginBottom: 5 }}>Review & Confirm</h2>
              <p style={{ color: '#555', fontSize: 13, marginBottom: 24, fontFamily: 'DM Sans' }}>Check your info before the final reveal.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginBottom: 24 }}>
                {[
                  { label: 'Name', value: data.name },
                  { label: 'Email', value: data.email },
                  { label: 'Age', value: data.age },
                  { label: 'Gender', value: data.gender },
                  { label: 'Height', value: data.height ? `${data.height} cm` : '' },
                  { label: 'Weight', value: data.weight ? `${data.weight} kg` : '' },
                  { label: 'Goal', value: data.goals[0] },
                  { label: 'Level', value: data.level },
                  { label: 'Focus', value: data.targetArea.join(', ') },
                  { label: 'Health Risk', value: data.healthRisk },
                ].filter(f => f.value).map(f => (
                  <div key={f.label} style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8, padding: '11px 13px' }}>
                    <div style={{ fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>{f.label}</div>
                    <div style={{ fontSize: 13, color: '#ccc', fontFamily: 'DM Sans' }}>{f.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={back} style={{
                  padding: '12px 22px', borderRadius: 10, background: 'transparent',
                  border: '1px solid #2a2a2a', color: '#666', fontFamily: 'Syne', fontWeight: 600,
                  fontSize: 14, cursor: 'pointer',
                }}>Back</button>
                <button onClick={() => setShowCinematic(true)} style={{
                  flex: 1, padding: '13px', borderRadius: 10,
                  background: 'linear-gradient(135deg, #c9a84c, #e8c46a)',
                  color: '#0a0a0a', border: 'none', fontFamily: 'Syne', fontWeight: 800,
                  fontSize: 15, cursor: 'pointer', boxShadow: '0 0 20px rgba(201,168,76,0.3)',
                }}>See Your Full Profile ✦</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {show3D && (
        <div style={{
          flex: 1, maxWidth: '48%', position: 'sticky', top: 0, height: '100vh',
          background: '#050505', borderLeft: '1px solid #111',
          display: 'flex', flexDirection: 'column',
          animation: 'slideIn 0.5s ease',
        }}>
          <style>{`@keyframes slideIn{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}`}</style>
          <div style={{ flex: 1 }}>
            <BodyViewer3D
              measurements={measurements}
              focusAreas={data.targetArea}
              gender={data.gender}
              activeField={activeField}
            />
          </div>
          {(data.height || data.weight) && (
            <div style={{ padding: '14px 20px', borderTop: '1px solid #111', display: 'flex', gap: 20, justifyContent: 'center' }}>
              {[
                { label: 'H', value: data.height ? `${data.height}cm` : null },
                { label: 'W', value: data.weight ? `${data.weight}kg` : null },
                { label: 'BF', value: data.bodyFat ? `${data.bodyFat}%` : null },
              ].filter(s => s.value).map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 15, fontFamily: 'Syne', fontWeight: 700, color: '#c9a84c' }}>{s.value}</div>
                  <div style={{ fontSize: 9, color: '#444', fontFamily: 'DM Sans', letterSpacing: 1 }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}