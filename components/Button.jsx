import Link from 'next/link'
import clsx from 'clsx'

const styles = {
  primary:
    'rounded-full bg-[#a3be8c] py-2 px-4 text-sm font-semibold text-white hover:bg-[#a3be8c]/70 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-400',
  secondary:
    'rounded-full bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-300',
  modern:
    'rounded-full bg-[#ebcb8b] py-2 px-4 text-sm font-semibold text-white hover:bg-[#ebcb8b]/70 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:bg-gray-900',
}

export function Button({ variant = 'primary', className, href, ...props }) {
  className = clsx(styles[variant], className)

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  )
}
