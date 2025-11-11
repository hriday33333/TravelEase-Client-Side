import { Link } from 'react-router';

export default function ErrorPage() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <main className="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className=" text-2xl font-semibold text-red-600">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance  sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty  sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              href="#"
              className="rounded-md  px-3.5 py-2.5 text-sm font-semibold  shadow-xs  bg-red-600 text-black  hover:bg-black hover:text-white transition duration-300 font-semibold "
            >
              Go back home
            </Link>
            <a href="#" className="text-sm font-semibold ">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
