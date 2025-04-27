import { useRouter } from "next/navigation";
import FilledButton from "../buttons/FilledButton";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import {
  DocumentIcon,
  HandRaisedIcon,
  ShieldIcon,
  UserGroupIcon,
} from "../icons/icons";

const LandingPage = () => {
  const { push } = useRouter();

  return (
    <>
      <Header />
      {/* Hero */}
      <section
        className="mx-auto flex justify-center overflow-hidden bg-gradient-to-b from-white to-yellow-50 px-10 py-20"
        style={{ height: "900px" }}
      >
        <div className="container flex flex-col items-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold pt-20 max-w-2xl text-center leading-snug">
            The perfect aid for Agile sprint lookbacks!
          </h1>
          <p className="text-gray-400 text-lg pt-4 max-w-lg text-center">
            Work together with your team to enhance the development workflow —
            completely free.
          </p>
          <FilledButton
            label={"Start new retro"}
            onClick={() => push("/login")}
            className="mt-8"
          />
          <img
            src="/hero_image.png"
            alt="Hero Image"
            className="mt-20 lg:max-w-3/4 h-auto object-cover rounded-lg shadow-xl pointer-events-none select-none"
          />
        </div>
      </section>

      {/* Features */}
      <section
        className="mx-auto flex justify-center overflow-hidden px-10 py-20"
        style={{ minHeight: "600px" }}
      >
        <div className="container w-full sm:w-1/2 flex flex-col sm:flex-row justify-between items-center gap-50">
          <div className="flex flex-col items-start">
            <h1 className="text-2xl font-bold md:pt-20 sm:pt-0 sm:pt-0 max-w-2xl leading-snug text-center sm:text-left">
              What does a sprint retrospective mean?
            </h1>
            <p className="text-gray-400 text-md pt-4 leading-relaxed text-center sm:text-left">
              A sprint retrospective is a meeting that occurs at the end of a
              sprint. During this meeting, the team reflects on the sprint and
              identifies actions for improvement going forward.
            </p>
          </div>
          <img
            src="/Creative team-amico.svg"
            alt="Feature Image"
            className="w-full sm:max-w-1/2 md:pt-10 sm:pt-0 sm:pt-0 pointer-events-none select-none"
          />
        </div>
      </section>

      {/* Features */}
      <section
        className="mx-auto flex justify-center overflow-hidden px-10 bg-gray-50 py-20"
        style={{ minHeight: "600px" }}
      >
        <div className="container w-full sm:w-1/2 flex flex-col sm:flex-row justify-between items-center gap-20">
          <div className="container flex flex-col items-center gap-20 h-full">
            <div className="flex flex-col md:items-start items-center">
              <UserGroupIcon className="size-10 mb-5" />
              <div className="flex flex-col md:items-start items-center">
                <h1 className="text-xl font-bold max-w-2xl leading-snug">
                  Data-Driven Decisions
                </h1>
                <p className="text-gray-400 pt-4 max-w-xl leading-relaxed text-center md:text-left">
                  Visualize retrospective results with charts and summaries,
                  enabling teams to make informed decisions for continuous
                  improvement.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:items-start items-center">
              <HandRaisedIcon className="size-10 mb-5" />
              <div className="flex flex-col md:items-start items-center">
                <h1 className="text-xl font-bold max-w-2xl leading-snug">
                  Get documented reports
                </h1>
                <p className="text-gray-400 pt-4 max-w-xl leading-relaxed text-center md:text-left">
                  You can download your retrospective board data as a PDF with
                  one click.
                </p>
              </div>
            </div>
          </div>

          <div className="container flex flex-col items-center gap-20 h-full">
            <div className="flex flex-col md:items-start items-center">
              <DocumentIcon className="size-10 mb-5" />
              <div className="flex flex-col md:items-start items-center">
                <h1 className="text-xl font-bold max-w-2xl leading-snug">
                  Top Feedback Picks
                </h1>
                <p className="text-gray-400 pt-4 max-w-xl leading-relaxed text-center md:text-left">
                  Vote on the most important feedback items and highlight key
                  takeaways to drive meaningful discussions and actions.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:items-start items-center">
              <ShieldIcon className="size-10 mb-5" />
              <div className="flex flex-col md:items-start items-center">
                <h1 className="text-xl font-bold max-w-2xl leading-snug">
                  Secure sync
                </h1>
                <p className="text-gray-400 pt-4 max-w-xl leading-relaxed text-center md:text-left">
                  Protect team discussions with encryption and secure login.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
export default LandingPage;
