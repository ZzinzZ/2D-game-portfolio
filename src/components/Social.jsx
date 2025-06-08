import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const socialLinks = [
  {
    icon: <FaGithub />,
    url: 'https://github.com/ZzinzZ',
    name: 'GitHub',
    className: 'github',
  },
  {
    icon: <MdEmail />,
    url: 'anhnhatnguyen2003@gmail.com',
    name: 'Email',
    className: 'email',
  },
  {
    icon: <FaLinkedin />,
    url: 'https://www.linkedin.com/in/anh-nhat-92436136a',
    name: 'LinkedIn',
    className: 'linkedin',
  },
  {
    icon: <FaFacebook />,
    url: 'https://www.facebook.com/nhat.anh.652112',
    name: 'Facebook',
    className: 'facebook',
  },
];

const Social = () => {
  return (
    <div className="social-container">
      {socialLinks.map((item, index) => (
        <a
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          className={`social-icon ${item.className}`}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default Social;
