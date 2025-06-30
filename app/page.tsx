export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-foreground border-b-2" />
        <p className="font-medium text-foreground text-lg">
          Getting your blog ready...
        </p>
      </div>
    </div>
  );
}
