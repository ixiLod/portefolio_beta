/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import { notFound } from 'next/navigation';

import ComfyUIIcon from '../../../assets/icons/ComfyUI.png';
import AdobeAfterEffectsIcon from '../../../assets/icons/Adobe After Effects.png';
import AdobePremiereProIcon from '../../../assets/icons/Adobe Premiere Pro.png';
import TopazVideoIcon from '../../../assets/icons/Topaz Video.png';

import Cuz from '../../../assets/icons/cuz.jpeg';
import Ixilod from '../../../assets/icons/ixilod.jpeg';

import { StaticImageData } from 'next/image';

interface ProjectTeamMember {
  name: string;
  role: string;
  imageUrl?: string | StaticImageData;
}

interface ProjectTool {
  name: string;
  icon: string | StaticImageData;
}

interface ProjectMedia {
  type: 'image' | 'video' | 'gif';
  url: string;
  alt: string;
}

interface Project {
  slug: string;
  title?: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  date: string;
  duration?: string;
  client?: string;
  imageUrl: string;
  coverImage?: string;
  backgroundColor: string;
  textColor: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  seoTitle: string;
  seoDescription: string;
  tools?: ProjectTool[];
  team?: ProjectTeamMember[];
  gallery?: ProjectMedia[];
  challenge?: string;
  solution?: string;
  nextProject?: string;
  previousProject?: string;
}

