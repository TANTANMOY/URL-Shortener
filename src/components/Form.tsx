'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/cn';
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from '@tabler/icons-react';
import { useState } from 'react';
import ShortUniqueId from 'short-unique-id';
const uid = new ShortUniqueId({ length: 5 });
const randomId = uid.rnd();

const Form = () => {
  const [url, setUrl] = useState<any | null>(null);
  const [publicUrl, setPublicUrl] = useState<any | null>(null);

  const submit = async (e: any) => {
    e.preventDefault();
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_FIREBASE_DB_URL}/data.json`,
      {
        method: 'POST',
        body: JSON.stringify({ id: randomId, url: url }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setPublicUrl(randomId);
      });
  };

  return (
    <main className="min-h-screen">
      <div className="mt-8 flex flex-wrap justify-center">
        <form onSubmit={submit}>
          <div className="flex justify-center">
            <Input
              id="url"
              placeholder="Enter URL here"
              type="text"
              className="w-96"
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center mt-5">
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-40 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Submit &rarr;
              <BottomGradient />
            </button>
          </div>
        </form>
      </div>
      <h2 className="text-white text-center mt-5">
        {publicUrl && <a href={publicUrl}>🔗 {publicUrl}</a>}
      </h2>
    </main>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};

export default Form;
