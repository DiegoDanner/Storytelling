import StoryApp from '@/components/StoryApp';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] flex flex-col items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-6xl mx-auto space-y-8 flex flex-col items-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#4a3f35] font-serif tracking-tight">
            Leo&apos;s World of Words
          </h1>
          <p className="text-lg text-[#7a6f65] max-w-2xl mx-auto">
            Discover how learning a new language can open doors and connect you to people from all over the world.
          </p>
        </div>
        
        <StoryApp />
      </div>
    </main>
  );
}
