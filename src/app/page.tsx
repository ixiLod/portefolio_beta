import Head from 'next/head';
import BlobScene from '@/components/BlobScene';
import ParticleSystem from '@/components/ParticleSystem';

export async function getStaticProps() {
  return {
    props: {
      title: 'ixiLod - Creative Coder & Visual Artist',
      description:
        'A self-taught developer passionate about visual arts and music, I aim to deliver unique experiences by combining these passions. Explore my world through this portfolio. Enjoy your visit!',
      keywords: 'portfolio, creations, art, visuals, 3d, developpement, music',
      canonicalUrl: 'https://ixilod.com/',
    },
  };
}

interface HomeProps {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
}

export default function Home({ title, description, keywords, canonicalUrl }: HomeProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="ixilod" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="canonical" href={canonicalUrl} />
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
