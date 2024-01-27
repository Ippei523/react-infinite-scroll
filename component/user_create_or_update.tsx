import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface UserCreateOrUpdateProps {
  pageType: 'create' | 'update'
}

export const UserCreateOrUpdate = ({ pageType }: UserCreateOrUpdateProps) => {
  const router = useRouter();
  const query = useSearchParams();
  const [name, setName] = useState('');

  useEffect(() => {
    if (pageType === 'update') {
      // ユーザー情報を取得して、nameにセットする
    }
  }, [pageType]);

  return (
    <div>
      <input type="text" />
    </div>
  )
}