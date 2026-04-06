import { client } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import AudioPlayer from './AudioPlayer'

// Placeholder — Nemanja mijenja kroz /admin → Podešavanja sajta → Pozadinska muzika
const PLACEHOLDER_MUSIC = 'https://www.bensound.com/bensound-music/bensound-ukulele.mp3'

export default async function AudioPlayerServer() {
  let musicUrl = PLACEHOLDER_MUSIC

  try {
    const settings = await client.fetch(
      siteSettingsQuery,
      {},
      { next: { revalidate: 60 } }
    )
    if (settings?.backgroundMusicUrl) {
      musicUrl = settings.backgroundMusicUrl
    }
  } catch {
    // Sanity unavailable — use placeholder
  }

  return <AudioPlayer src={musicUrl} />
}
