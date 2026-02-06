import { CodePreview } from "@/designs/components/code-preview";

export default function Home() {
  return (
    <main className="mx-auto flex size-full max-w-375 flex-col gap-4 overflow-x-hidden p-4">
      <span className="select-none">Code viewer</span>
      <div className="flex w-full gap-4">
        <div className="flex w-full">
          <CodePreview>Code Preview</CodePreview>
        </div>
      </div>
    </main>
  );
}
