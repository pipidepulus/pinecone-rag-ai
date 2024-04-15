import Image from 'next/image';

export default function Header({ className }: { className?: string }) {
  return (
    <header className={`flex items-center justify-center text-gray-200 text-2xl ${className}`}>
      <span style={{ marginRight: '10px' }}>A RAG AI bot made with </span>
      <Image src="/pinecone.svg" alt="Logo" width={125} height={125} />
      <span style={{ marginLeft: '10px' }}> @pipidepulus</span>
    </header>
  );
}