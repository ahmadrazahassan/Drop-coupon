import { Button } from "@/components/button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-muted">
        Error 404
      </p>
      <h1 className="mt-3 text-[40px] font-extrabold text-ink md:text-[56px]">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-[15px] text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
        Head back and keep saving.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button href="/" variant="primary" size="lg">
          Back to home
        </Button>
        <Button href="/top" variant="outline" size="lg">
          Browse top codes
        </Button>
      </div>
    </div>
  );
}
