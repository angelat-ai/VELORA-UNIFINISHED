import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

const BODY_PARTS = {
  head: { y: 1.75, radius: 0.18, height: 0.32, segments: 12 },
  neck: { y: 1.52, radius: 0.07, height: 0.14, segments: 8 },
  torso: { y: 1.1, radius: 0.28, height: 0.7, segments: 14 },
  chest: { y: 1.28, radius: 0.26, height: 0.28, segments: 14 },
  abs: { y: 0.95, radius: 0.22, height: 0.28, segments: 12 },
  hips: { y: 0.72, radius: 0.24, height: 0.22, segments: 12 },
  leftShoulder: { x: -0.36, y: 1.38, radius: 0.09, height: 0.14, segments: 8 },
  rightShoulder: { x: 0.36, y: 1.38, radius: 0.09, height: 0.14, segments: 8 },
  leftUpperArm: { x: -0.44, y: 1.18, radius: 0.075, height: 0.3, segments: 8 },
  rightUpperArm: { x: 0.44, y: 1.18, radius: 0.075, height: 0.3, segments: 8 },
  leftForearm: { x: -0.46, y: 0.82, radius: 0.06, height: 0.28, segments: 8 },
  rightForearm: { x: 0.46, y: 0.82, radius: 0.06, height: 0.28, segments: 8 },
  leftHand: { x: -0.46, y: 0.62, radius: 0.055, height: 0.12, segments: 7 },
  rightHand: { x: 0.46, y: 0.62, radius: 0.055, height: 0.12, segments: 7 },
  leftThigh: { x: -0.13, y: 0.38, radius: 0.11, height: 0.36, segments: 10 },
  rightThigh: { x: 0.13, y: 0.38, radius: 0.11, height: 0.36, segments: 10 },
  leftShin: { x: -0.12, y: 0.0, radius: 0.075, height: 0.34, segments: 8 },
  rightShin: { x: 0.12, y: 0.0, radius: 0.075, height: 0.34, segments: 8 },
  leftFoot: { x: -0.12, y: -0.2, radius: 0.065, height: 0.1, segments: 7 },
  rightFoot: { x: 0.12, y: -0.2, radius: 0.065, height: 0.1, segments: 7 },
}

const FOCUS_ZONE_MAP = {
  'Full Body': Object.keys(BODY_PARTS),
  'Chest': ['chest', 'leftShoulder', 'rightShoulder'],
  'Arms': ['leftUpperArm', 'rightUpperArm', 'leftForearm', 'rightForearm', 'leftHand', 'rightHand', 'leftShoulder', 'rightShoulder'],
  'Abs': ['abs'],
  'Legs': ['leftThigh', 'rightThigh', 'leftShin', 'rightShin', 'leftFoot', 'rightFoot'],
  'Back': ['torso', 'leftShoulder', 'rightShoulder'],
  'Shoulders': ['leftShoulder', 'rightShoulder'],
}

const CAMERA_FOCUS = {
  'Full Body': { y: 0.8, z: 3.2, lookY: 0.8 },
  'Chest': { y: 1.3, z: 1.8, lookY: 1.3 },
  'Arms': { y: 1.1, z: 2.0, lookY: 1.1 },
  'Abs': { y: 0.95, z: 1.6, lookY: 0.95 },
  'Legs': { y: 0.2, z: 2.2, lookY: 0.2 },
  'Back': { y: 1.2, z: 2.0, lookY: 1.2 },
  'Shoulders': { y: 1.38, z: 1.8, lookY: 1.38 },
}

const GOLD = new THREE.Color('#c9a84c')
const GOLD_BRIGHT = new THREE.Color('#f0c84a')
const DIM = new THREE.Color('#2a2a2a')
const BASE = new THREE.Color('#3a3a3a')

