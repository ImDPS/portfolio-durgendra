import Container from '@/components/ui/Container';

export default function Home() {
  return (
    <div className="py-12 md:py-20">
      <Container>
        <section className="mb-16">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Hi, I'm <span className="text-primary">Durgendra</span> 
            <br />
            Web Developer & Designer
          </h1>
          <p className="mb-8 max-w-2xl text-xl text-gray-700 dark:text-gray-300">
            I build exceptional digital experiences with cutting-edge technologies.
            Specialized in creating fast, responsive, and user-friendly web applications.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/contact"
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Get in Touch
            </a>
            <a
              href="/projects"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900"
            >
              View Projects
            </a>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Featured Projects</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
              <div className="bg-gray-200 p-4 dark:bg-gray-700">Project Image Placeholder</div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">Project One</h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  A brief description of the project, technologies used, and outcomes.
                </p>
                <a href="#" className="text-primary hover:underline">
                  View Details
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
              <div className="bg-gray-200 p-4 dark:bg-gray-700">Project Image Placeholder</div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">Project Two</h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  A brief description of the project, technologies used, and outcomes.
                </p>
                <a href="#" className="text-primary hover:underline">
                  View Details
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
              <div className="bg-gray-200 p-4 dark:bg-gray-700">Project Image Placeholder</div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">Project Three</h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  A brief description of the project, technologies used, and outcomes.
                </p>
                <a href="#" className="text-primary hover:underline">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
