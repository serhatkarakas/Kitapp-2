"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const DocumentsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const title = "Bölüm";
    const promise = create({ title }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Yeni sayfa oluşturuluyor.",
      success: "Yeni sayfa başarılı şekilde oluşturuldu.",
      error: "Yeni sayfa oluşturulamadı.",
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.svg"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.svg"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Kitapp'a Hoşgeldin {user?.firstName}
      </h2>

      <Button className="text-[#f02e65a7] " onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Yeni sayfa Oluştur.
      </Button>
    </div>
  );
};

export default DocumentsPage;
