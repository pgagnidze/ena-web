import Link from 'next/link'
import clsx from 'clsx'

const styles = {
  primary:
    'rounded-md bg-nord14-100 py-2 px-4 text-sm font-semibold text-white hover:bg-nord14-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-400',
  secondary:
    'rounded-md bg-slate-600 py-2 px-4 text-sm font-semibold text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-300',
  play:
    'rounded-md bg-slate-600 py-1 px-2 text-sm font-medium text-white hover:bg-slate-600/70 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-nord14-200',
}

export function Button({ variant = 'primary', className, href, ...props }) {
  className = clsx(styles[variant], className)

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  )
}
