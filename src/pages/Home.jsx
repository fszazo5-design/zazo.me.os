import Hero, { StatsBar } from '../components/Hero'
import { PortalCards } from './SectionPages'
export default function Home() {
  return <div className="home-shell"><Hero /><PortalCards /><StatsBar /></div>
}
