import Image from 'next/image';

export default function Header({ className }: { className?: string }) {
  return (
    <header className={`flex items-center justify-center text-gray-200 text-2xl ${className}`}>
      <span>A RAG AI bot made with </span>
      <Image src="/pinecone.svg" alt="Logo" width={50} height={50} />
      <span> @pipidepulus</span>
    </header>
  );
}