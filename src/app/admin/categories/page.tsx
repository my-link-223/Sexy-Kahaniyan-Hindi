import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CategoryClient } from './_components/category-client';
import { categories } from '@/lib/data';

export default function ManageCategoriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-muted/40">
        <div className="container mx-auto p-4 md:p-8">
          <CategoryClient initialData={categories} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
