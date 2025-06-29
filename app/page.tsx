export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground"></div>
        <p className="text-lg font-medium text-foreground">Getting your blog ready...</p>
      </div>
    </div>
  );
}
