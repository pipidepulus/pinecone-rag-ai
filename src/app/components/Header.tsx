import Image from 'next/image';

export default function Header({ className }: { className?: string }) {
  return (
    <header className={`flex items-center justify-center text-gray-200 text-2xl ${className}`}>
      <Image src="/pinecone.svg" alt="Logo" width={50} height={50} />
    </header>
  );
}