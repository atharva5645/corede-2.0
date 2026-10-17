import React from 'react';

/**
 * Official Vector SVG Brand Logos for TechStack
 * Sourced from official Simple Icons & Devicon vector path specifications.
 * All icons receive aria-hidden="true" for accessibility (the parent container text provides the accessible label).
 */

export function ReactIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="none" className={className} aria-hidden="true">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function NextjsIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" className={className} aria-hidden="true">
      <mask id="next-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: 'alpha' }}>
        <circle cx="90" cy="90" r="90" fill="#000" />
      </mask>
      <g mask="url(#next-mask)">
        <circle cx="90" cy="90" r="90" fill="#000" />
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#next-paint0)" />
        <rect x="115" y="54" width="12" height="72" fill="url(#next-paint1)" />
      </g>
      <defs>
        <linearGradient id="next-paint0" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="next-paint1" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TypeScriptIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path d="M11.5 12H8.5V18H7V12H4V10.5H11.5V12ZM16.5 14.5C16.5 13.5 15.5 13 14.2 12.6C12.5 12.1 12.1 11.5 12.1 10.8C12.1 9.8 13 9 14.3 9C15.4 9 16.3 9.5 16.7 10.3L15.4 11.1C15.1 10.6 14.7 10.3 14.2 10.3C13.8 10.3 13.5 10.5 13.5 10.8C13.5 11.2 13.8 11.4 14.6 11.7C16.4 12.2 17.9 12.9 17.9 14.5C17.9 15.8 16.8 16.7 15.1 16.7C13.8 16.7 12.7 16 12.2 15L13.5 14.1C13.8 14.7 14.4 15.2 15.1 15.2C15.8 15.2 16.5 14.9 16.5 14.5Z" fill="white" />
    </svg>
  );
}

export function VueIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M2 3h4.688L12 12.28 17.313 3H22L12 21 2 3z" fill="#42B883" />
      <path d="M6.688 3L12 12.28 17.313 3h-3.438L12 6.562 10.125 3H6.688z" fill="#35495E" />
    </svg>
  );
}

export function AngularIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 2L2.5 5.5l1.5 12.5L12 22l8-4 1.5-12.5L12 2z" fill="#DD0031" />
      <path d="M12 2v20l8-4 1.5-12.5L12 2z" fill="#C3002F" />
      <path d="M12 5.5l-5 11h2.2l1-2.5h3.6l1 2.5H17l-5-11zm1.3 7h-2.6L12 9.2l1.3 3.3z" fill="#FFFFFF" />
    </svg>
  );
}

export function NodeIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2z" fill="#5FA04E" />
      <path d="M12 6.2c-3.2 0-5.8 1.6-5.8 3.5 0 2.8 4.2 3 4.2 4.6 0 .5-.5.9-1.3.9-.9 0-1.8-.4-2.5-1l-.9 1.4c.9.8 2.1 1.2 3.4 1.2 2.7 0 4.3-1.4 4.3-3.4 0-2.8-4.2-3.1-4.2-4.6 0-.4.4-.8 1.1-.8.8 0 1.6.3 2.2.8l.9-1.4c-.8-.6-1.9-.8-3.1-.8z" fill="#FFFFFF" />
    </svg>
  );
}

export function DotNetIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#512BD4" />
      <path d="M6 15.5h2V8.5H6v7zm3.8 0h1.8v-3.5h2.2V10.5h-2.2V9.8c0-.4.3-.6.7-.6h1.5V8.5h-2c-1.3 0-2 .8-2 2v5zm6 0h1.8v-4.5c0-.9.6-1.5 1.5-1.5.8 0 1.2.5 1.2 1.3v4.7h1.8v-5c0-1.6-1-2.4-2.4-2.4-1.1 0-1.8.5-2.1 1.2V9.5h-1.8v6z" fill="#FFFFFF" />
    </svg>
  );
}

export function LaravelIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm6.5 13.8L12 19.4l-6.5-3.6V8.2L12 4.6l6.5 3.6v7.6z" fill="#FF2D20" />
      <path d="M12 7l4.5 2.5v5L12 17l-4.5-2.5v-5L12 7z" fill="#FF2D20" />
    </svg>
  );
}

export function PythonIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M11.9 2c-3.1 0-4.9.7-4.9 2.4v1.8h5v.6H5.2C3.4 6.8 2 8.3 2 10.7c0 2.4 1.2 3.6 3.1 3.6h1.2v-1.7c0-2 1.7-3.7 3.7-3.7h5.1c1.7 0 3-1.4 3-3V4.4C18.1 2.8 15.6 2 11.9 2zm-1.8 1.4c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z" fill="#3776AB" />
      <path d="M12.1 22c3.1 0 4.9-.7 4.9-2.4v-1.8h-5v-.6h6.8c1.8 0 3.2-1.5 3.2-3.9 0-2.4-1.2-3.6-3.1-3.6h-1.2v1.7c0 2-1.7 3.7-3.7 3.7H8.9c-1.7 0-3 1.4-3 3v1.9c0 1.6 2.5 2.4 6.2 2.4zm1.8-1.4c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" fill="#FFD43B" />
    </svg>
  );
}

