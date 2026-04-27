import { useEffect } from "react";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowRight } from "@gravity-ui/icons";

const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center">
      {/* ================= HERO ================= */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-6xl font-extrabold bg-linear-to-r from-blue-600 to-red-500 bg-clip-text text-transparent"
        >
          Build Smarter Resumes with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-lg text-gray-600 max-w-2xl"
        >
          Turn your ideas into powerful, recruiter-ready resumes. Our AI helps
          refine your descriptions, highlight your strengths, and present your
          experience in the best possible way.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8"
        >
          <Button
            size="lg"
            color="primary"
            className="px-8 py-6 text-lg shadow-lg"
            onClick={() => navigate("/login")}
          >
            Start Building <ArrowRight />
          </Button>
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="grid gap-6 px-6 pb-20 max-w-5xl w-full mx-auto grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
        {[
          {
            title: "AI-Powered Writing",
            desc: "Improve your project and experience descriptions instantly with AI suggestions.",
          },
          {
            title: "Real-Time Preview",
            desc: "See your resume update live as you build and edit.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-100"
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
