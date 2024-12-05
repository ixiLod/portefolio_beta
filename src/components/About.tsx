import Image from 'next/image';
import { motion } from 'framer-motion';
import Tooltip from './Tooltip';

import HTMLIcon from '../assets/icons/HTML.png';
import CSSIcon from '../assets/icons/CSS.png';
import JavaScriptIcon from '../assets/icons/Javascript.png';
import TypeScriptIcon from '../assets/icons/Typescript.png';
import WebGLIcon from '../assets/icons/WebGL.png';
import TailwindCSS from '../assets/icons/TailwindCSS.png';
import ThreeJSIcon from '../assets/icons/ThreeJS.png';
import ReactIcon from '../assets/icons/React.png';
import NextJSIcon from '../assets/icons/NextJS.png';
import NodeJSIcon from '../assets/icons/NodeJS.png';
import AdobeAfterEffectsIcon from '../assets/icons/Adobe After Effects.png';
import AdobePremiereIcon from '../assets/icons/Adobe Premiere Pro.png';
import AdobePhotoshopIcon from '../assets/icons/Adobe Photoshop.png';
import ComfyUIIcon from '../assets/icons/ComfyUI.png';
import TouchDesignerIcon from '../assets/icons/Touchdesigner.png';
import BlenderIcon from '../assets/icons/Blender.png';
import SplineIcon from '../assets/icons/Spline.png';
import GitHubIcon from '../assets/icons/Github.png';
import SupabaseIcon from '../assets/icons/Supabase.png';
import DockerIcon from '../assets/icons/Docker.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
  onClose: () => void;
}

const ICONS = {
  languages: [
    { src: HTMLIcon, alt: 'HTML' },
    { src: CSSIcon, alt: 'CSS' },
    { src: JavaScriptIcon, alt: 'JavaScript' },
    { src: TypeScriptIcon, alt: 'TypeScript' },
    { src: WebGLIcon, alt: 'WebGL' },
  ],

  outils: [
    { src: AdobePremiereIcon, alt: 'Adobe Premiere' },
    { src: AdobeAfterEffectsIcon, alt: 'Adobe After Effects' },
    { src: AdobePhotoshopIcon, alt: 'Adobe Photoshop' },
    { src: ComfyUIIcon, alt: 'ComfyUI' },
    { src: TouchDesignerIcon, alt: 'TouchDesigner' },
    { src: BlenderIcon, alt: 'Blender' },
    { src: SplineIcon, alt: 'Spline' },
    { src: ThreeJSIcon, alt: 'ThreeJS' },
    { src: ReactIcon, alt: 'ReactJS' },
    { src: NextJSIcon, alt: 'NextJS' },
    { src: NodeJSIcon, alt: 'NodeJS' },
    { src: TailwindCSS, alt: 'TailwindCSS' },
    { src: GitHubIcon, alt: 'GitHub' },
    { src: SupabaseIcon, alt: 'Supabase' },
    { src: DockerIcon, alt: 'Docker' },
  ],
};

const About = ({ onClose }: ModalProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      aria-labelledby="about-title"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className="relative max-h-screen w-full max-w-2xl overflow-y-auto rounded-lg p-4 shadow-lg md:w-3/4"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 id="about-title" className="my-4 px-2 font-ninna text-xl font-bold text-gray-300">
            À propos
          </h2>
          <button
            onClick={onClose}
            className="text-white transition duration-300 ease-in-out hover:text-gray-400"
            aria-label="Fermer la fenêtre À propos"
          >
            <FontAwesomeIcon icon={faCircleXmark} className="text-2xl opacity-10" />
          </button>
        </div>
        <div className="mt-4 space-y-4 px-6 font-neuemontreal text-gray-300">
          <p>
            Autodidacte passionné par les arts visuels, la musique, et la programmation, j&apos;ai
            la conviction que les arts et la technologie sont intimement liés.
            <br />
            Mon objectif est de combiner ces passions pour créer des expériences visuelles uniques
            et captivantes, qu&apos;il s&apos;agisse d&apos;installations ou de vidéos interactives,
            de sites web artistiques ou d&apos;autres formes d&apos;expression créative.
          </p>
        </div>

        {Object.entries(ICONS).map(([section, icons]) => (
          <div key={section}>
            <h3 className="mt-8 px-3 font-ninna font-semibold text-gray-300">
              {`Mes ${section} :`}
            </h3>
            <div className="mb-4 mt-2 flex flex-wrap gap-2 px-6">
              {icons.map(({ src, alt }) => (
                <Tooltip key={`${section}-${alt}`} text={alt}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    className="relative size-10"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width: 640px) 40px, (max-width: 768px) 50px, 40px"
                      style={{ objectFit: 'contain' }}
                    />
                  </motion.div>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default About;