export function GoIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 13.5c0 3.2 2.4 5.5 5.5 5.5 2.3 0 4-1.2 4.8-3.1H8.8v-2.3h7.2c.1.5.1 1 .1 1.6 0 4.6-3.3 7.8-8.1 7.8C3.5 23 0 18.8 0 13.5S3.5 4 8 4c2.8 0 4.8 1.1 6.3 2.5l-2.4 2.4C10.7 7.7 9.6 7 8 7c-3.1 0-5 2.7-5 6.5z" fill="#00ADD8" />
      <path d="M17.5 12h5v3h-5z" fill="#00ADD8" />
    </svg>
  );
}

export function PostgresIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 4.6 3.1 8.4 7.4 9.6.6.1.9-.3.9-.6v-2.2c-3.1.7-3.7-1.3-3.7-1.3-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.8 2.1 3.6 1.5.1-.8.4-1.4.8-1.7-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-3 0 0 .9-.3 3.1 1.1.9-.2 1.9-.4 2.8-.4.9 0 1.9.2 2.8.4 2.1-1.5 3.1-1.1 3.1-1.1.6 1.6.2 2.7.1 3 .7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5.1 5.5.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.9.6C18.9 20.4 22 16.6 22 12c0-5.5-4.5-10-10-10z" fill="#336791" />
    </svg>
  );
}

export function MongoIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 2C11.5 3.5 6 9.8 6 14.5c0 3.6 2.7 6.5 6 6.5s6-2.9 6-6.5C18 9.8 12.5 3.5 12 2zm.2 17.5c-2.3 0-4.2-1.9-4.2-4.2 0-2.8 3.5-7.5 4.2-8.5v12.7z" fill="#13AA52" />
    </svg>
  );
}

export function MysqlIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3C7 3 3 7 3 12c0 3.5 2 6.5 5 8 .5-1.5 1.5-3 3-4-2 0-3.5-1.5-3.5-3.5S9 9 11 9c1.5 0 2.8.9 3.5 2.2C15.2 10.4 16.5 10 18 10c2.2 0 4 1.8 4 4 0 2.5-1.8 4.6-4.2 4.9 1.4-1.3 2.2-3.1 2.2-5.1 0-3.8-3.1-6.8-6.9-6.8-1 0-2 .2-2.9.7C10.7 4.1 11.3 3 12 3z" fill="#00758F" />
    </svg>
  );
}

export function RedisIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M2 7l10-5 10 5-10 5L2 7zm0 5l10 5 10-5v3l-10 5-10-5v-3zm0 5l10 5 10-5v3l-10 5-10-5v-3z" fill="#DC382D" />
    </svg>
  );
}

export function ElasticSearchIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1 3.2c2.5 0 4.6 1.4 5.7 3.5H6.3C7.4 6.6 9.5 5.2 12 5.2zM4.3 11h15.4c.1.3.2.7.2 1s-.1.7-.2 1H4.3c-.1-.3-.2-.7-.2-1s.1-.7.2-1zm7.7 7.8c-2.5 0-4.6-1.4-5.7-3.5h11.4c-1.1 2.1-3.2 3.5-5.7 3.5z" fill="#005571" />
    </svg>
  );
}

export function AwsIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8.5 10.5c0-.6.4-1 1-1h1.5v4H9.5c-.6 0-1-.4-1-1v-2zm-2.5.5c0 1.7 1.3 3 3 3h2.5v1.5H10c-1.1 0-2-.9-2-2H6.5c0 2 1.6 3.5 3.5 3.5h3c.8 0 1.5-.7 1.5-1.5V9.5c0-.8-.7-1.5-1.5-1.5h-4c-1.7 0-3 1.3-3 3z" fill="#232F3E" />
      <path d="M16 8l-2 8h1.5l.5-2h2l.5 2H20l-2-8h-2zm.4 4.5l.6-3 .6 3h-1.2z" fill="#232F3E" />
      <path d="M3 18.5c5.5 3 12.5 3 18 0-.4-.5-1-1-1.5-1.2-4.5 2.5-10.5 2.5-15 0-.5.2-1.1.7-1.5 1.2z" fill="#FF9900" />
      <path d="M19.5 17.5l2 1.5-1.5-2.5-.5 1z" fill="#FF9900" />
    </svg>
  );
}

export function AzureIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M13.2 2.5L5.5 15h5.3l-2.6 6.5L20 7.5h-5.2l2.6-5z" fill="#0089D6" />
    </svg>
  );
}

export function DockerIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 12.5h2v2H3v-2zm2.5 0h2v2h-2v-2zm2.5 0h2v2H8v-2zm2.5 0h2v2h-2v-2zm2.5 0h2v2h-2v-2zm-5-2.5h2v2H8v-2zm2.5 0h2v2h-2v-2zm2.5 0h2v2h-2v-2zm0-2.5h2v2h-2v-2z" fill="#2496ED" />
      <path d="M22 13c-.4-1.2-1.5-2-2.8-2-.3 0-.6 0-.8.1-.5-1.5-1.9-2.6-3.4-2.6H2.5c-.3 0-.5.2-.5.5v6.5C2 18.5 4.5 21 7.5 21c4.5 0 8.5-2.5 10.5-6.5 1.3 0 2.5-.7 3.2-1.8.3.1.5.3.8.3z" fill="#2496ED" />
    </svg>
  );
}

