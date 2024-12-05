import Head from 'next/head';
import BlobScene from '@/components/BlobScene';
import ParticleSystem from '@/components/ParticleSystem';

export default function Home() {
  return (
    <>
      <Head>
        <title>Mon Portfolio - Accueil</title>
        <meta
          name="description"
          content="Bienvenue sur mon portfolio. Découvrez mes créations et mon parcours."
        />
        <meta name="keywords" content="portfolio, créations, art, développeur" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="ixilod" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="canonical" href="https://ixilod.com/" />
      </Head>

      <div className="relative h-screen">
        <h1 className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-ninna text-7xl text-gray-300">
          IXILOD
        </h1>
        <BlobScene />
        <ParticleSystem isEjecting={false} />
      </div>
    </>
  );
}
