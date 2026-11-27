import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

const NETWORK_ROOT = 'https://bellnewyork.org'

function useMobileViewport() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches)
  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const update = () => setMobile(media.matches)
    update()
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])
  return mobile
}

const bannerConfig = {
  300: { key: '1df3d71872b04be982ad93797a593133', width: 300, height: 250 },
  728: { key: 'da31162659503606a77c1a592a4fb7cf', width: 728, height: 90 },
  320: { key: 'f75f65f5f130d4483989f4f129058e1c', width: 320, height: 50 },
}

export function AdsterraBanner({ placement = 300, className = '' }) {
  const hostRef = useRef(null)
  const mobile = useMobileViewport()
  const config = bannerConfig[placement]
  const visible = config && (placement === 728 ? !mobile : placement === 320 ? mobile : true)

  useEffect(() => {
    if (!visible || !config || !hostRef.current) return undefined
    const host = hostRef.current
    const script = document.createElement('script')
    window.atOptions = { key: config.key, format: 'iframe', height: config.height, width: config.width, params: {} }
    script.async = true
    script.dataset.cfasync = 'false'
    script.src = `${NETWORK_ROOT}/22/${config.key}`
    host.appendChild(script)
    return () => {
      script.remove()
      host.innerHTML = ''
    }
  }, [config, visible])

  if (!visible) return null
  return <div className={`adsterra-shell adsterra-${placement} ${className}`} ref={hostRef} aria-label="إعلان Adsterra" />
}

export function AdsterraNative({ className = '' }) {
  const hostRef = useRef(null)
  const containerId = 'container-431a7953ea9229a3196e41c1cd867ba9'
  useEffect(() => {
    if (!hostRef.current) return undefined
    const host = hostRef.current
    const container = document.createElement('div')
    container.id = containerId
    host.appendChild(container)
    const script = document.createElement('script')
    script.async = true
    script.fetchPriority = 'high'
    script.dataset.cfasync = 'false'
    script.src = `${NETWORK_ROOT}/21/431a7953ea9229a3196e41c1cd867ba9`
    host.appendChild(script)
    return () => {
      script.remove()
      host.innerHTML = ''
    }
  }, [])
  return <div className={`adsterra-shell adsterra-native ${className}`} ref={hostRef} aria-label="إعلان Adsterra أصلي" />
}

AdsterraBanner.propTypes = { placement: PropTypes.oneOf([300, 728, 320]), className: PropTypes.string }
AdsterraNative.propTypes = { className: PropTypes.string }
