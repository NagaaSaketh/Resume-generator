import React from "react";

const ResumeLayout = ({ resume, mode = "final" }) => {
  if (!resume) return null;

  // console.log(resume);
  const formatDate = (date) =>
    new Date(date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

  const hasExperience = resume.experience?.some(
    (exp) =>
      exp.company?.trim() ||
      exp.role?.trim() ||
      (exp.description && exp.description.length > 0),
  );

  const hasProjects = resume.projects?.some(
    (p) =>
      p.title?.trim() ||
      (p.description && p.description.length > 0) ||
      (p.techStack && p.techStack.length > 0) ||
      p.githubLink?.trim() ||
      p.demoLink?.trim(),
  );

  return (
    <div
      className="bg-white max-w-200 mx-auto p-5 shadow-2xl"
      style={{ fontSize: "12px", lineHeight: "1.4" }}
    >
      {/* HEADER */}
      <h1 className="text-center font-bold text-lg">
        {resume.userId?.firstName} {resume.userId?.lastName}
        {mode === "final" && resume.title && (
          <>
            {" , "}
            {resume.title}
          </>
        )}
        {mode === "preview" && resume.title && (
          <>
            {" , "}
            {resume.title}
          </>
        )}
      </h1>

      <p style={{ color: "#6b7280" }} className="text-center text-sm mt-1">
        {resume.userId?.emailId}

        {resume.personalInfo?.phone && (
          <>
            {" , "}
            {resume.personalInfo.phone}
          </>
        )}

        {resume.personalInfo?.address && (
          <>
            {" , "}
            {resume.personalInfo.address}
          </>
        )}
      </p>

      <div style={{ borderTop: "1px solid #e5e7eb", margin: "10px 0" }} />

      {/* LINKS */}
      {(mode === "final" ||
        resume.personalInfo?.github ||
        resume.personalInfo?.linkedin ||
        resume.personalInfo?.portfolio) && (
        <>
          <section className="flex items-start gap-5">
            <h2 className="w-32 text-sm tracking-widest font-semibold">
              LINKS
            </h2>

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
          <div style={{ borderTop: "1px solid #e5e7eb", margin: "10px 0" }} />
        </>
      )}

      {(mode === "final" || resume.description) && (
        <>
          {/* PROFILE */}
          <section className="flex items-start gap-5">
            <h2 className="w-32 text-sm tracking-widest font-semibold">
              PROFILE
            </h2>

            <p className="flex-1 text-sm">{resume.description}</p>
          </section>
          <div style={{ borderTop: "1px solid #e5e7eb", margin: "10px 0" }} />
        </>
      )}

      {(mode === "final" || hasExperience) && hasExperience && (
        <>
          <section className="flex items-start gap-5">
            <h2 className="w-32 text-sm font-semibold tracking-widest">
              EXPERIENCE
            </h2>

            <div className="flex-1 space-y-4">
              {resume.experience?.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <h3 className="text-sm font-semibold">
                      {exp.role} {exp.company && `@ ${exp.company}`}
                    </h3>

                    {exp.startDate && exp.endDate && (
                      <span className="text-xs text-gray-500">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </span>
                    )}
                  </div>

                  <ul className="text-sm mt-1 space-y-1 list-disc ml-4">
                    {exp.description?.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>

                  
                </div>
              ))}
            </div>
          </section>

          <div style={{ borderTop: "1px solid #e5e7eb", margin: "10px 0" }} />
        </>
      )}
      {!hasExperience && (mode === "final" || hasProjects) && hasProjects && (
        <>
          <section className="flex items-start gap-5">
            <h2 className="w-32 text-sm font-semibold tracking-widest">
              PROJECTS
            </h2>

            <div className="flex-1 space-y-4">
              {resume.projects?.map((proj, i) => (
                <div key={i}>
                  <div className="flex-1">
                    <div
                      className="flex justify-between"
                      style={{ alignItems: "baseline" }}
                    >
                      <h3 className="text-sm font-semibold">{proj.title}</h3>
                      <div style={{ fontSize: "13px", color: "#666" }}>
                        {proj.startDate && proj.endDate && (
                          <>
                            {formatDate(proj.startDate)} -{" "}
                            {formatDate(proj.endDate)}
                          </>
                        )}
                      </div>
                    </div>

                    <div
                      style={{ color: "#3b82f6" }}
                      className="text-sm space-x-3"
                    >
                      <a href={proj.demoLink} target="_blank" rel="noreferrer">
                        Demo
                      </a>
                      <a
                        href={proj.githubLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Code
                      </a>
                    </div>

                    <ul className="text-sm mt-1 space-y-1 list-disc ml-4">
                      {proj.description?.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>

                    <p style={{ color: "#6b7280" }} className="text-sm mt-2">
                      <span className="font-bold">Tech:</span>{" "}
                      {proj.techStack?.join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div style={{ borderTop: "1px solid #e5e7eb", margin: "10px 0" }} />
        </>
      )}

      {(mode === "final" ||
        resume.education?.some(
          (e) =>
            e.degree?.trim() ||
            e.institute?.trim() ||
            e.fieldOfStudy?.trim() ||
            e.startDate ||
            e.endDate ||
            e.grade ||
            e.place?.trim(),
        )) && (
        <>
          {/* EDUCATION */}
          <section className="flex items-start gap-5">
            <h2 className="w-32 text-sm tracking-widest font-semibold">
              EDUCATION
            </h2>

            <div className="flex-1 text-sm space-y-3">
              {resume.education?.map((e, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between">
                    <p className="font-bold">
                      {e.degree}, {e.institute}
                    </p>
                    <div style={{ textAlign: "right" }}>
                      {e.startDate && e.endDate && (
                        <p
                          style={{ fontSize: "13px", color: "#666", margin: 0 }}
                        >
                          {new Date(e.startDate).getFullYear()} -{" "}
                          {new Date(e.endDate).getFullYear()}
                        </p>
                      )}
                      <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>
                        {e.place}
                      </p>
                    </div>
                  </div>
                  <div className="pt-0 mt-0">
                    <p>{e.fieldOfStudy}</p>
                    <p>CGPA - {e.grade}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div style={{ borderTop: "1px solid #e5e7eb", margin: "10px 0" }} />
        </>
      )}

      {(mode === "final" || resume.skills?.length > 0) && (
        <>
          {/* SKILLS */}
          <section className="flex items-start gap-5">
            <h2 className="w-32 text-sm tracking-widest font-semibold">
              SKILLS
            </h2>

            <div className="flex flex-wrap gap-2">
              {resume.skills?.map((skill, i) => (
                <span key={i} className="text-xs px-2 py-1">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <div style={{ borderTop: "1px solid #e5e7eb", margin: "10px 0" }} />
        </>
      )}

      {(mode === "final" || resume.languages?.length > 0) && (
        <>
          {/* LANGUAGES */}
          <section className="flex items-start gap-5">
            <h2 className="w-32 text-sm tracking-widest font-semibold">
              LANGUAGES
            </h2>

            <div className="flex-1 text-sm">
              {resume.languages?.map((lang, i) => (
                <span key={i} className="text-xs px-2 py-1">
                  {lang}
                </span>
              ))}
            </div>
          </section>
          <div style={{ borderTop: "1px solid #e5e7eb", margin: "10px 0" }} />
        </>
      )}

      {(mode === "final" || resume.certifications?.length > 0) && (
        <>
          <section className="flex items-start gap-5">
            <h2 className="w-32 text-sm tracking-widest font-semibold">
              CERTIFICATIONS
            </h2>

            <ul className="text-sm list-disc ml-5 space-y-1">
              {resume.certifications.map((cert, i) => (
                <li style={{ listStyle: "none" }} key={i}>
                  {cert}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
};

export default ResumeLayout;
