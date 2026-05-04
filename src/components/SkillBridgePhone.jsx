import { useState, useEffect } from "react"
import illustrationImage from "../assets/skillbridge-illustration.png"

const ILLUSTRATION_SRC = illustrationImage

const DefaultIllustration = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <circle cx="100" cy="110" r="85" fill="#f5f3ff" />
    <rect x="45" y="145" width="30" height="30" rx="6" fill="#c4b5fd" />
    <rect x="85" y="125" width="30" height="50" rx="6" fill="#a78bfa" />
    <rect x="125" y="105" width="30" height="70" rx="6" fill="#7c3aed" />
  </svg>
)

const SignalIcon = () => (
  <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-hidden="true">
    <rect x="0" y="7" width="3" height="4" rx="0.5" />
    <rect x="4" y="5" width="3" height="6" rx="0.5" />
    <rect x="8" y="2" width="3" height="9" rx="0.5" />
    <rect x="12" y="0" width="3" height="11" rx="0.5" />
  </svg>
)

const WifiIcon = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
    <path d="M8 11.5c-.7 0-1.3-.6-1.3-1.3S7.3 8.9 8 8.9s1.3.6 1.3 1.3S8.7 11.5 8 11.5zm3.7-3.4c-1-.9-2.3-1.4-3.7-1.4s-2.7.5-3.7 1.4l-.7-.7C4.7 6.4 6.3 5.7 8 5.7s3.3.7 4.4 1.7l-.7.7zm2.3-2.3C12.4 4.4 10.3 3.6 8 3.6s-4.4.8-6 2.2l-.7-.7C3 3.6 5.4 2.7 8 2.7s5 .9 6.7 2.4l-.7.7z" />
  </svg>
)

const BatteryIcon = () => (
  <svg width="22" height="11" viewBox="0 0 22 11" fill="none" aria-hidden="true">
    <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="currentColor" strokeOpacity="0.45" />
    <rect x="2" y="2" width="15" height="7" rx="1" fill="currentColor" />
    <rect x="20" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor" fillOpacity="0.45" />
  </svg>
)

