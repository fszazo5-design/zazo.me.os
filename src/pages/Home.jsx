import Hero, { StatsBar } from '../components/Hero'
import AdSense from '../components/AdSense'
import { AdsterraBanner, AdsterraNative } from '../components/Adsterra'
import { PortalCards } from './SectionPages'
export default function Home() {
  return <div className="home-shell"><Hero /><AdsterraBanner placement={728} /><AdsterraBanner placement={320} /><PortalCards /><AdsterraNative className="mx-auto max-w-5xl px-4" /><AdSense slot="7240218736" className="mx-auto max-w-5xl px-4" /><StatsBar /></div>
}
