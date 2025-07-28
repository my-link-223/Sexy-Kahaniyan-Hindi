import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ContactForm } from './_components/contact-form';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container">
          <header className="mb-8 md:mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
              Contact Us
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.
            </p>
          </header>
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}