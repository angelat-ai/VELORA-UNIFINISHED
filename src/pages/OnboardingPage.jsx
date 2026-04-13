import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import VeloraLogo from '../components/VeloraLogo'

const TOTAL_STEPS = 9

const GOALS = ['Lose Weight', 'Build Muscle', 'Maintain FIT', 'Athletic Performance', 'Improve Health']
const TARGETS = ['Full Body', 'Chest', 'Arms', 'Abs', 'Legs', 'Back', 'Shoulders']
const LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCE']
const MOTIVATIONS = ['Heart Broken', 'Influence', 'Improve Health', 'Sports', 'Crush', 'Self Confidence', 'Competition']
const WORKOUTS = ['Weight Training', 'Cardio', 'HIIT', 'Calisthenics', 'Yoga', 'Mixed']

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
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

  const progress = (step / TOTAL_STEPS) * 100

  const pillBtn = (label, active, onClick) => (
    <button key={label} onClick={onClick} style={{
      padding: '10px 18px', borderRadius: 8, fontSize: 14, fontFamily: 'DM Sans',
      background: active ? '#c9a84c' : '#1a1a1a',
      color: active ? '#0a0a0a' : '#888',
      border: `1px solid ${active ? '#c9a84c' : '#2a2a2a'}`,
      cursor: 'pointer', transition: 'all 0.2s', fontWeight: active ? 700 : 400,
    }}>{label}</button>
  )

  const radioBtn = (label, active, onClick) => (
    <button key={label} onClick={onClick} style={{
      width: '100%', padding: '13px', borderRadius: 10, fontSize: 15, fontFamily: 'Syne', fontWeight: 600,
      background: active ? 'rgba(201,168,76,0.15)' : '#1a1a1a',
      color: active ? '#c9a84c' : '#888',
      border: `1px solid ${active ? '#c9a84c' : '#2a2a2a'}`,
      cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center',
    }}>{label}</button>
  )

  const fieldRow = (label, key, placeholder, type = 'text', unit = '') => (
    <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, color: '#888', fontFamily: 'DM Sans' }}>{label} {unit && <span style={{ color: '#555' }}>({unit})</span>}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={data[key]}
        onChange={e => set(key, e.target.value)}
        style={{ background: '#0d0d0d', border: '1px solid #2a2a2a', padding: '11px 14px', borderRadius: 8 }}
      />
    </div>
  )

  const steps = [
    {
      title: 'Welcome to Velora',
      subtitle: 'Your fitness journey begins here',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <VeloraLogo size={52} showText={false} />
          </div>
          <div className="card" style={{ background: '#111', border: '1px solid #222' }}>
            <h3 style={{ fontFamily: 'Syne', fontSize: 16, marginBottom: 10, color: '#c9a84c' }}>Why we collect your data</h3>
            <p style={{ fontSize: 14, color: '#777', lineHeight: 1.7 }}>
              Velora uses your body measurements and fitness preferences to build a truly personalized experience —
              from matching you with influencers who share your physique to recommending workouts tailored to your goals.
              Your data is never shared without your consent.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '📏', text: 'Detailed body measurements' },
              { icon: '🎯', text: 'Goal-based recommendations' },
              { icon: '👥', text: 'Influencer matching' },
              { icon: '🔒', text: 'Your data stays private' },
            ].map(i => (
              <div key={i.text} style={{
                background: '#111', border: '1px solid #222', borderRadius: 10,
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span style={{ fontSize: 20 }}>{i.icon}</span>
                <span style={{ fontSize: 13, color: '#888' }}>{i.text}</span>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {fieldRow('Full Name', 'name', 'Your full name')}
          {fieldRow('Email', 'email', 'your@email.com', 'email')}
          {fieldRow('Age', 'age', 'e.g. 24', 'number')}
          {fieldRow('Occupation', 'occupation', 'e.g. Student, Athlete, Engineer')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 13, color: '#888' }}>Gender</label>
            <div style={{ display: 'flex', gap: 12 }}>
              {['Male', 'Female', 'Prefer not to say'].map(g => (
                <button key={g} onClick={() => set('gender', g)} style={{
                  flex: 1, padding: '11px', borderRadius: 8, fontSize: 14, fontFamily: 'DM Sans',
                  background: data.gender === g ? 'rgba(201,168,76,0.15)' : '#1a1a1a',
                  color: data.gender === g ? '#c9a84c' : '#888',
                  border: `1px solid ${data.gender === g ? '#c9a84c' : '#2a2a2a'}`,
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
      subtitle: 'Primary measurements — used for physique matching',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {fieldRow('Height', 'height', 'e.g. 175', 'number', 'cm')}
            {fieldRow('Weight', 'weight', 'e.g. 75', 'number', 'kg')}
            {fieldRow('Target Weight', 'targetWeight', 'e.g. 80', 'number', 'kg')}
            {fieldRow('Body Fat %', 'bodyFat', 'e.g. 15', 'number', '%')}
          </div>
          <div style={{ height: 1, background: '#1a1a1a', margin: '4px 0' }} />
          <p style={{ fontSize: 12, color: '#555', fontFamily: 'DM Sans' }}>Circumference measurements (tape measure)</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {fieldRow('Chest', 'chest', 'e.g. 100', 'number', 'cm')}
            {fieldRow('Waist', 'waist', 'e.g. 80', 'number', 'cm')}
            {fieldRow('Hips', 'hips', 'e.g. 95', 'number', 'cm')}
            {fieldRow('Neck', 'neckCirc', 'e.g. 38', 'number', 'cm')}
            {fieldRow('Thigh', 'thighCirc', 'e.g. 55', 'number', 'cm')}
            {fieldRow('Calf', 'calfCirc', 'e.g. 38', 'number', 'cm')}
          </div>
        </div>
      ),
    },
    {
      title: 'Advanced Measurements',
      subtitle: 'Specialized metrics for precise influencer matching',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {fieldRow('Shoulder Width', 'shoulderWidth', 'e.g. 48', 'number', 'cm')}
            {fieldRow('Arm Length', 'armLength', 'e.g. 60', 'number', 'cm')}
            {fieldRow('Leg Length', 'legLength', 'e.g. 90', 'number', 'cm')}
            {fieldRow('Waist-to-Hip Ratio', 'waistToHip', 'e.g. 0.85', 'number')}
          </div>
          <div className="card" style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', marginTop: 8 }}>
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
              💡 <strong style={{ color: '#888' }}>Tip:</strong> These measurements help us match you with influencers who have a similar body frame (75–90% similarity). Accuracy leads to better recommendations.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Choose Your Focus',
      subtitle: 'Select your target muscle groups',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {TARGETS.map(t => pillBtn(t, data.targetArea.includes(t), () => toggle('targetArea', t)))}
          </div>
        </div>
      ),
    },
    {
      title: 'Fitness Goals',
      subtitle: "What are your main goals?",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {GOALS.map(g => radioBtn(g, data.goals.includes(g), () => toggle('goals', g)))}
        </div>
      ),
    },
    {
      title: 'Your Level',
      subtitle: 'What is your current fitness level?',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {LEVELS.map(l => radioBtn(l, data.level === l, () => set('level', l)))}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 16 }}>
            <p style={{ width: '100%', fontSize: 13, color: '#666', marginBottom: 4 }}>Preferred workout style</p>
            {WORKOUTS.map(w => pillBtn(w, data.workoutType === w, () => set('workoutType', w)))}
          </div>
        </div>
      ),
    },
    {
      title: 'What Motivates You?',
      subtitle: 'Select all that apply',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {MOTIVATIONS.map(m => pillBtn(m, data.motivation.includes(m), () => toggle('motivation', m)))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            <label style={{ fontSize: 13, color: '#888' }}>Health Risk — Do you have any injury or disease in joints?</label>
            <div style={{ display: 'flex', gap: 12 }}>
              {['None', 'Yes'].map(v => (
                <button key={v} onClick={() => set('healthRisk', v)} style={{
                  flex: 1, padding: '13px', borderRadius: 10, fontSize: 15, fontFamily: 'Syne', fontWeight: 700,
                  background: data.healthRisk === v ? (v === 'Yes' ? 'rgba(224,82,82,0.15)' : 'rgba(201,168,76,0.15)') : '#1a1a1a',
                  color: data.healthRisk === v ? (v === 'Yes' ? '#e05252' : '#c9a84c') : '#888',
                  border: `1px solid ${data.healthRisk === v ? (v === 'Yes' ? '#e05252' : '#c9a84c') : '#2a2a2a'}`,
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { title: 'Personalization', desc: 'Your measurements and goals power your personalized feed, influencer matches, and workout recommendations.' },
            { title: 'Community Features', desc: 'Your profile stats (not raw measurements) may appear in community leaderboards and matching systems.' },
            { title: 'No Third-Party Sales', desc: 'Velora never sells your personal data to advertisers or third parties.' },
          ].map(i => (
            <div key={i.title} className="card" style={{ background: '#0d0d0d', border: '1px solid #1a1a1a' }}>
              <h4 style={{ fontFamily: 'Syne', fontSize: 14, color: '#c9a84c', marginBottom: 6 }}>{i.title}</h4>
              <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>{i.desc}</p>
            </div>
          ))}
          <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '16px', background: '#111', border: '1px solid #2a2a2a', borderRadius: 10 }}>
            <input
              type="checkbox"
              checked={data.consent}
              onChange={e => set('consent', e.target.checked)}
              style={{ width: 18, height: 18, accentColor: '#c9a84c', cursor: 'pointer' }}
            />
            <span style={{ fontSize: 14, color: '#aaa', lineHeight: 1.5 }}>
              I agree to Velora's <span style={{ color: '#c9a84c' }}>Privacy Policy</span> and consent to the use of my fitness data as described above.
            </span>
          </label>
        </div>
      ),
    },
  ]

  const REVIEW_FIELDS = [
    { label: 'Name', value: data.name },
    { label: 'Email', value: data.email },
    { label: 'Age', value: data.age },
    { label: 'Gender', value: data.gender },
    { label: 'Occupation', value: data.occupation },
    { label: 'Height', value: data.height ? `${data.height} cm` : '' },
    { label: 'Weight', value: data.weight ? `${data.weight} kg` : '' },
    { label: 'Target Weight', value: data.targetWeight ? `${data.targetWeight} kg` : '' },
    { label: 'Body Fat', value: data.bodyFat ? `${data.bodyFat}%` : '' },
    { label: 'Chest', value: data.chest ? `${data.chest} cm` : '' },
    { label: 'Waist', value: data.waist ? `${data.waist} cm` : '' },
    { label: 'Hips', value: data.hips ? `${data.hips} cm` : '' },
    { label: 'Shoulder Width', value: data.shoulderWidth ? `${data.shoulderWidth} cm` : '' },
    { label: 'Goals', value: data.goals.join(', ') },
    { label: 'Level', value: data.level },
    { label: 'Focus Areas', value: data.targetArea.join(', ') },
    { label: 'Health Risk', value: data.healthRisk },
    { label: 'Motivation', value: data.motivation.join(', ') },
  ]

  const isReview = step === TOTAL_STEPS

  return (
    <div style={{ minHeight: '100vh', overflowY: 'auto', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: 520 }}>
        <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <VeloraLogo size={34} textSize={16} />
          <span style={{ color: '#555', fontSize: 13, fontFamily: 'DM Sans' }}>
            {isReview ? 'Review' : `${step + 1} / ${TOTAL_STEPS}`}
          </span>
        </div>

        <div style={{ height: 3, background: '#1a1a1a', borderRadius: 2, marginBottom: 36, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${isReview ? 100 : progress}%`,
            background: 'linear-gradient(90deg, #c9a84c, #e8c46a)',
            borderRadius: 2, transition: 'width 0.4s ease',
            boxShadow: '0 0 6px rgba(201,168,76,0.4)',
          }} />
        </div>

        {!isReview ? (
          <div>
            <h2 style={{ fontFamily: 'Syne', fontSize: 26, fontWeight: 700, marginBottom: 6 }}>{steps[step].title}</h2>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 28 }}>{steps[step].subtitle}</p>
            {steps[step].content}

            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              {step > 0 && (
                <button className="btn-outline" onClick={back} style={{ flex: '0 0 auto', padding: '12px 24px' }}>
                  Back
                </button>
              )}
              <button className="btn-gold" onClick={next} style={{ flex: 1, justifyContent: 'center', padding: '13px' }}>
                {step === TOTAL_STEPS - 1 ? 'Review' : 'Next →'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{ fontFamily: 'Syne', fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Review & Confirm</h2>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 28 }}>Check your information before completing setup.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
              {REVIEW_FIELDS.filter(f => f.value).map(f => (
                <div key={f.label} style={{
                  background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, padding: '12px 14px',
                }}>
                  <div style={{ fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{f.label}</div>
                  <div style={{ fontSize: 14, color: '#ddd', fontFamily: 'DM Sans' }}>{f.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-outline" onClick={back} style={{ padding: '12px 24px' }}>Back</button>
              <button
                className="btn-gold"
                onClick={finish}
                disabled={!data.consent}
                style={{ flex: 1, justifyContent: 'center', padding: '13px', opacity: data.consent ? 1 : 0.5 }}
              >
                Complete Setup ✓
              </button>
            </div>
            {!data.consent && (
              <p style={{ textAlign: 'center', marginTop: 12, color: '#555', fontSize: 12 }}>
                Please go back to Step 9 and accept the consent form.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}