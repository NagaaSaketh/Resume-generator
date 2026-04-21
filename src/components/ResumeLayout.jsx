import React from "react";

const ResumeLayout = ({ resume }) => {
  if (!resume) return null;

  console.log(resume);
  const formatDate = (date) =>
    new Date(date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

  return (
    <div className="bg-white max-w-3xl mx-auto p-8 shadow-lg">
      {/* HEADER */}
      <h1 className="text-center font-bold text-xl">
        {resume.userId?.firstName} {resume.userId?.lastName},{" "}
        <span className="font-medium">{resume.title}</span>
      </h1>

      <p style={{ color: "#6b7280" }} className="text-center text-sm mt-1">
        {resume.personalInfo?.address}, {resume.personalInfo?.phone},{" "}
        {resume.userId?.emailId}
      </p>

      <hr className="my-5" />

      {/* LINKS */}
      <section className="flex gap-6">
        <h2 className="w-32 text-sm tracking-widest font-semibold">LINKS</h2>

        <div className="flex-1 text-sm flex gap-4">
          {resume.personalInfo?.github && (
            <a
              href={resume.personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              GitHub
            </a>
          )}

          {resume.personalInfo?.linkedin && (
            <a
              href={resume.personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              LinkedIn
            </a>
          )}

          {resume.personalInfo?.portfolio && (
            <a
              href={resume.personalInfo.portfolio}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Portfolio
            </a>
          )}
        </div>
      </section>

      <hr className="my-5" />

      {/* PROFILE */}
      <section className="flex gap-6">
        <h2 className="w-32 text-sm tracking-widest font-semibold">PROFILE</h2>

        <p className="flex-1 text-sm">{resume.description}</p>
      </section>

      <hr className="my-5" />

      {/* PROJECTS */}
      <section className="flex gap-6">
        <h2 className="w-32 text-sm tracking-widest font-semibold">PROJECTS</h2>

        <div className="flex-1 space-y-6">
          {resume.projects?.map((proj, i) => (
            <div key={i} className="flex gap-6">
              {/* LEFT: DATE */}

              {/* RIGHT */}
              <div className="flex-1">
                <h3 className="font-semibold">{proj.title}</h3>

                <div style={{ color: "#6b7280" }} className="text-sm">
                  {formatDate(proj.startDate)} - {formatDate(proj.endDate)}
                </div>

                <div className="text-sm text-blue-500 space-x-3">
                  <a href={proj.demoLink} target="_blank" rel="noreferrer">
                    Demo
                  </a>
                  <a href={proj.githubLink} target="_blank" rel="noreferrer">
                    Code
                  </a>
                </div>

                <ul className="text-sm mt-1 list-disc ml-5">
                  {proj.description?.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>

                <p style={{ color: "#6b7280" }} className="text-sm mt-1">
                  <span className="font-medium">Tech:</span>{" "}
                  {proj.techStack?.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-5" />

      {/* EDUCATION */}
      <section className="flex gap-6">
        <h2 className="w-32 text-sm tracking-widest font-semibold">
          EDUCATION
        </h2>

        <div className="flex-1 text-sm space-y-3">
          {resume.education?.map((e, i) => (
            <div key={i}>
              <p className="font-medium">
                {e.degree}, {e.institute}
              </p>

              {/* DATE BELOW TITLE */}
              <p style={{ color: "#6b7280" }}>
                {new Date(e.startDate).getFullYear()} -{" "}
                {new Date(e.endDate).getFullYear()}
              </p>

              <p>{e.fieldOfStudy}</p>
              <p>CGPA - {e.grade}</p>
              <p>{e.place}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-5" />

      {/* SKILLS */}
      <section className="flex gap-6">
        <h2 className="w-32 text-sm tracking-widest font-semibold">SKILLS</h2>

        <p className="flex-1 text-sm">{resume.skills?.join(", ")}</p>
      </section>

      <hr className="my-5" />

      <section className="flex gap-6">
        <h2 className="w-32 text-sm tracking-widest font-semibold">
          LANGUAGES
        </h2>

        <div className="flex-1 text-sm">
          {resume.languages?.map((l) => l.name).join(", ")}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      {resume.certifications?.length > 0 && (
        <>
          <hr className="my-5" />
          <section className="flex gap-6">
            <h2 className="w-32 text-sm tracking-widest font-semibold">
              CERTIFICATIONS
            </h2>

            <ul className="flex-1 text-sm list-disc ml-5">
              {resume.certifications.map((cert, i) => (
                <li style={{listStyle:"none"}}  key={i}>{cert}</li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
};

export default ResumeLayout;