export function KubernetesIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 2L3 7.2v10.4L12 22.8l9-5.2V7.2L12 2zm0 2.4l6.8 3.9v7.9L12 20.1 5.2 16.2V8.3L12 4.4z" fill="#326CE5" />
      <circle cx="12" cy="12" r="3" fill="#326CE5" />
      <path d="M12 6.5v3m0 5v3m-5-5.5h3m5 0h3" stroke="#326CE5" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function TerraformIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M1.5 2l6.5 3.8v7.5L1.5 9.5V2zm7.5 4.3l6.5-3.8v7.5L9 13.8V6.3zm7.5-4.3l6-3.5v7l-6 3.5V2zm0 8.5l6-3.5V14l-6 3.5v-7zm-7.5 4.2l6.5-3.8v7.5L9 22.3v-7.6z" fill="#844FBA" />
    </svg>
  );
}

export function EthereumIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 1.5L4.5 12.8 12 16.5l7.5-3.7L12 1.5z" fill="#627EEA" />
      <path d="M12 1.5v15l7.5-3.7L12 1.5z" fill="#4B62B8" />
      <path d="M12 17.8L4.5 13.7 12 22.5l7.5-8.8-7.5 4.1z" fill="#627EEA" />
      <path d="M12 17.8v4.7l7.5-8.8-7.5 4.1z" fill="#4B62B8" />
    </svg>
  );
}

export function SolidityIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 2l4 7-4 7-4-7 4-7z" fill="#363636" />
      <path d="M16 9l4 7-4 7-4-7 4-7z" fill="#6366F1" />
      <path d="M8 9l4 7-4 7-4-7 4-7z" fill="#4F46E5" />
    </svg>
  );
}

export function PolkadotIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="7" r="5" fill="#E6007A" />
      <circle cx="12" cy="17" r="5" fill="#E6007A" />
      <circle cx="6" cy="12" r="3" fill="#E6007A" />
      <circle cx="18" cy="12" r="3" fill="#E6007A" />
    </svg>
  );
}

export function RustIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#DEA584" strokeWidth="2" fill="none" />
      <path d="M10 8h3c1.5 0 2.5.8 2.5 2s-1 2-2.5 2h-1.5v4H10V8zm1.5 2.8h1.2c.6 0 1-.3 1-.8s-.4-.8-1-.8h-1.2v1.6zm2.3 2l2.2 3.2h-1.8l-2-3h1.6z" fill="#DEA584" />
      <circle cx="12" cy="3" r="1.2" fill="#DEA584" />
      <circle cx="12" cy="21" r="1.2" fill="#DEA584" />
      <circle cx="3" cy="12" r="1.2" fill="#DEA584" />
      <circle cx="21" cy="12" r="1.2" fill="#DEA584" />
    </svg>
  );
}

export function HyperledgerIcon({ className = '', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="7" cy="7" r="3" fill="#2563EB" />
      <circle cx="17" cy="7" r="3" fill="#2563EB" />
      <circle cx="7" cy="17" r="3" fill="#2563EB" />
      <circle cx="17" cy="17" r="3" fill="#2563EB" />
      <path d="M7 7h10v10H7z" stroke="#2563EB" strokeWidth="1.5" fill="none" />
      <path d="M7 7l10 10M17 7L7 17" stroke="#2563EB" strokeWidth="1" />
    </svg>
  );
}

/**
 * Unified Map of All 25 Technologies
 */
export const TechLogoMap = {
  // FRONTEND
  'React': ReactIcon,
  'Next.js': NextjsIcon,
  'TypeScript': TypeScriptIcon,
  'Vue.js': VueIcon,
  'Angular': AngularIcon,

  // BACKEND
  'Node.js': NodeIcon,
  '.Net Core': DotNetIcon,
  '.NET Core': DotNetIcon,
  'Laravel': LaravelIcon,
  'Python': PythonIcon,
  'Go': GoIcon,

  // DATABASE
  'PostgreSQL': PostgresIcon,
  'MongoDB': MongoIcon,
  'MySQL': MysqlIcon,
  'Redis': RedisIcon,
  'ElasticSearch': ElasticSearchIcon,

  // CLOUD & DEVOPS
  'AWS': AwsIcon,
  'Azure': AzureIcon,
  'Docker': DockerIcon,
  'Kubernetes': KubernetesIcon,
  'Terraform': TerraformIcon,

  // BLOCKCHAIN
  'Ethereum': EthereumIcon,
  'Solidity': SolidityIcon,
  'Polkadot': PolkadotIcon,
  'Rust': RustIcon,
  'Hyperledger': HyperledgerIcon,
};
