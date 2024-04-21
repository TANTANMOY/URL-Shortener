import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className="text-center bg-slate-800 pt-2 pb-2">
      Made by{' '}
      <Link href="https://tantanmoy.netlify.app" target="_blank">
        <u>Tanmoy</u>
      </Link>
    </div>
  );
};

export default Footer;
