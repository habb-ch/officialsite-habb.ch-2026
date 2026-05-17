import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Habb Schweiz',
    short_name: 'Habb',
    description:
      'Habb Schweiz – KI-Automatisierung und Technologie-Lösungen für Schweizer Unternehmen.',
    start_url: '/de',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#e30613',
    icons: [
      { src: '/logo.png', sizes: 'any', type: 'image/png' },
    ],
  }
}
