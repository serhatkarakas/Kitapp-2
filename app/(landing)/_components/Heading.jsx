"use client";

import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold ">
        Kitap Yazmak İçin Tasarlanan{" "}
        <span className="text-[#f02e65] underline">Kitapp!</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium ">
        Yazarlar için güçlü bir{" "}
        <span className="text-[#f02e65] underline ">WYSIWYG</span> text editörü
        ile kitap yazmayı kolaylaştırmak için geliştirilmiş bir web
        uygulamasıdır.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button className="text-[#f02e65]" variant="" asChild>
          <Link href="/documents">
            Yazmaya Başla
            <ArrowRight className="text-[#f02e65] h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignUpButton mode="modal">
          <Button className="text-[#f02e65] ">
            Kayıt Ol
            <ArrowRight className="text-[#f02e65]  h-4 w-4 ml-2" />
          </Button>
        </SignUpButton>
      )}
    </div>
  );
};

export default Heading;
