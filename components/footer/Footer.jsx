import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t border-gray-400 bg-gray-100">
      <div
        className="container flex flex-wrap items-center justify-center px-4 py-6 mx-auto 
       md:justify-evenly"
      >
        <div className="flex flex-wrap justify-center mx-5 lg:font-semibold lg:text-lg text-red-500">
          <div className="flex items-center space-x-8 lg:space-x-20">
            <Link href="/">Home</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
            <Link href="/">Terms</Link>
          </div>
        </div>
        <div className="flex justify-center mt-4 lg:mt-0">
          <a className="lg:mr-3" href="https://github.com/berkayalatas">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            className="ml-3 lg:mr-3"
            href="https://www.linkedin.com/in/berkayalatas/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a className="ml-3 lg:mr-3" href="mailto:berkay.3304@gmail.com">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
            >
              <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="flex justify-center align-center text-center mb-2">
        <hr className="border-gray-400 w-3/5" />
      </div>
      <div className="flex justify-center align-center text-center mb-3">
        <p className="text-md text-red-500 font-bold mb-2">
          Copyright © 2021 by{" "}
          <a className="text-blue-400" href="mailto:berkay.3304@gmail.com">
            Berkay Alatas
          </a>
          . All Rights Reserved.
        </p>{" "}
      </div>
    </footer>
  );
}

{
  /* <p className="text-sm text-blue-700 font-bold mb-2">
Copyright © 2021 by{" "}
<a className="text-red-500" href="mailto:berkay.3304@gmail.com">Berkay Alatas</a>. All
Rights Reserved.
</p> */
}

export default Footer;
