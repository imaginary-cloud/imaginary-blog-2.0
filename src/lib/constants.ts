import { Menu } from '@/common.types';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const menus: Menu[] = [
  {
    title: 'SERVICES',
    sublinks: [
      {
        title: 'All Services',
        url: '/services',
      },
      {
        parent: 'Product Ideation',
        title: 'Digital Transformation',
        url: 'digital-transformation',
      },
      {
        parent: 'Product Ideation',
        title: 'Scoping Session',
        url: 'scoping-session',
      },
      {
        parent: 'Product Ideation',
        title: 'Product Design Process',
        url: 'product-design-process',
      },
      {
        parent: 'Product Ideation',
        title: 'Minimum Viable Product',
        url: 'minimum-viable-product',
      },
      {
        parent: 'Product Development',
        title: 'Software Development',
        url: 'software-development',
      },
      {
        parent: 'Product Development',
        title: 'Web Development',
        url: 'web-development',
      },
      {
        parent: 'Product Development',
        title: 'Mobile Development',
        url: 'mobile-development',
      },
      {
        parent: 'Product Development',
        title: 'Data Science',
        url: 'data-science',
      },
      {
        parent: 'Product Development',
        title: 'UI/UX Design',
        url: 'ui-ux-design',
      },
      {
        parent: 'Product Improvement',
        title: 'Digital Acceleration',
        url: 'digital-acceleration',
      },
      {
        parent: 'Product Improvement',
        title: 'Code Audit',
        url: 'code-audit',
      },
      {
        parent: 'Product Improvement',
        title: 'UX Audit',
        url: 'UX-audit',
      },
    ],
  },
  {
    title: 'PORTFOLIO',
    sublinks: [
      {
        title: 'Case studies',
        url: 'case-studies',
      },
      {
        title: 'Industries',
        url: 'industries',
      },
    ],
  },
  {
    title: `FOR CTO'S`,
    sublinks: [
      {
        title: 'Tech Guides',
        url: 'tech-guides',
      },
      {
        title: 'Tech Blog',
        url: 'tech-blog',
      },
      {
        title: 'Tech Glosssary',
        url: 'tech-glossary',
      },
    ],
  },
  {
    title: 'COMPANY',
    sublinks: [
      { title: 'About Us', url: 'about-us' },
      { title: 'Why Us', url: 'why-us' },
    ],
  },
  { title: 'CAREERS', url: '/careers' },
  { title: 'CONTACT US', url: '/contacts', isBtn: true },
];

export { menus, months };
