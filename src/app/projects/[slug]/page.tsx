import { notFound } from 'next/navigation';

const PROJECTS = [
  {
    slug: 'disney',
    title: 'Project DisneyLand Paris',
    description: 'Description of DisneyLand Paris Project',
    imageUrl: '/creations/Disney.jpg',
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
    mediaType: 'image',
    mediaUrl: '/creations/Disney.wbm',
    seoTitle: 'Projet Disney - My Portfolio',
    seoDescription: 'Discover my DisneyLand Paris Project.',
  },
  //   {
  //     slug: 'test',
  //     title: 'Project test',
  //     description: 'Description',
  //     imageUrl: '/creations/test.jpg',
  //     backgroundColor: '#33FF57',
  //     textColor: '#000000',
  //     mediaType: 'video',
  //     mediaUrl: '/creations/test.mp4',
  //     seoTitle: 'Projet test - My Portfolio',
  //     seoDescription: 'Discover my project',
  //   },
];

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    return notFound();
  }

  return (
    <div
      style={{
        backgroundColor: project.backgroundColor,
        color: project.textColor,
      }}
      className="min-h-screen p-8"
    >
      <a href="/?section=creations" className="mb-4 inline-block text-current hover:opacity-80">
        ← Back to Creations
      </a>
      <h1 className="text-3xl font-bold">{project.title}</h1>
      <p className="text-lg">{project.description}</p>

      {project.mediaType === 'image' && (
        <img src={project.mediaUrl} alt={project.title} className="my-4 h-auto max-w-full" />
      )}
      {project.mediaType === 'video' && (
        <video controls className="my-4 h-auto max-w-full">
          <source src={project.mediaUrl} type="video/mp4" />
          Your Bowser doesn&apos;t support this video.
        </video>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  return {
    title: project?.seoTitle || 'Unknow Project',
    description: project?.seoDescription || 'Discover this project',
  };
}