const PROJECTS: Project[] = [
  {
    slug: 'disney',
    title: 'Disney Land Paris',
    subtitle: 'Cast Member Party 2024',
    description: "AI-generated VJ loops for Disney's stage visuals",
    longDescription:
      'A creative collaboration with the Cuz. team and Disneyland Paris to produce about 30 dynamic VJ loops for the 2024 Cast Member Party. Inspired by The Lion King, these visuals were designed to elevate the DJ stage experience with bold and immersive animations.',
    date: 'June 2024',
    duration: '5 weeks',
    client: 'DisneyLand Paris',
    imageUrl: '/creations/Disney.jpg',
    coverImage: '/creations/Disney-cover.jpg',
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    mediaType: 'video',
    mediaUrl: '/creations/Disney.webm',
    seoTitle: 'DisneyLand Paris Cast Member Party 2024 - IXILOD Portfolio',
    seoDescription:
      'Discover the visual experience project developed for DisneyLand Paris in 2024.',
    challenge:
      "The goal was to craft VJ loops that aligned with Disney's artistic direction while capturing the essence of The Lion King. They needed to be energetic, visually striking, and perfectly suited for large LED screens.",
    solution:
      'I began by designing masks in After Effects, which I then integrated into a custom ComfyUI workflow. Using reference images curated by the Cuz. Creative studio, I refined the direction based on feedback from the art director. Once approved, I fine-tuned my workflow, optimized details, and generated the videos using a tailored model and prompts. To ensure top-tier quality and seamless display on large LED screens, I upscaled the final visuals to 4K.',
    tools: [
      { name: 'ComfyUI', icon: ComfyUIIcon },
      { name: 'After Effects', icon: AdobeAfterEffectsIcon },
      { name: 'Premiere Pro', icon: AdobePremiereProIcon },
      { name: 'Topaz Video', icon: TopazVideoIcon },
    ],
    team: [
      {
        name: 'CUZ.',
        role: 'Creative Direction & Art Direction',
        imageUrl: Cuz,
      },
      {
        name: 'IXILOD',
        role: 'AI Visual Artist & Motion Designer',
        imageUrl: Ixilod,
      },
    ],
    gallery: [
      {
        type: 'gif',
        url: '/creations/disney/GIFDisney_1.gif',
        alt: 'Lorem',
      },
      {
        type: 'gif',
        url: '/creations/disney/GIFDisney_2.gif',
        alt: 'Lorem',
      },
      {
        type: 'gif',
        url: '/creations/disney/GIFDisney_3.gif',
        alt: 'Lorem',
      },
      {
        type: 'gif',
        url: '/creations/disney/GIFDisney_4.gif',
        alt: 'Lorem',
      },
      {
        type: 'gif',
        url: '/creations/disney/GIFDisney_5.gif',
        alt: 'Lorem',
      },
      {
        type: 'gif',
        url: '/creations/disney/GIFDisney_6.gif',
        alt: 'Lorem',
      },
      {
        type: 'gif',
        url: '/creations/disney/GIFDisney_7.gif',
        alt: 'Lorem',
      },
      {
        type: 'gif',
        url: '/creations/disney/GIFDisney_8.gif',
        alt: 'Lorem',
      },
    ],
    nextProject: 'cocorico2024',
  },
  {
    slug: 'cocorico2024',
    title: 'Cocorico Electro 2024',
    description: 'AI-generated VJ loops for Cocorico Electro Festival',
    longDescription:
      'Creation of generative visuals and VJ loops for the Cocorico Electro Festival 2024. A project combining artificial intelligence, motion design, and art direction to enhance the main stage of the festival.',
    date: 'July 2024',
    duration: '2 weeks',
    client: 'Cocorico Electro',
    imageUrl: '/creations/Cocorico2024.webm',
    coverImage: '/creations/Cocorico2024.webm',
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    mediaType: 'video',
    mediaUrl: '/creations/Cocorico2024.webm',
    seoTitle: 'Cocorico Electro 2024 - IXILOD Portfolio',
    seoDescription:
      'Discover the visual experience project developed for Cocorico Electro Festival in 2024',
    tools: [
      { name: 'ComfyUI', icon: ComfyUIIcon },
      { name: 'Topaz Video', icon: TopazVideoIcon },
    ],
    team: [
      {
        name: 'CUZ.',
        role: 'Creative Direction & Art Direction',
        imageUrl: Cuz,
      },
      {
        name: 'IXILOD',
        role: 'AI Visual Artist & Motion Designer',
        imageUrl: Ixilod,
      },
    ],
    gallery: [
      {
        type: 'gif',
        url: '/creations/cocoricoElectro_2024/GIFCocorico2024_1.gif',
        alt: 'Cocorico Electro 2024 - GIF 1',
      },
      {
        type: 'gif',
        url: '/creations/cocoricoElectro_2024/GIFCocorico2024_2.gif',
        alt: 'Cocorico Electro 2024 - GIF 2',
      },
      {
        type: 'gif',
        url: '/creations/cocoricoElectro_2024/GIFCocorico2024_8.gif',
        alt: 'Cocorico Electro 2024 - GIF 3',
      },
      {
        type: 'gif',
        url: '/creations/cocoricoElectro_2024/GIFCocorico2024_4.gif',
        alt: 'Cocorico Electro 2024 - GIF 4',
      },
      {
        type: 'gif',
        url: '/creations/cocoricoElectro_2024/GIFCocorico2024_5.gif',
        alt: 'Cocorico Electro 2024 - GIF 5',
      },
      {
        type: 'gif',
        url: '/creations/cocoricoElectro_2024/GIFCocorico2024_3.gif',
        alt: 'Cocorico Electro 2024 - GIF 3',
      },
      {
        type: 'gif',
        url: '/creations/cocoricoElectro_2024/GIFCocorico2024_6.gif',
        alt: 'Cocorico Electro 2024 - GIF 6',
      },
      {
        type: 'gif',
        url: '/creations/cocoricoElectro_2024/GIFCocorico2024_7.gif',
        alt: 'Cocorico Electro 2024 - GIF 7',
      },
    ],
    challenge:
      'The challenge here was to create impactful visuals for a composition of LED panels. I had to adapt the shape of my visuals to the panel structure to achieve an immersive and precisely scaled result, while respecting the artistic direction of the festival, all in collaboration with the CUZ team.',
    solution:
      'To meet these requirements, I worked with precisely dimensioned masks provided by the on-site VJ. These masks were used in ComfyUI to generate animations that aligned perfectly with the LED panel layout. The visuals then went through an upscaling process to achieve a 4D rendering and ensure maximum display quality.',
    nextProject: 'cocorico2025',
    previousProject: 'disney',
  },
  {
    slug: 'cocorico2025',
    title: 'Cocorico Electro 2025',
    description: 'AI-generated VJ loops for Cocorico Electro Festival 2025',
    longDescription:
      'For the 2025 edition of Cocorico Electro, the project focused on creating energetic generative VJ loops for a stage with a unique LED setup, including an arch and a central 3D cube with three visible faces. I worked directly with the on-site VJ to ensure the visuals matched the stage layout while keeping the festival’s dynamic identity.',
    date: 'July 2025',
    duration: '3 weeks',
    client: 'Cocorico Electro',
    imageUrl: '/creations/cocoricoElectro_2025/CocoLoop_00012Reduce.gif',
    coverImage: '/creations/cocoricoElectro_2025/CocoLoop_00012Reduce.gif',
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    mediaType: 'video',
    mediaUrl: '/creations/cocoricoElectro_2025/CocoLoop_00012Reduce.gif',
    seoTitle: 'Cocorico Electro 2025 - IXILOD Portfolio',
    seoDescription: 'Discover the VJ loops created for Cocorico Electro 2025.',
    tools: [
      { name: 'ComfyUI', icon: ComfyUIIcon },
      { name: 'Topaz Video', icon: TopazVideoIcon },
    ],
    team: [
      // { name: 'CUZ.', role: 'Creative Direction & Art Direction', imageUrl: Cuz },
      {
        name: 'IXILOD',
        role: 'Art Direction & AI Visual Artist & Motion Designer',
        imageUrl: Ixilod,
      },
    ],
    gallery: [
      {
        type: 'gif',
        url: '/creations/cocoricoElectro_2025/CocoLoop_00012Reduce.gif',
        alt: 'Cocorico Electro 2025 - GIF 1',
      },
      {
        type: 'gif',
        url: '/creations/cocoricoElectro_2025/CocoLoop_00006Reduce.gif',
        alt: 'Cocorico Electro 2025 - GIF 2',
      },
      {
        type: 'gif',
        url: '/creations/cocoricoElectro_2025/CocoLoop_00017Reduce.gif',
        alt: 'Cocorico Electro 2025 - GIF 3',
      },
      {
        type: 'gif',
        url: '/creations/cocoricoElectro_2025/CocoLoop_00014Reduce.gif',
        alt: 'Cocorico Electro 2025 - GIF 4',
      },
      {
        type: 'gif',
        url: '/creations/cocoricoElectro_2025/CocoLoop_00082Reduce.gif',
        alt: 'Cocorico Electro 2025 - GIF 5',
      },
      {
        type: 'gif',
        url: '/creations/cocoricoElectro_2025/CocoLoop_00031Reduce.gif',
        alt: 'Cocorico Electro 2025 - GIF 6',
      },
      {
        type: 'gif',
        url: '/creations/cocoricoElectro_2025/CocoLoop_00018Reduce.gif',
        alt: 'Cocorico Electro 2025 - GIF 7',
      },
      {
        type: 'gif',
        url: '/creations/cocoricoElectro_2025/CocoLoop_00009Reduce.gif',
        alt: 'Cocorico Electro 2025 - GIF 8',
      },
    ],
    challenge:
      'The main challenge was adapting the visuals to this unusual LED configuration. The combination of the arch and the cube required precise alignment and adjustments to make sure the loops fit the shapes correctly and looked cohesive on the entire setup.',
    solution:
      'I collaborated closely with the VJ to define the artistic direction. Using masks tailored to the exact screen shapes, I generated the loops with a personal ComfyUI workflow to fit the layout perfectly. Afterwards, I used Topaz Video to interpolate and optimize the loops, ensuring smooth playback, slow motion effects, and finally upscaled everything to 4K for high-quality display on the festival’s large LED screens.',
    nextProject: 'disney2025',
    previousProject: 'disney',
  },
  {
    slug: 'disney2025',
    title: 'Disney Land Paris',
    subtitle: 'Frozen-inspired VJ loops 2025',
    description: "AI-generated VJ loops for Disney's stage visuals",
    longDescription:
      'For the 2025 Disney Land Paris edition, the project focused on creating 90 frozen inspired VJ loops for a large stage setup. Working closely with the on site VJ, the artistic direction aimed to capture the feeling of Disney’s winter universes, evoking the spirit of Frozen while keeping a modern and generative visual identity. The goal was to deliver immersive and seamless loops that supported both the music and the overall atmosphere.',
    date: 'November 2025',
    duration: '1 week',
    client: 'DisneyLand Paris',
    imageUrl: '/creations/disney_2025/Disney_frozen_perfectLoop_00015Reduce.gif',
    coverImage: '/creations/disney_2025/Disney_frozen_perfectLoop_00015Reduce.gif',
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    mediaType: 'video',
    mediaUrl: '/creations/Disney2025.webm',
    seoTitle: 'Disney Frozen VJ Project 2025 - IXILOD Portfolio',
    seoDescription:
      'Explore the exclusive frozen-inspired VJ content made for Disneyland Paris 2025.',
    tools: [
      { name: 'ComfyUI', icon: ComfyUIIcon },
      { name: 'After Effects', icon: AdobeAfterEffectsIcon },
      { name: 'Premiere Pro', icon: AdobePremiereProIcon },
      { name: 'Topaz Video', icon: TopazVideoIcon },
    ],
    team: [
      // { name: 'CUZ.', role: 'Creative Direction & Art Direction', imageUrl: Cuz },
      {
        name: 'IXILOD',
        role: 'Art Direction & AI Visual Artist & Motion Designer',
        imageUrl: Ixilod,
      },
    ],
    gallery: [
      {
        type: 'gif',
        url: '/creations/disney_2025/Disney_frozen_perfectLoop_00015Reduce.gif',
        alt: 'Disney Frozen 2025 - GIF 1',
      },
      {
        type: 'gif',
        url: '/creations/disney_2025/Disney_frozen_perfectLoop_00034Reduce.gif',
        alt: 'Disney Frozen 2025 - GIF 2',
      },
      {
        type: 'gif',
        url: '/creations/disney_2025/Disney_frozen_perfectLoop_00120Reduce.gif',
        alt: 'Disney Frozen 2025 - GIF 3',
      },
      {
        type: 'gif',
        url: '/creations/disney_2025/Disney_frozen_perfectLoop_00192.gif',
        alt: 'Disney Frozen 2025 - GIF 4',
      },
      {
        type: 'gif',
        url: '/creations/disney_2025/Disney_frozen_perfectLoop_00195.gif',
        alt: 'Disney Frozen 2025 - GIF 5',
      },
      {
        type: 'gif',
        url: '/creations/disney_2025/Disney_frozen_perfectLoop_00233.gif',
        alt: 'Disney Frozen 2025 - GIF 6',
      },
      {
        type: 'gif',
        url: '/creations/disney_2025/Disney_frozen_perfectLoop_00337.gif',
        alt: 'Disney Frozen 2025 - GIF 7',
      },
      {
        type: 'gif',
        url: '/creations/disney_2025/Disney_frozen_perfectLoop_00169Reduce.gif',
        alt: 'Disney Frozen 2025 - GIF 8',
      },
    ],
    challenge:
      'The main challenge was to create visuals that suggested a crystalline and winter themed world. The look needed to feel familiar yet original. Another important aspect was ensuring visual consistency across multiple loops while keeping them flexible for VJ performance.',
    solution:
      'To achieve this, I created all visuals in a 16:9 format using custom ComfyUI workflows based on the winter mood defined with the VJ. I designed masks in Premiere Pro and After Effects to guide the composition and reinforce the intended atmosphere. Once the loops were generated, I used temporal interpolation to convert everything to 60 FPS and reduce the motion speed for a smoother result. All loops were then upscaled to 4K with Topaz Video to ensure perfect clarity on the event’s large LED screens.',
    nextProject: 'disney',
    previousProject: 'cocorico2025',
  },
];

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    return notFound();
  }

  // Fonction pour grouper les médias par paires pour la galerie
  const getMediaGroups = (media: ProjectMedia[] = []) => {
    const groups = [];
    for (let i = 0; i < media.length; i += 2) {
      groups.push(media.slice(i, i + 2));
    }
    return groups;
  };

  const mediaGroups = getMediaGroups(project.gallery);

  return (
    <div
      style={{
        backgroundColor: project.backgroundColor,
        color: project.textColor,
      }}
      className="min-h-screen font-neuemontreal"
    >
      {/* Hero Section with video */}
      <div className="relative h-[50vh] w-full md:h-[70vh]">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={project.coverImage}
            className="size-full object-cover"
          >
            <source src={project.mediaUrl} type="video/webm" />
            Your browser does not support video playback.
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center md:p-16">
          <h1 className="font-ninna text-4xl font-bold text-white md:text-7xl lg:text-8xl">
            {project.title}
          </h1>
          {(project.slug === 'disney' || project.slug === 'disney2025') && (
            <h2 className="font-ninna text-3xl font-bold text-white md:text-5xl lg:text-6xl">
              {project.subtitle}
            </h2>
          )}
          <p className="mt-4 max-w-2xl text-lg text-white md:text-xl">{project.description}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-40 flex w-full items-center justify-between bg-black bg-opacity-10 p-4 backdrop-blur-md">
        <a
          href="/?section=creations"
          className="flex items-center text-sm font-medium text-neutral-600 hover:text-black md:text-base"
        >
          ← Back to creations
        </a>

        <div className="flex gap-4">
          {project.previousProject && (
            <a
              href={`/projects/${project.previousProject}`}
              className="text-sm font-medium text-neutral-600 hover:text-black md:text-base"
            >
              ← Previous project
            </a>
          )}
          {project.nextProject && (
            <a
              href={`/projects/${project.nextProject}`}
              className="text-sm font-medium text-neutral-600 hover:text-black md:text-base"
            >
              Next project →
            </a>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl p-4 md:p-8 lg:p-16">
        {/* Project details */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="mb-4 text-2xl font-bold text-black">About the project</h2>
            <p className="text-lg leading-relaxed text-gray-800">{project.longDescription}</p>

            {project.challenge && (
              <div className="mt-8">
                <h3 className="mb-2 text-xl font-bold text-black">The challenge</h3>
                <p className="text-lg leading-relaxed text-gray-800">{project.challenge}</p>
              </div>
            )}

            {project.solution && (
              <div className="mt-8">
                <h3 className="mb-2 text-xl font-bold text-black">The solution</h3>
                <p className="text-lg leading-relaxed text-gray-800">{project.solution}</p>
              </div>
            )}
          </div>

          <div className="rounded-lg bg-neutral-600 p-6">
            <div className="mb-6">
              <h3 className="mb-3 text-xl font-bold text-white">Information</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-300">Date:</span>
                  <span className="text-white">{project.date}</span>
                </li>
                {project.duration && (
                  <li className="flex justify-between">
                    <span className="text-gray-300">Duration:</span>
                    <span className="text-white">{project.duration}</span>
                  </li>
                )}
                {project.client && (
                  <li className="flex justify-between">
                    <span className="text-gray-300">Client:</span>

                    {project.slug === 'cocorico2024' || project.slug === 'cocorico2025' ? (
                      <a
                        href="https://www.cocorico-electro.fr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:opacity-80"
                      >
                        {project.client}
                      </a>
                    ) : project.slug === 'disney' || project.slug === 'disney2025' ? (
                      <a
                        href="https://www.disneylandparis.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:opacity-80"
                      >
                        {project.client}
                      </a>
                    ) : (
                      <span className="text-white">{project.client}</span>
                    )}
                  </li>
                )}
              </ul>
            </div>

            {project.tools && project.tools.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 text-xl font-bold text-white">Technologies used</h3>
                <div className="flex flex-wrap gap-3">
                  {project.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex items-center rounded-full bg-white bg-opacity-20 px-3 py-1"
                    >
                      {tool.icon && (
                        <div className="mr-2 flex size-5 items-center justify-center">
                          <img
                            src={typeof tool.icon === 'string' ? tool.icon : tool.icon.src}
                            alt={tool.name}
                            className="size-4 object-contain"
                          />
                        </div>
                      )}
                      <span className="text-white">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.team && project.team.length > 0 && (
              <div>
                <h3 className="mb-3 text-xl font-bold text-white">Team</h3>
                <ul className="space-y-4">
                  {project.team.map((member) => (
                    <li key={member.name} className="flex items-center">
                      {member.name === 'CUZ.' ? (
                        <a
                          href="https://www.cuzmade.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center transition-opacity hover:opacity-80"
                        >
                          {member.imageUrl && (
                            <div className="mr-3 size-10 overflow-hidden rounded-full">
                              <img
                                src={
                                  typeof member.imageUrl === 'string'
                                    ? member.imageUrl
                                    : member.imageUrl.src
                                }
                                alt={member.name}
                                className="size-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-white">{member.name}</p>
                            <p className="text-sm text-gray-300">{member.role}</p>
                          </div>
                        </a>
                      ) : (
                        <>
                          {member.imageUrl && (
                            <div className="mr-3 size-10 overflow-hidden rounded-full">
                              <img
                                src={
                                  typeof member.imageUrl === 'string'
                                    ? member.imageUrl
                                    : member.imageUrl.src
                                }
                                alt={member.name}
                                className="size-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-white">{member.name}</p>
                            <p className="text-sm text-gray-300">{member.role}</p>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Main media */}
        {project.slug === 'disney' && (
          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-black md:text-3xl">
              Project showcase
            </h2>

            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <iframe
                title="vimeo-player"
                src="https://player.vimeo.com/video/991471772?h=a2aa9cb1d1"
                width="640"
                height="360"
                frameBorder="0"
                allowFullScreen
                className="size-full object-cover"
              ></iframe>
            </div>
          </div>
        )}

        {/* Media gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-black md:text-3xl">Gallery</h2>

            <div className="space-y-8">
              {mediaGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {group.map((media, mediaIndex) => (
                    <div
                      key={mediaIndex}
                      className="overflow-hidden rounded-lg bg-gray-100 shadow-lg"
                    >
                      {media.type === 'image' && (
                        <img
                          src={media.url}
                          alt={media.alt}
                          className="h-64 w-full object-cover md:h-80"
                        />
                      )}

                      {media.type === 'gif' && (
                        <img
                          src={media.url}
                          alt={media.alt}
                          className="h-64 w-full object-cover md:h-80"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to action */}
        <div className="mx-auto mb-16 max-w-3xl rounded-lg bg-[#2A2A2A] p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Interested in this project?</h2>
          <p className="mb-6 text-lg text-gray-300">
            Let&apos;s discuss your next project together.
          </p>
          <a
            href="mailto:ixilod@proton.me"
            className="inline-block rounded-full bg-white px-6 py-3 text-lg font-medium text-black transition-all hover:bg-opacity-80"
          >
            Contact me
          </a>
        </div>

        {/* Project navigation (mobile version) */}
        <div className="mt-12 flex flex-col gap-4 md:hidden">
          {project.nextProject && (
            <a
              href={`/projects/${project.nextProject}`}
              className="flex w-full items-center justify-center rounded-lg bg-[#2A2A2A] p-4 text-center text-white"
            >
              Next project →
            </a>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-600">
        <div className="mx-auto max-w-7xl px-4">
          <p>© {new Date().getFullYear()} IXILOD. All rights reserved.</p>
          <a href="/" className="mt-2 inline-block font-ninna text-xl text-black hover:opacity-80">
            IXILOD
          </a>
        </div>
      </footer>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  return {
    title: project?.seoTitle || 'Unknown Project',
    description: project?.seoDescription || 'Discover this project',
  };
}