const Chevron = () => (
  <svg width="8" height="10" viewBox="0 0 8 10" fill="none" aria-hidden="true">
    <path d="M1.5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function SkillBridgePhone({ illustrationSrc = ILLUSTRATION_SRC }) {
  const [screen, setScreen] = useState(1)
  const [time, setTime] = useState("22:06")
  const [progress, setProgress] = useState(0)
  const [analysisDone, setAnalysisDone] = useState(false)
  const [matchProgress, setMatchProgress] = useState(0)

  const [cvFile, setCvFile] = useState(null)
  const [jobDescription, setJobDescription] = useState("")
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      const h = String(d.getHours()).padStart(2, "0")
      const m = String(d.getMinutes()).padStart(2, "0")
      setTime(`${h}:${m}`)
    }

    tick()
    const id = setInterval(tick, 30000)

    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (screen !== 4) return

    setProgress(0)
    setAnalysisDone(false)

    let p = 0

    const id = setInterval(() => {
      p += Math.random() * 18

      if (p >= 100) {
        p = 100
        setAnalysisDone(true)
        clearInterval(id)
      }

      setProgress(p)
    }, 380)

    return () => clearInterval(id)
  }, [screen])

  useEffect(() => {
    if (screen !== 5) return

    const text = jobDescription.toLowerCase()

    const keywords = [
      "react",
      "figma",
      "ux",
      "ui",
      "research",
      "prototype",
      "javascript",
      "css",
      "html",
      "wireframe",
      "user flow",
      "design system",
    ]

    const found = keywords.filter((word) => text.includes(word))
    const score = Math.min(92, Math.max(45, found.length * 8))

    setMatchProgress(0)

    let current = 0

    const intervalId = setInterval(() => {
      current += 4

      if (current >= score) {
        current = score
        clearInterval(intervalId)
      }

      setMatchProgress(current)
    }, 35)

    if (score >= 75) {
      setFeedback(
        "Strong match. Your profile fits many role requirements. Improve by adding clearer project outcomes and measurable UX decisions."
      )
    } else if (score >= 60) {
      setFeedback(
        "Good direction. You match part of the role, but you should strengthen your case study with more UX research, design reasoning, and technical details."
      )
    } else {
      setFeedback(
        "Partial match. Focus on showing stronger skills in UX process, Figma, prototyping, and front-end basics before applying."
      )
    }

    return () => clearInterval(intervalId)
  }, [screen, jobDescription])

  const goTo = (n) => setScreen(n)

  const illustration = illustrationSrc ? (
    <img src={illustrationSrc} alt="" className="sb-bubble-img" />
  ) : (
    <DefaultIllustration />
  )

  const circumference = 2 * Math.PI * 42
  const ringOffset = circumference - (matchProgress / 100) * circumference

  return (
    <div className="sb-phone">
      <div className="sb-notch" />

      <div className="sb-status-bar">
        <span className="sb-time">{time}</span>

        <div className="sb-status-icons">
          <SignalIcon />
          <WifiIcon />
          <BatteryIcon />
        </div>
      </div>

      {screen === 1 && (
        <div className="sb-screen">
          <div className="sb-logo">SkillBridge</div>

          <div className="sb-screen-body sb-center">
            <h2 className="sb-title">
              Find your <span className="sb-purple">skill gaps.</span>
              <br />
              Get hired faster.
            </h2>

            <p className="sb-subtitle">Understand your skill gaps in seconds.</p>

            <div className="sb-bubble">{illustration}</div>
          </div>

          <button className="sb-btn" onClick={() => goTo(2)} type="button">
            Get Started
          </button>
        </div>
      )}

      {screen === 2 && (
        <div className="sb-screen">
          <div className="sb-logo">SkillBridge</div>

          <div className="sb-screen-body">
            <h2 className="sb-welcome">
              Welcome <span className="sb-purple">back!</span>
            </h2>

            <p className="sb-subtitle-sm">Sign in to continue or create an account</p>

            <div className="sb-input-group">
              <input type="email" placeholder="Email" />
            </div>

            <div className="sb-input-group">
              <input type="password" placeholder="Password" />
            </div>

            <div className="sb-forgot">Forgot password?</div>
          </div>

          <button className="sb-btn" onClick={() => goTo(3)} type="button">
            Continue
          </button>
        </div>
      )}

      {screen === 3 && (
        <div className="sb-screen">
          <div className="sb-logo">SkillBridge</div>

          <div className="sb-screen-body">
            <h2 className="sb-h2 sb-center-text">Let's analyze your skills</h2>

            <div className="sb-upload-card">
              <p className="sb-card-title">Upload CV</p>
              <p className="sb-card-sub">Upload your CV file</p>

              <input
                className="sb-file-input"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => setCvFile(e.target.files?.[0] || null)}
              />
            </div>

            <div className="sb-divider">
              <span>AND</span>
            </div>

            <div className="sb-paste-card">
              <p className="sb-card-title">Paste Job Description</p>
              <p className="sb-card-sub">Paste the role requirements</p>

              <textarea
                className="sb-textarea"
                placeholder="Paste job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
          </div>

          <button
            className={`sb-btn${!cvFile || !jobDescription.trim() ? " sb-btn-disabled" : ""}`}
            onClick={() => cvFile && jobDescription.trim() && goTo(4)}
            type="button"
          >
            Start Analysis
          </button>
        </div>
      )}

      {screen === 4 && (
        <div className="sb-screen">
          <div className="sb-logo">SkillBridge</div>

          <div className="sb-screen-body">
            <h2 className="sb-h2">Analyzing your skills...</h2>

            <div className="sb-progress-track">
              <div className="sb-progress-bar" style={{ width: `${progress}%` }} />
            </div>

            <div className="sb-matching-card">
              <p className="sb-matching-label">Matching your skills...</p>

              <div className="sb-loader-row">
                <span className="sb-dot sb-dot-active" />
                <div className="sb-loader-bar sb-shimmer" />
              </div>

              <div className="sb-loader-row">
                <span className="sb-dot sb-dot-active" />
                <div className="sb-loader-bar sb-shimmer" style={{ width: "75%" }} />
              </div>

              <div className="sb-loader-row sb-faded">
                <span className="sb-dot" />
                <div className="sb-loader-bar" style={{ width: "50%" }} />
              </div>
            </div>
          </div>

          <button
            className={`sb-btn${!analysisDone ? " sb-btn-disabled" : ""}`}
            onClick={() => analysisDone && goTo(5)}
            type="button"
          >
            View Results
          </button>
        </div>
      )}

      {screen === 5 && (
        <div className="sb-screen">
          <div className="sb-logo">SkillBridge</div>

          <div className="sb-screen-body sb-center">
            <h2 className="sb-h2">You're close to your goal</h2>

            <div className="sb-ring-wrap">
              <svg width="180" height="180" viewBox="0 0 100 100" className="sb-ring-svg">
                <circle cx="50" cy="50" r="42" fill="transparent" stroke="#f1f0ff" strokeWidth="8" />

                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke="url(#sbArc)"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={ringOffset}
                  strokeLinecap="round"
                  style={{
                    transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)",
                  }}
                />

                <defs>
                  <linearGradient id="sbArc" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="sb-ring-center">
                <span className="sb-ring-num">{matchProgress}%</span>
                <span className="sb-ring-label">match</span>
              </div>
            </div>

            <p className="sb-match-text">
              You are <strong>{matchProgress}%</strong> matched to this role.
              <br />
              There is still <strong>{100 - matchProgress}%</strong> to improve.
            </p>

            <div className="sb-feedback-card">
              <p>{feedback}</p>
            </div>
          </div>

          <button className="sb-btn" onClick={() => goTo(6)} type="button">
            View Learning Plan <Chevron />
          </button>
        </div>
      )}

      {screen === 6 && (
        <div className="sb-screen">
          <div className="sb-logo">SkillBridge</div>

          <div className="sb-screen-body">
            <h2 className="sb-h2">Your Learning Plan</h2>

            <div className="sb-plan-item sb-plan-done">
              <div className="sb-check">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <span>Improve your UX case study</span>
            </div>

            <div className="sb-plan-item">
              <div className="sb-checkbox" />
              <span>Add measurable project outcomes</span>
            </div>

            <div className="sb-plan-item">
              <div className="sb-checkbox" />
              <span>Practice role-specific skills</span>
            </div>
          </div>

          <button className="sb-btn" onClick={() => goTo(1)} type="button">
            Try Again <Chevron />
          </button>
        </div>
      )}
    </div>
  )
}