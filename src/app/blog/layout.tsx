import { AutoTranslate } from '@/components/AutoTranslate'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AutoTranslate />
      {children}
    </>
  )
}
