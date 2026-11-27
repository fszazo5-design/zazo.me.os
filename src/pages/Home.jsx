import Hero, { StatsBar } from '../components/Hero'
import AdSense from '../components/AdSense'
import { PortalCards } from './SectionPages'
export default function Home() {
  return <div className="home-shell"><Hero /><PortalCards /><AdSense slot="7240218736" className="mx-auto max-w-5xl px-4" /><StatsBar /></div>
}
