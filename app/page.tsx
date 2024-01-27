'use client';
import React, { useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PAGE_URL, User } from "@/constant/const";

const getKey = (pageIndex: number, previousPageData: User[] | null) => {
  if (previousPageData && !previousPageData.length) return null;
  return `users?page=${pageIndex + 1}`;
}

const fetcher = async (key: string) => {
  const res = await axios.get(`${PAGE_URL}/${key}`);
  return res.data;
}

export default function Home() {
  const { data, size, setSize, error, isLoading } = useSWRInfinite(getKey, fetcher, {revalidateAll: true});
  const isLastPage = data && data[data.length - 1]?.length === 0;
  const router = useRouter();

  useEffect(() => {
    setSize(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <main className="">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div>
          <button onClick={() => {setSize(1)}}>リロード</button>
          <button onClick={() => {router.push('/user/create')}}>新規ユーザー作成</button>
        </div>
        {
          data?.map((page, index) => {
            return (
              <div key={index} className="w-full flex flex-col items-center gap-3 mb-3">
                {page.map((user: User) => {
                    return (
                      <div key={user.name} className="flex w-2/5 justify-between">
                        <p>{user.name}</p>
                        <div className="flex gap-2">
                          {/* 編集と削除 */}
                          <button className="rounded-lg w-14 bg-blue-500 text-white" onClick={() => {
                            router.push(`/user/update?id=${user.id}`)
                          }}>
                            編集
                          </button>
                          <button className="rounded-lg w-14 bg-red-500 text-white" onClick={async () => {
                            await axios.delete(`${PAGE_URL}/users/${user.id}`);
                            setSize(size);
                          }}>
                            削除
                          </button>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            );
          }
        )}
        {
          !isLastPage && <button onClick={() => {setSize(size + 1)}}>読み込む</button>
        }
      </div>
    </main>
  );
}
