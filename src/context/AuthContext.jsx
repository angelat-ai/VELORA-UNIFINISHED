import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const DEMO_ACCOUNTS = {
  admin: {
    id: 'admin_001',
    email: 'admin@velora.com',
    password: 'admin123',
    role: 'admin',
    name: 'Velora Admin',
    username: 'velora_admin',
    avatar: null,
    onboardingDone: true,
  },
  user: {
    id: 'user_001',
    email: 'demo@velora.com',
    password: 'demo123',
    role: 'user',
    name: 'Demo User',
    username: 'demo_user',
    avatar: null,
    bio: 'Fitness enthusiast. Gym rat. Building my best physique.',
    followers: 0,
    following: 0,
    posts: 0,
    onboardingDone: false,
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const loginWithCredentials = (email, password) => {
    for (const acc of Object.values(DEMO_ACCOUNTS)) {
      if (acc.email === email && acc.password === password) {
        setUser(acc)
        return { success: true, user: acc }
      }
    }
    return { success: false, error: 'Invalid email or password' }
  }

  const loginDirect = (userObj) => {
    setUser(userObj)
  }

  const logout = () => setUser(null)

  const updateUser = (data) => setUser(prev => ({ ...prev, ...data }))

  return (
    <AuthContext.Provider value={{ user, loginWithCredentials, loginDirect, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export { DEMO_ACCOUNTS }