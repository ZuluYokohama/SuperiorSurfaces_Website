import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center pt-24">
      <div className="wrap text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="display mt-6 text-5xl md:text-7xl">This page has been <em>detailed</em> away.</h1>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-signal">Return home</Link>
          <Link href="/contact-us/" className="btn btn-ghost">Request a quote</Link>
        </div>
      </div>
    </section>
  );
}
