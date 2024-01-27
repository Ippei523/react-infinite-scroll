'use client';
import { PAGE_URL, User } from "@/constant/const";
import axios, { AxiosResponse } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface UserCreateOrUpdateProps {
  pageType: 'create' | 'update'
}

export const UserCreateOrUpdate = ({ pageType }: UserCreateOrUpdateProps) => {
  const router = useRouter();
  const query = useSearchParams();
  const [name, setName] = useState('');

  const fetchUser = async (id: string) => {
    const response: AxiosResponse<User> = await axios.get(`${PAGE_URL}/users/${id}`);
    return response.data;
  }

  useEffect(() => {
    (
      async () => {
        if (pageType === 'update') {
          const user = await fetchUser(query.get('id') ?? "");
          setName(user.name);
        }
      }
    )();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p>{pageType == "create" ? "新規作成" : "編集"}</p>
      <input
        type="text"
        className="border-2 border-gray-300"
        value={name}
        onChange={(e) => {setName(e.target.value)}}
      />
      <div className="flex">
        {
          pageType === 'create' ?
          <button
            className="text-white bg-blue-500 w-16"
            onClick={async () => {
              if (name === "") return;

              await axios.post(`${PAGE_URL}/users`, {name: name});
              router.push('/');
            }}
          >
            作成
          </button>
          :
          <button
            className="text-white bg-blue-500 w-16"
            onClick={async () => {
              if (name === "") return;

              await axios.put(`${PAGE_URL}/users/${query.get('id')}`, {name: name});
              router.push('/');
            }}
          >
            更新
          </button>
        }
        <button
          className="text-white bg-slate-700 w-16 ml-3"
          onClick={() => {
            router.back();
          }}
        >
          戻る
        </button>
      </div>
    </div>
  )
}