"use client";

import { useState } from "react";
import Cover from "@/components/Cover";
import Editor from "@/components/Editor";
import Toolbar from "@/components/Toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Button } from "@/components/ui/button";

const DocumentIdPage = ({ params }) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  const update = useMutation(api.documents.update);

  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  const onChange = (content) => {
    update({
      id: params.documentId,
      content,
    });
  };

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const synthesis = new SpeechSynthesisUtterance(document.title);
      synthesis.lang = "tr-TR";
      window.speechSynthesis.speak(synthesis);
      setSpeechSynthesis(synthesis);
    } else {
      console.error("Speech synthesis not supported in this browser.");
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Bulunamadı.</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
          onClick={() => speak(document.content)}
        >
          Speak
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={stopSpeaking}
        >
          Stop
        </Button>
        <Toolbar
          initialData={document}
          speak={speak}
          stopSpeaking={stopSpeaking}
        />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
