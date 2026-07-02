// Minimal magic-byte sniffer — verifies the file's actual bytes match an
// allowed image format instead of trusting the client-supplied filename.
export type SniffedType = 'jpg' | 'png' | 'gif' | 'webp' | 'avif'

export function sniffImageType(buf: Buffer): SniffedType | null {
  if (buf.length < 12) return null

  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg'

  if (
    buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47 &&
    buf[4] === 0x0d && buf[5] === 0x0a && buf[6] === 0x1a && buf[7] === 0x0a
  ) return 'png'

  if (buf.toString('ascii', 0, 4) === 'GIF8') return 'gif'

  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return 'webp'

  if (buf.toString('ascii', 4, 8) === 'ftyp') {
    const brand = buf.toString('ascii', 8, 12)
    if (brand === 'avif' || brand === 'avis') return 'avif'
  }

  return null
}

// Extensions that map to each sniffed type (jpg/jpeg both map to 'jpg')
export function extensionMatches(ext: string, type: SniffedType): boolean {
  if (type === 'jpg') return ext === 'jpg' || ext === 'jpeg'
  return ext === type
}
