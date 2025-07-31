import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CategoryForm } from '../../_components/category-form';
import { categories } from '@/lib/data';
import { notFound } from 'next/navigation';

type EditCategoryPageProps = {
  params: {
    id: string;
  };
};

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = params;
  const category = categories.find((c) => c.id === parseInt(id, 10));

  if (!category) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-muted/40">
        <div className="container mx-auto p-4 md:p-8">
          <header className="mb-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold font-headline text-primary text-center">Edit Category</h1>
            <p className="text-muted-foreground mt-1 text-center">
              Update the details for &quot;{category.title}&quot;.
            </p>
          </header>
          <CategoryForm 
            initialData={category}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
