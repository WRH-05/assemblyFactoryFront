import { Factory } from 'lucide-react';
import { ProductForm } from '@/components/ProductForm';
import { AssemblyLine } from '@/components/AssemblyLine';
import { CompletionSummary } from '@/components/CompletionSummary';
import { useAssembly } from '@/hooks/useAssembly';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const { stages, productName, isProcessing, isComplete, startAssembly, reset } = useAssembly();

  const hasStarted = stages.some((s) => s.status !== 'pending');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <Factory className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Factory Assembly Line</h1>
              <p className="text-sm text-muted-foreground">Digital Manufacturing Control Panel</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          {/* Product Form - Only show when not started or complete */}
          {!hasStarted && !isComplete && (
            <div className="w-full max-w-md">
              <div className="mb-6 text-center">
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  Start New Assembly
                </h2>
                <p className="text-sm text-muted-foreground">
                  Enter a product name and click Start Assembly to begin the manufacturing process.
                </p>
              </div>
              <ProductForm onStart={startAssembly} isProcessing={isProcessing} />
            </div>
          )}

          {/* Show current product name when processing */}
          {hasStarted && !isComplete && productName && (
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">
                Assembling: <span className="font-semibold text-foreground">{productName}</span>
              </p>
            </div>
          )}

          {/* Assembly Line Progress */}
          {hasStarted && (
            <>
              <Separator className="w-full max-w-md" />
              <AssemblyLine stages={stages} />
            </>
          )}

          {/* Completion Summary */}
          {isComplete && (
            <>
              <Separator className="w-full max-w-md" />
              <CompletionSummary productName={productName} onReset={reset} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