export default function BodyViewer3D({ measurements, focusAreas, gender, activeField }) {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const meshesRef = useRef({})
  const frameRef = useRef(null)
  const rotationRef = useRef(0)
  const autoRotateRef = useRef(true)

  const buildBody = useCallback((scene) => {
    const meshes = {}
    Object.entries(BODY_PARTS).forEach(([name, cfg]) => {
      const geo = new THREE.CylinderGeometry(
        cfg.radius * 0.85, cfg.radius, cfg.height, cfg.segments, 4, false
      )
      const mat = new THREE.MeshBasicMaterial({
        color: BASE,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(cfg.x || 0, cfg.y, 0)
      mesh.userData.basePart = name
      scene.add(mesh)
      meshes[name] = mesh
    })

    const headGeo = new THREE.SphereGeometry(0.18, 12, 10)
    const headMat = new THREE.MeshBasicMaterial({ color: BASE, wireframe: true, transparent: true, opacity: 0.7 })
    const headMesh = new THREE.Mesh(headGeo, headMat)
    headMesh.position.set(0, 1.82, 0)
    scene.add(headMesh)
    meshes['headSphere'] = headMesh

    return meshes
  }, [])

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const w = el.clientWidth
    const h = el.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    camera.position.set(0, 0.8, 3.2)
    camera.lookAt(0, 0.8, 0)
    cameraRef.current = camera

    const ambLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambLight)

    const meshes = buildBody(scene)
    meshesRef.current = meshes

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      if (autoRotateRef.current) {
        rotationRef.current += 0.004
        Object.values(meshes).forEach(m => {
          m.rotation.y = rotationRef.current
        })
      }
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const nw = el.clientWidth
      const nh = el.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [buildBody])

  useEffect(() => {
    const meshes = meshesRef.current
    if (!meshes || Object.keys(meshes).length === 0) return

    const h = measurements?.height ? parseFloat(measurements.height) : 170
    const w = measurements?.weight ? parseFloat(measurements.weight) : 70
    const chest = measurements?.chest ? parseFloat(measurements.chest) : 95
    const waist = measurements?.waist ? parseFloat(measurements.waist) : 80
    const hips = measurements?.hips ? parseFloat(measurements.hips) : 90
    const thigh = measurements?.thighCirc ? parseFloat(measurements.thighCirc) : 50
    const calf = measurements?.calfCirc ? parseFloat(measurements.calfCirc) : 35
    const shoulder = measurements?.shoulderWidth ? parseFloat(measurements.shoulderWidth) : 44

    const hScale = Math.max(0.75, Math.min(1.25, h / 170))
    const wScale = Math.max(0.75, Math.min(1.3, w / 70))
    const chestScale = Math.max(0.8, Math.min(1.3, chest / 95))
    const waistScale = Math.max(0.75, Math.min(1.3, waist / 80))
    const hipsScale = Math.max(0.8, Math.min(1.3, hips / 90))
    const thighScale = Math.max(0.8, Math.min(1.3, thigh / 50))
    const calfScale = Math.max(0.8, Math.min(1.25, calf / 35))
    const shoulderScale = Math.max(0.8, Math.min(1.3, shoulder / 44))

    const scaleMap = {
      head: { x: wScale * 0.8, y: hScale * 0.9, z: wScale * 0.8 },
      headSphere: { x: wScale * 0.85, y: hScale * 0.85, z: wScale * 0.85 },
      neck: { x: wScale * 0.85, y: hScale, z: wScale * 0.85 },
      torso: { x: chestScale, y: hScale, z: chestScale * 0.85 },
      chest: { x: chestScale * shoulderScale, y: hScale, z: chestScale * 0.85 },
      abs: { x: waistScale, y: hScale, z: waistScale * 0.85 },
      hips: { x: hipsScale, y: hScale, z: hipsScale * 0.9 },
      leftShoulder: { x: shoulderScale, y: 1, z: shoulderScale },
      rightShoulder: { x: shoulderScale, y: 1, z: shoulderScale },
      leftUpperArm: { x: wScale * 0.9, y: hScale, z: wScale * 0.9 },
      rightUpperArm: { x: wScale * 0.9, y: hScale, z: wScale * 0.9 },
      leftForearm: { x: wScale * 0.85, y: hScale, z: wScale * 0.85 },
      rightForearm: { x: wScale * 0.85, y: hScale, z: wScale * 0.85 },
      leftHand: { x: wScale * 0.8, y: 1, z: wScale * 0.8 },
      rightHand: { x: wScale * 0.8, y: 1, z: wScale * 0.8 },
      leftThigh: { x: thighScale, y: hScale, z: thighScale * 0.9 },
      rightThigh: { x: thighScale, y: hScale, z: thighScale * 0.9 },
      leftShin: { x: calfScale, y: hScale, z: calfScale * 0.9 },
      rightShin: { x: calfScale, y: hScale, z: calfScale * 0.9 },
      leftFoot: { x: wScale * 0.9, y: 1, z: wScale * 0.9 },
      rightFoot: { x: wScale * 0.9, y: 1, z: wScale * 0.9 },
    }

    Object.entries(scaleMap).forEach(([name, s]) => {
      if (meshes[name]) {
        gsap.to(meshes[name].scale, { x: s.x, y: s.y, z: s.z, duration: 0.6, ease: 'power2.out' })
      }
    })
  }, [measurements])

  useEffect(() => {
    const meshes = meshesRef.current
    const camera = cameraRef.current
    if (!meshes || !camera) return

    const allParts = Object.keys(meshes)
    const highlighted = new Set()
    focusAreas?.forEach(area => {
      const parts = FOCUS_ZONE_MAP[area] || []
      parts.forEach(p => highlighted.add(p))
    })

    allParts.forEach(name => {
      const mesh = meshes[name]
      if (!mesh) return
      const isHighlighted = highlighted.has(name) || highlighted.has('headSphere')
      const targetColor = isHighlighted ? GOLD_BRIGHT : (highlighted.size > 0 ? DIM : BASE)
      const targetOpacity = isHighlighted ? 1 : (highlighted.size > 0 ? 0.25 : 0.7)
      gsap.to(mesh.material.color, { r: targetColor.r, g: targetColor.g, b: targetColor.b, duration: 0.4 })
      gsap.to(mesh.material, { opacity: targetOpacity, duration: 0.4 })
    })

    if (focusAreas?.length === 1) {
      const area = focusAreas[0]
      const cam = CAMERA_FOCUS[area] || CAMERA_FOCUS['Full Body']
      autoRotateRef.current = false
      gsap.to(camera.position, { y: cam.y, z: cam.z, duration: 0.8, ease: 'power3.out' })
      gsap.to(camera, { fov: area === 'Full Body' ? 45 : 35, duration: 0.8, ease: 'power3.out', onUpdate: () => camera.updateProjectionMatrix() })
    } else {
      autoRotateRef.current = true
      gsap.to(camera.position, { y: 0.8, z: 3.2, duration: 0.8, ease: 'power3.out' })
      gsap.to(camera, { fov: 45, duration: 0.8, ease: 'power3.out', onUpdate: () => camera.updateProjectionMatrix() })
    }
  }, [focusAreas])

  useEffect(() => {
    const meshes = meshesRef.current
    const camera = cameraRef.current
    if (!activeField || !meshes || !camera) return

    const fieldToZone = {
      chest: 'Chest',
      waist: 'Abs',
      hips: 'Back',
      thighCirc: 'Legs',
      calfCirc: 'Legs',
      shoulderWidth: 'Shoulders',
      armLength: 'Arms',
      legLength: 'Legs',
    }

    const zone = fieldToZone[activeField]
    if (!zone) return

    const cam = CAMERA_FOCUS[zone]
    autoRotateRef.current = false
    gsap.to(camera.position, { y: cam.y, z: cam.z, duration: 0.5, ease: 'power2.out' })
    gsap.to(camera, { fov: 35, duration: 0.5, ease: 'power2.out', onUpdate: () => camera.updateProjectionMatrix() })

    const toHighlight = new Set(FOCUS_ZONE_MAP[zone] || [])
    Object.entries(meshes).forEach(([name, mesh]) => {
      const isLit = toHighlight.has(name)
      gsap.to(mesh.material.color, { r: isLit ? GOLD.r : DIM.r, g: isLit ? GOLD.g : DIM.g, b: isLit ? GOLD.b : DIM.b, duration: 0.3 })
      gsap.to(mesh.material, { opacity: isLit ? 0.95 : 0.2, duration: 0.3 })
    })

    return () => {
      autoRotateRef.current = true
      gsap.to(camera.position, { y: 0.8, z: 3.2, duration: 0.5 })
      gsap.to(camera, { fov: 45, duration: 0.5, onUpdate: () => camera.updateProjectionMatrix() })
      Object.values(meshes).forEach(mesh => {
        gsap.to(mesh.material.color, { r: BASE.r, g: BASE.g, b: BASE.b, duration: 0.3 })
        gsap.to(mesh.material, { opacity: 0.7, duration: 0.3 })
      })
    }
  }, [activeField])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      <div style={{
        position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
        fontSize: 11, color: '#555', fontFamily: 'DM Sans', letterSpacing: 1, textTransform: 'uppercase',
        background: 'rgba(0,0,0,0.6)', padding: '4px 12px', borderRadius: 20,
        border: '1px solid #1a1a1a',
      }}>
        3D Body Preview
      </div>
    </div>
  )
}