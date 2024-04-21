/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { onValue, ref } from 'firebase/database';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const page = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setLoading(true);
    const dbData = ref(db, 'data/');
    onValue(dbData, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setData(Object.values(data));
        setLoading(false);
      }
    });
  }, []);

  const Loading = () => {
    return loading && <h2>Loading...</h2>;
  };

  return (
    <div>
      {Loading()}

      {data &&
        data
          .filter((res: any) => res.id == params.id) // filter the data array
          .map((res: any, i: any) => {
            return redirect(`https://${res.url.replace(/^https?:\/\//, '')}`);
          })}
      {data &&
        data.filter((res: any) => res.id !== params.id) && ( // filter the data array
          <>
            <h2 className="text-center mt-5">Link not found</h2>
            <div className="text-center mt-5">
              <Link className="border p-2" href="/">
                Go Back
              </Link>
            </div>
          </>
        )}
    </div>
  );
};

export default page;
