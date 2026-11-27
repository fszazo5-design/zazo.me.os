import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const CLIENT_ID = 'ca-pub-8025494804759906'

export default function AdSense({ slot, className = '' }) {
  const adRef = useRef(null)
  const pushedRef = useRef(false)

  useEffect(() => {
    if (!slot || !adRef.current || pushedRef.current) return
    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
      pushedRef.current = true
    } catch (error) {
      console.warn('AdSense could not initialize this ad slot.', error)
    }
  }, [slot])

  return <div className={`adsense-shell ${className}`} aria-label="إعلان"><ins ref={adRef} className="adsbygoogle" style={{ display: 'block' }} data-ad-client={CLIENT_ID} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" /></div>
}

AdSense.propTypes = {
  slot: PropTypes.string.isRequired,
  className: PropTypes.string,
}
